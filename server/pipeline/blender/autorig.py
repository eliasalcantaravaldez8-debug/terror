# NEXPLAY — rigging automático de personagem humanoide no Blender (headless).
# Para modelos em T-pose ou A-pose sem esqueleto (ex.: gerados por IA). Cria um esqueleto com
# proporções medidas na malha, faz skinning com pesos automáticos e gera animações básicas
# (idle, walk, run, jump) em loop. Exporta GLB com animações nomeadas.
import math
import os
import sys

import bpy
from mathutils import Vector

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from common import export_glb, import_glb, load_args, report, reset_scene, select_only  # noqa: E402

args = load_args()
reset_scene()
meshes = import_glb(args["input"])
if not meshes:
    raise SystemExit("Nenhuma malha para rigging.")
if any(o.find_armature() for o in meshes) or any(o.type == "ARMATURE" for o in bpy.context.scene.objects):
    export_glb(args["output"])
    report({"ok": True, "skipped": True, "reason": "O modelo já possui esqueleto; mantido."})
    raise SystemExit(0)

# Junta as malhas em um único objeto (necessário para pesos automáticos coerentes).
select_only(meshes)
bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)
if len(meshes) > 1:
    bpy.context.view_layer.objects.active = meshes[0]
    bpy.ops.object.join()
body = bpy.context.view_layer.objects.active

verts = [body.matrix_world @ v.co for v in body.data.vertices]
min_z = min(v.z for v in verts); max_z = max(v.z for v in verts)
H = max_z - min_z
cx = (min(v.x for v in verts) + max(v.x for v in verts)) / 2
cy = (min(v.y for v in verts) + max(v.y for v in verts)) / 2


def band(z0, z1):
    return [v for v in verts if min_z + z0 * H <= v.z <= min_z + z1 * H]


# Mede a pose dos braços: largura na altura dos ombros.
shoulder = band(0.74, 0.84)
half_width = max(abs(v.x - cx) for v in shoulder) if shoulder else 0.25 * H
t_pose = half_width > 0.3 * H
legs = band(0.02, 0.4)
leg_x = (sum(abs(v.x - cx) for v in legs) / len(legs)) if legs else 0.06 * H
leg_x = min(max(leg_x, 0.04 * H), 0.12 * H)


def z(f):
    return min_z + f * H


arm = bpy.data.armatures.new("nx_rig")
rig = bpy.data.objects.new("nx_rig", arm)
bpy.context.scene.collection.objects.link(rig)
select_only([rig])
bpy.ops.object.mode_set(mode="EDIT")
eb = arm.edit_bones


def bone(name, head, tail, parent=None, connect=False):
    b = eb.new(name)
    b.head = Vector(head)
    b.tail = Vector(tail)
    if parent:
        b.parent = eb[parent]
        b.use_connect = connect
    return b


bone("hips", (cx, cy, z(0.50)), (cx, cy, z(0.58)))
bone("spine", (cx, cy, z(0.58)), (cx, cy, z(0.68)), "hips", True)
bone("chest", (cx, cy, z(0.68)), (cx, cy, z(0.80)), "spine", True)
bone("neck", (cx, cy, z(0.80)), (cx, cy, z(0.87)), "chest", True)
bone("head", (cx, cy, z(0.87)), (cx, cy, z(1.0)), "neck", True)
reach = half_width
for side, s in (("L", 1), ("R", -1)):
    sx = cx + s * 0.09 * H
    bone(f"shoulder.{side}", (cx + s * 0.02 * H, cy, z(0.80)), (sx, cy, z(0.80)), "chest")
    if t_pose:
        elbow = (cx + s * (0.09 * H + (reach - 0.09 * H) * 0.45), cy, z(0.80))
        wrist = (cx + s * (0.09 * H + (reach - 0.09 * H) * 0.88), cy, z(0.80))
        hand = (cx + s * reach, cy, z(0.80))
    else:  # A-pose / braços para baixo: inclina conforme a largura medida
        elbow = (cx + s * (0.09 * H + (reach - 0.09 * H) * 0.5), cy, z(0.66))
        wrist = (cx + s * (0.09 * H + (reach - 0.09 * H) * 0.9), cy, z(0.52))
        hand = (cx + s * reach, cy, z(0.46))
    bone(f"upper_arm.{side}", (sx, cy, z(0.80)), elbow, f"shoulder.{side}", True)
    bone(f"forearm.{side}", elbow, wrist, f"upper_arm.{side}", True)
    bone(f"hand.{side}", wrist, hand, f"forearm.{side}", True)
    lx = cx + s * leg_x
    bone(f"thigh.{side}", (lx, cy, z(0.50)), (lx, cy, z(0.27)), "hips")
    bone(f"shin.{side}", (lx, cy, z(0.27)), (lx, cy, z(0.05)), f"thigh.{side}", True)
    bone(f"foot.{side}", (lx, cy, z(0.05)), (lx, cy - 0.08 * H, z(0.0)), f"shin.{side}", True)
bpy.ops.object.mode_set(mode="OBJECT")

# Skinning com pesos automáticos (heat diffusion). Se falhar, usa vínculo pelo envelope dos ossos.
select_only([body, rig], active=rig)
weights = "automatic"
try:
    bpy.ops.object.parent_set(type="ARMATURE_AUTO")
    if not body.vertex_groups or all(len([v for v in body.data.vertices if any(g.group == vg.index for g in v.groups)]) == 0 for vg in body.vertex_groups):
        raise RuntimeError("pesos vazios")
except Exception:
    select_only([body, rig], active=rig)
    bpy.ops.object.parent_set(type="ARMATURE_ENVELOPE")
    weights = "envelope"

# ───── Animações em loop (rotação local dos ossos, em graus) ─────
FPS = 30
bpy.context.scene.render.fps = FPS
pb = rig.pose.bones
for p in pb:
    p.rotation_mode = "XYZ"

# Eixo de "balanço para frente" no espaço local dos ossos verticais é X.
def key(action_name, frames, poses):
    action = bpy.data.actions.new(action_name)
    rig.animation_data_create()
    rig.animation_data.action = action
    for i, fr in enumerate(frames):
        for p in pb:
            p.rotation_euler = (0, 0, 0)
            p.location = (0, 0, 0)
        for name, rot in poses[i].items():
            if name == "@hips_z":
                pb["hips"].location = (0, rot, 0)
                pb["hips"].keyframe_insert("location", frame=fr)
                continue
            if name in pb:
                pb[name].rotation_euler = tuple(math.radians(a) for a in rot)
        for p in pb:
            p.keyframe_insert("rotation_euler", frame=fr)
    action.use_fake_user = True
    try:
        track = rig.animation_data.nla_tracks.new()
        track.name = action_name
        track.strips.new(action_name, 1, action)
    except Exception:
        pass
    rig.animation_data.action = None
    return action


arm_down = 0 if not t_pose else 70  # traz braços em T-pose para perto do corpo nas animações


def gait(amp_leg, amp_arm, bob, n=5, length=30):
    frames = [1 + round(i * length / (n - 1)) for i in range(n)]
    poses = []
    for i in range(n):
        ph = 2 * math.pi * i / (n - 1)
        s = math.sin(ph)
        poses.append({
            "thigh.L": (amp_leg * s, 0, 0), "thigh.R": (-amp_leg * s, 0, 0),
            "shin.L": (-max(0, -s) * amp_leg * 1.2, 0, 0), "shin.R": (-max(0, s) * amp_leg * 1.2, 0, 0),
            "upper_arm.L": (-amp_arm * s, 0, arm_down), "upper_arm.R": (amp_arm * s, 0, -arm_down),
            "forearm.L": (-15, 0, 0), "forearm.R": (-15, 0, 0),
            "spine": (3, 0, 0), "@hips_z": abs(math.cos(ph)) * bob,
        })
    return frames, poses


idle = [{"upper_arm.L": (0, 0, arm_down), "upper_arm.R": (0, 0, -arm_down), "chest": (a, 0, 0), "@hips_z": 0} for a in (0, 2, 0, 2, 0)]
key("idle", [1, 15, 30, 45, 60], idle)
key("walk", *gait(28, 22, 0.02 * H))
key("run", *gait(50, 45, 0.04 * H, length=20))
key("jump", [1, 10, 20, 30], [
    {"thigh.L": (40, 0, 0), "thigh.R": (40, 0, 0), "shin.L": (-70, 0, 0), "shin.R": (-70, 0, 0), "upper_arm.L": (0, 0, arm_down), "upper_arm.R": (0, 0, -arm_down)},
    {"thigh.L": (-10, 0, 0), "thigh.R": (-10, 0, 0), "upper_arm.L": (-150, 0, 0), "upper_arm.R": (-150, 0, 0)},
    {"thigh.L": (30, 0, 0), "thigh.R": (10, 0, 0), "shin.L": (-40, 0, 0), "upper_arm.L": (-90, 0, 40), "upper_arm.R": (-90, 0, -40)},
    {"upper_arm.L": (0, 0, arm_down), "upper_arm.R": (0, 0, -arm_down)},
])

export_glb(args["output"], animations=True)
report({"ok": True, "pose": "T" if t_pose else "A/neutra", "weights": weights, "bones": len(arm.bones),
        "animations": ["idle", "walk", "run", "jump"], "height": round(H, 3), "blender": bpy.app.version_string})
