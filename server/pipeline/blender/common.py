# Utilitários compartilhados pelos scripts NEXPLAY para Blender (headless).
import json
import sys

import bpy


def load_args():
    argv = sys.argv
    if "--" in argv:
        argv = argv[argv.index("--") + 1:]
    else:
        argv = argv[1:]
    with open(argv[-1], "r", encoding="utf-8") as f:
        return json.load(f)


def report(data):
    print("NEXPLAY_REPORT " + json.dumps(data), flush=True)


def reset_scene():
    bpy.ops.wm.read_factory_settings(use_empty=True)


def import_glb(path):
    bpy.ops.import_scene.gltf(filepath=path)
    meshes = [o for o in bpy.context.scene.objects if o.type == "MESH"]
    # Malhas compartilhadas (instâncias do glTF) impedem aplicar transformações: torna cada uma única.
    for o in meshes:
        if o.data.users > 1:
            o.data = o.data.copy()
    return meshes


def export_glb(path, animations=True):
    bpy.ops.export_scene.gltf(
        filepath=path,
        export_format="GLB",
        export_apply=True,
        export_yup=True,
        export_animations=animations,
        export_animation_mode="ACTIONS",
    )


def mesh_stats():
    verts = faces = tris = 0
    objs = [o for o in bpy.context.scene.objects if o.type == "MESH"]
    for o in objs:
        verts += len(o.data.vertices)
        faces += len(o.data.polygons)
        tris += sum(len(p.vertices) - 2 for p in o.data.polygons)
    return {"objects": len(objs), "vertices": verts, "faces": faces, "triangles": tris}


def select_only(objs, active=None):
    bpy.ops.object.select_all(action="DESELECT")
    for o in objs:
        o.select_set(True)
    if active is not None:
        bpy.context.view_layer.objects.active = active
    elif objs:
        bpy.context.view_layer.objects.active = objs[0]
