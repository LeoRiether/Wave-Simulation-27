import { Vector } from "./vector";

export class Particle {

  constructor(pos, m) {
    this.pos = pos;
    this.v = Vector.zero;
    this.a = Vector.zero;
    this.F = Vector.zero;
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

  /**
   * Updates the forces on the system based on the positions
   */
  // yl and yr are particle_to_the_left.y and particle_to_the_right.y, respectively
  updateDynamics(p, dt, k, yl, yr) {
    // Sets yl and yr to the same y as 'this' particle, so it
    // doesn't generate any force
    yl = yl === false ? this.pos.y : yl;
    yr = yr === false ? this.pos.y : yr;

    let dyl = yl - this.pos.y;
    let dyr = yr - this.pos.y;

    this.F = new Vector(0, dyl*k + dyr*k);

    this.a = Vector.Scale(this.F, this.m_inv);
    this.F = Vector.zero; // Zeroes the forces
  }

  // After updating all the forces, updates velocity and position of the particle
  updateKinematics(p, dt) {
    // TODO: use Verlet Integration
    // TODO: understand Verlet Integration
    this.v.plus(Vector.Scale(this.a, dt));
    this.pos.plus(Vector.Scale(this.v, dt));

    // if (this.pos.y + Particle.r >= p.windowHeight) {
    //   this.pos.y = p.windowHeight - Particle.r;
    //   this.v.y *= -0.8;
    // }
  }

  // P-chan!
  draw(pchan) {
    pchan.arc(this.pos.x, this.pos.y, Particle.r, Particle.r, 0, pchan.TAU);
  }
};

// Some constants...
Particle.r = 20;
Particle.m = 1;

export class Wave {

  constructor(k, p, margin) {
    this.k = k;

    // Initializes all particles
    this.particles = [];
    let x = margin + Particle.r;
    while (x + Particle.r < p.windowWidth - margin) {
      this.particles.push(new Particle(Vector.is(x, p.windowHeight/2), Particle.m));
      x += Particle.r;
    }
  }

  update(p, dt) {
    // Dynamics update
    this.particles[this.particles.length-1].updateDynamics(
      p, dt, this.k, 
      this.particles[this.particles.length-2].pos.y, 
      false
    );
    for (let i = this.particles.length-2; i > 0; i--) {
      this.particles[i].updateDynamics(
        p, dt, this.k,
        this.particles[i-1].pos.y,
        this.particles[i+1].pos.y
      );
    }
    this.particles[0].updateDynamics(p, dt, this.k, false, this.particles[1].pos.y);

    // Kinematics update...
    // ikr only3 lines
    for (let i = this.particles.length-1; i--; ) {
      this.particles[i].updateKinematics(p, dt);
    }
  }

  draw(p) {
    for (let i = this.particles.length-1; i--; ) {
      if (i > 0) {// if not on the last particle
        // WHERE DO WE DRAW THE LINE?
        // here. here we draw the line
        p.line(this.particles[i-1].pos.x, this.particles[i-1].pos.y,
               this.particles[i].pos.x, this.particles[i].pos.y);
      }
      this.particles[i].draw(p);
    }
  }
}


console.log("Wave.ts loaded");
