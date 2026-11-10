/**
 * Keyboard / mouse input with action bindings and pointer lock.
 * Supports synthetic input (used by automated tests) through `simulate*` methods.
 */
export const BINDINGS = {
  forward: ['KeyW', 'ArrowUp'],
  back: ['KeyS', 'ArrowDown'],
  left: ['KeyA', 'ArrowLeft'],
  right: ['KeyD', 'ArrowRight'],
  sprint: ['ShiftLeft', 'ShiftRight'],
  crouchToggle: ['KeyC'],
  crouchHold: ['ControlLeft'],
  jump: ['Space'],
  interact: ['KeyE'],
  reload: ['KeyR'],
  grenade: ['KeyG'],
  melee: ['KeyV', 'KeyF'],
  weapon1: ['Digit1'],
  weapon2: ['Digit2'],
  swap: ['KeyQ'],
  pause: ['Escape', 'KeyP'],
};

export class Input {
  constructor(element) {
    this.element = element;
    this.down = new Set();
    this.pressed = new Set();
    this.mouseDown = new Set();
    this.mousePressed = new Set();
    this.mouseDX = 0;
    this.mouseDY = 0;
    this.wheel = 0;
    this.locked = false;
    this.enabled = true;
    this.onLockChange = null;

    window.addEventListener('keydown', (e) => {
      if (e.repeat) return;
      if (['Space', 'ArrowUp', 'ArrowDown', 'Tab'].includes(e.code)) e.preventDefault();
      this.down.add(e.code);
      this.pressed.add(e.code);
    });
    window.addEventListener('keyup', (e) => this.down.delete(e.code));
    window.addEventListener('blur', () => { this.down.clear(); this.mouseDown.clear(); });
    element.addEventListener('mousedown', (e) => {
      this.mouseDown.add(e.button);
      this.mousePressed.add(e.button);
    });
    window.addEventListener('mouseup', (e) => this.mouseDown.delete(e.button));
    element.addEventListener('contextmenu', (e) => e.preventDefault());
    this.lockFailed = false; // embedded pages may refuse pointer lock: fall back to free mouse look
    window.addEventListener('mousemove', (e) => {
      if (!this.locked && !(this.lockFailed && this.enabled)) return;
      this.mouseDX += e.movementX || 0;
      this.mouseDY += e.movementY || 0;
    });
    window.addEventListener('wheel', (e) => { this.wheel += Math.sign(e.deltaY); }, { passive: true });
    document.addEventListener('pointerlockerror', () => { this.lockFailed = true; });
    document.addEventListener('pointerlockchange', () => {
      this.locked = document.pointerLockElement === this.element;
      this.onLockChange?.(this.locked);
    });
  }

  requestLock() {
    try {
      if (!this.element.requestPointerLock) { this.lockFailed = true; return; }
      const p = this.element.requestPointerLock();
      if (p && p.catch) p.catch(() => { this.lockFailed = true; });
    } catch { this.lockFailed = true; }
  }
  exitLock() { if (document.pointerLockElement) document.exitPointerLock(); }

  action(name) { return this.enabled && BINDINGS[name].some((c) => this.down.has(c)); }
  actionPressed(name) { return this.enabled && BINDINGS[name].some((c) => this.pressed.has(c)); }
  fireHeld() { return this.enabled && this.mouseDown.has(0); }
  firePressed() { return this.enabled && this.mousePressed.has(0); }
  aimHeld() { return this.enabled && this.mouseDown.has(2); }

  consumeMouse() {
    const d = { x: this.mouseDX, y: this.mouseDY };
    this.mouseDX = 0; this.mouseDY = 0;
    return d;
  }
  endFrame() {
    this.pressed.clear();
    this.mousePressed.clear();
    this.wheel = 0;
  }

  // --- synthetic input for automated tests -------------------------------
  simulateKey(code, isDown) {
    if (isDown) { if (!this.down.has(code)) this.pressed.add(code); this.down.add(code); }
    else this.down.delete(code);
  }
  simulateMouseButton(button, isDown) {
    if (isDown) { this.mouseDown.add(button); this.mousePressed.add(button); }
    else this.mouseDown.delete(button);
  }
  simulateMouseMove(dx, dy) { this.mouseDX += dx; this.mouseDY += dy; }
}
