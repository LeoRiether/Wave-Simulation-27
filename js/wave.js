import { Vector } from "./vector";

export class Particle {

  constructor(pos, r, m) {
    this.pos = pos;
    this.v = Vector.zero;
    this.a = Vector.zero;
    this.F = Vector.zero;
    this.r = r;
    this.m = m;
    this.m_inv = 1.0/m;
    console.log(pos, r);
  }

  updateDynamics(p, dt) {
    this.a = this.F.times(this.m_inv);
    this.F = Vector.zero;
  }

  updateKinematics(p, dt) {
    this.v = this.v.plus(this.a.times(dt));
    this.pos = this.pos.plus(this.v.times(dt));

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

  constructor(plist) {
    
  }
}

console.log("Wave.ts loaded");
