import * as THREE from 'three';

const _a = new THREE.Vector3(), _c = new THREE.Vector3(), _n = new THREE.Vector3(), _p = new THREE.Vector3();
const _elbow = new THREE.Vector3(), _dir = new THREE.Vector3(), _wp = new THREE.Vector3();
const _pq = new THREE.Quaternion();
const DOWN = new THREE.Vector3(0, -1, 0);

/** Rotate `bone` so its local -Y axis points at a world-space target. */
export function aimBone(bone, target, twist = 0) {
  bone.parent.updateWorldMatrix(true, false);
  bone.getWorldPosition(_wp);
  _dir.subVectors(target, _wp);
  if (_dir.lengthSq() < 1e-10) return;
  _dir.normalize();
  bone.parent.getWorldQuaternion(_pq).invert();
  _dir.applyQuaternion(_pq);
  bone.quaternion.setFromUnitVectors(DOWN, _dir);
  if (twist) bone.rotateY(twist);
}

/**
 * Analytic two-bone IK. upper/lower are bones whose meshes extend along -Y.
 * `pole` is a world-space point the middle joint (elbow/knee) bends toward.
 */
export function solveTwoBone(upper, lower, l1, l2, target, pole) {
  upper.parent.updateWorldMatrix(true, false);
  upper.getWorldPosition(_a);
  _c.copy(target);
  _n.subVectors(_c, _a);
  let d = _n.length();
  const maxD = (l1 + l2) * 0.999;
  if (d > maxD) { _n.multiplyScalar(maxD / d); d = maxD; _c.copy(_a).add(_n); }
  if (d < 1e-4) return;
  _n.divideScalar(d);
  const x = (l1 * l1 - l2 * l2 + d * d) / (2 * d);
  const h = Math.sqrt(Math.max(0, l1 * l1 - x * x));
  _p.subVectors(pole, _a);
  _p.addScaledVector(_n, -_p.dot(_n));
  if (_p.lengthSq() < 1e-8) _p.set(0, 0, 1);
  _p.normalize();
  _elbow.copy(_a).addScaledVector(_n, x).addScaledVector(_p, h);
  aimBone(upper, _elbow);
  upper.updateWorldMatrix(false, false);
  lower.updateWorldMatrix(false, false);
  aimBone(lower, _c);
}
