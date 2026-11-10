# NEXPLAY — aprimoramento de modelo no Blender (headless).
# Corrige geometria, normais e materiais, aplica estilo (low poly / suave), respeita orçamento de triângulos
# e exporta GLB pronto para o motor. Preserva a identidade visual (não remodela formas).
import math
import os
import sys

import bpy  # noqa: I001 — no modo módulo (pip bpy), bmesh só existe depois de importar bpy
import bmesh

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from common import export_glb, import_glb, load_args, mesh_stats, report, reset_scene, select_only  # noqa: E402

args = load_args()
style = args.get("style", "stylized")
budget = int(args.get("triangleBudget", 60000))
ops = []

reset_scene()
meshes = import_glb(args["input"])
before = mesh_stats()
if not meshes:
    raise SystemExit("Nenhuma malha no arquivo.")

# 1) Aplica transformações para trabalhar em coordenadas reais.
select_only(meshes)
bpy.ops.object.transform_apply(location=False, rotation=True, scale=True)
ops.append("transformações aplicadas")

# 2) Limpeza de geometria por objeto.
merged = loose = degenerate = 0
for o in meshes:
    bm = bmesh.new()
    bm.from_mesh(o.data)
    size = max(o.dimensions) or 1.0
    n0 = len(bm.verts)
    bmesh.ops.remove_doubles(bm, verts=bm.verts, dist=size * 1e-5)
    merged += n0 - len(bm.verts)
    res = bmesh.ops.dissolve_degenerate(bm, dist=size * 1e-6, edges=bm.edges)
    degenerate += len(res.get("region", [])) if isinstance(res, dict) else 0
    lv = [v for v in bm.verts if not v.link_edges]
    loose += len(lv)
    bmesh.ops.delete(bm, geom=lv, context="VERTS")
    le = [e for e in bm.edges if not e.link_faces]
    loose += len(le)
    bmesh.ops.delete(bm, geom=le, context="EDGES")
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    bm.to_mesh(o.data)
    bm.free()
    o.data.update()
ops.append(f"{merged} vértices duplicados fundidos, {loose} elementos soltos removidos, normais recalculadas para fora")

# 3) Orçamento de triângulos (Decimate preserva a silhueta).
stats = mesh_stats()
if stats["triangles"] > budget:
    ratio = max(0.02, budget / stats["triangles"])
    for o in meshes:
        m = o.modifiers.new("nx_decimate", "DECIMATE")
        m.decimate_type = "COLLAPSE"
        m.ratio = ratio
        m.use_collapse_triangulate = True
        select_only([o])
        bpy.ops.object.modifier_apply(modifier=m.name)
    ops.append(f"decimação para {budget} triângulos (razão {ratio:.2f})")

# 4) Estilo de sombreamento.
if style in ("lowpoly", "voxel"):
    if style == "lowpoly":
        for o in meshes:
            m = o.modifiers.new("nx_planar", "DECIMATE")
            m.decimate_type = "DISSOLVE"
            m.angle_limit = math.radians(5)
            select_only([o])
            bpy.ops.object.modifier_apply(modifier=m.name)
        ops.append("dissolução planar (faces coplanares unidas)")
    for o in meshes:
        for p in o.data.polygons:
            p.use_smooth = False
    ops.append("sombreamento facetado")
else:
    for o in meshes:
        for p in o.data.polygons:
            p.use_smooth = True
        if hasattr(o.data, "set_sharp_from_angle"):
            o.data.set_sharp_from_angle(angle=math.radians(40))
    ops.append("sombreamento suave com arestas vivas acima de 40°")

# 5) Materiais: garante Principled BSDF, espaço de cor correto e um material por malha.
fixed_mats = 0
default = None
for o in meshes:
    if not o.data.materials:
        if default is None:
            default = bpy.data.materials.new("nx_default")
            default.use_nodes = True
        o.data.materials.append(default)
        fixed_mats += 1
for mat in bpy.data.materials:
    if not mat.use_nodes:
        mat.use_nodes = True
        fixed_mats += 1
    for node in mat.node_tree.nodes:
        if node.type == "TEX_IMAGE" and node.image is not None:
            uses_color = any(link.to_socket.name == "Base Color" for link in node.outputs[0].links)
            want = "sRGB" if uses_color else "Non-Color"
            if node.image.colorspace_settings.name != want:
                node.image.colorspace_settings.name = want
                fixed_mats += 1
        if node.type == "BSDF_PRINCIPLED":
            metal = node.inputs.get("Metallic")
            if metal is not None and not metal.is_linked and 0.05 < metal.default_value < 0.95 and style != "realistic":
                metal.default_value = round(metal.default_value)  # evita metais "meio-termo" que parecem plástico sujo
                fixed_mats += 1
ops.append(f"{fixed_mats} ajuste(s) de material")

# 6) Remove dados órfãos e exporta.
try:
    bpy.data.orphans_purge(do_recursive=True)
except Exception:  # versões antigas
    pass
export_glb(args["output"])
report({"ok": True, "before": before, "after": mesh_stats(), "operations": ops, "blender": bpy.app.version_string})
