import { Vector } from "./vector";

export class Particle {

  constructor(pos, r, m) {
    this.pos = pos;
    this.v = Vector.zero;
    this.a = Vector.zero;
    this.F = Vector.zero;
    this.r = r;
    this._m = m;
    this.m_inv = 1.0/m;
  }

  get m() {
    return this._m;
  }
  set m(value) {
    this._m = value;
    this.m_inv = 1.0/this._m;
  }

  updateDynamics(p, dt) {
    this.a = Vector.Scale(this.F, this.m_inv);
    this.F = Vector.zero; // Zera a força todo frame
  }

  updateKinematics(p, dt) {
    this.v.plus(Vector.Scale(this.a, dt));
    this.pos.plus(Vector.Scale(this.v, dt));

    if (this.pos.y >= p.windowHeight) {
      this.pos.y = p.windowHeight;
      this.v.y *= -0.8;
    }
  }

  draw(pchan) {
    pchan.arc(this.pos.x, this.pos.y, this.r, this.r, 0, pchan.TAU);
  }
};

export class Wave {

  constructor(p) {
    
  }

  update() {

  }

  draw() {

  }
}

console.log("Wave.ts loaded");
