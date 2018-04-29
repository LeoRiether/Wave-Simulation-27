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
  updateDynamics(p, k, yl, yr) {
    // Sets yl and yr to the same y as 'this' particle, so it
    // doesn't generate any force
    yl = yl === false ? this.pos.y : yl;
    yr = yr === false ? this.pos.y : yr;
    
    let dyl = yl - this.pos.y;
    let dyr = yr - this.pos.y;

    this.F = new Vector(0, dyl*k + dyr*k);

    this.last_a = this.a;
    this.a = Vector.Scale(this.F, this.m_inv);
  }

  // After updating all the forces, updates velocity and position of the particle
  updateKinematics(p, dt) {
    this.v.plus(Vector.Scale(this.a, dt));
    this.pos.plus(Vector.Scale(this.v, dt));
    
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
Particle.r = 2;
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
    // this.at(-1).updateDynamics(
    //   p, this.k, 
    //   this.at(-2).pos.y, 
    //   false
    // );
    for (let i = this.len-2; i > 0; i--) {
      this.at(i).updateDynamics(
        p, this.k,
        this.at(i-1).pos.y,
        this.at(i+1).pos.y
      );
    }
    this.at(0).updateDynamics(p, this.k, false, this.at(1).pos.y);

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
