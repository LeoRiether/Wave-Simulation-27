import { Vector } from "./vector";
// import { sqrt } from "./do_i_seriously_need_a_module_just_for_the_sqrt_function";

export class Particle {

  constructor(pos, m) {
    this.pos = pos;
    this.vr = 0;
    this.vl = 0;
    this.nvr = 0;
    this.nvl = 0;
    this.a = 0;
    this.F = 0;
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
  updateDynamics(p, dt, k, pl, pr) {
    // Sets yl and yr to the same y as 'this' particle, so it
    // doesn't generate any force
    
    if (pl !== false) {
      pl.nvl += this.vl; 
    } else {
      pr.nvr -= this.vl;
    }
    if (pr !== false) {
      pr.nvr += this.vr;
    } else {
      pl.nvl -= this.vr;
    }
  }

  // After updating all the forces, updates velocity and position of the particle
  updateKinematics(p, dt) {
    this.vr = this.nvr;
    this.vl = this.nvl;
    this.nvr = 0;
    this.nvl = 0;
    this.pos.y += this.vr*dt + this.vl*dt;
    
    // Velocity Verlet
    // TODO: understand Verlet Integration
    // this.pos.plus(Vector.Sum(Vector.Scale(this.v, dt), Vector.Scale(this.last_a, 0.5*dt*dt)));
    // this.v.plus(Vector.Scale(Vector.Sum(this.a, this.last_a), 0.5*dt));
    // this.v.times(1.000001);
  }

  // P-chan!
  draw(pchan) {
    pchan.arc(this.pos.x, this.pos.y, Particle.r, Particle.r, 0, pchan.TAU);
  }
};

// Some constants...
Particle.r = 10;
Particle.m = 1;

export class Wave {

  constructor(k, p, margin) {
    this.k = k;

    // Initializes all particles
    this.particles = [];
    let x = margin + Particle.r;
    let y;
    while (x + Particle.r < p.windowWidth - margin) {
      this.particles.push(new Particle(Vector.is(x, p.windowHeight/2), Particle.m));
      x += Particle.r;
    }
  }

  get len() {
    return this.particles.length;
  }

  // Gets particle at index 'i'
  // negative indexes work just like in python
  at(i) {
    return this.particles[i < 0 ? (this.particles.length + i) : i];
  }

  update(p, dt, staticLastParticle) {
    // Dynamics update
    this.at(-1).updateDynamics(p, dt, this.k, this.at(-2), false);
    for (let i = this.len-2; i > 0; i--) {
      this.at(i).updateDynamics(p, dt, this.k, this.at(i-1), this.at(i+1));
    }
    this.at(0).updateDynamics(p, dt, this.k, false, this.at(1));

    // Kinematics update...
    for (let i = this.len-1; i >= 0; i--) {
      this.at(i).updateKinematics(p, dt);
      // if (i > 0 && this.closeEnough(i)) { // close enough, no force
      //   this.at(i).pos.y = this.at(i-1).pos.y;
      // }
    }
  }

  draw(p) {
    for (let i = this.len-1; i >= 0; i--) {
      if (i > 0) {// if not on the last particle
        // WHERE DO WE DRAW THE LINE?
        // here. here we draw the line
        p.line(this.at(i-1).pos.x, this.at(i-1).pos.y,
               this.at(i).pos.x, this.at(i).pos.y);
      }
      this.at(i).draw(p);
    }
  }

  closeEnough(i) {
    let dl = i == 0 ? 0 : Math.abs(this.at(i).pos.y - this.at(i-i).pos.y);
    let dr = i == this.len-1 ? 0 : Math.abs(this.at(i).pos.y - this.at(i+1).pos.y);

    return (dl + dr) < 10;
  }
}


console.log("Wave.ts loaded");
