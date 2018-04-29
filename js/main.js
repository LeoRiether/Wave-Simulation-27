import { Wave, Particle } from "./wave.js";
import { Vector } from "./vector.js";


let thep5 = new p5(function (p) {

  let wave = new Wave();
  let particle = new Particle(Vector.is(0, p.windowHeight/2), 20, 1);
  particle.v = Vector.is(50, -300);
  let fr = 40;
  let dt = 1.0/fr;

  // Guify
  let gui = new guify({
    title: 'Wave Simulation #27',
    align: 'right',
    theme: 'dark'
  });

  gui.Register([
    {
      type: 'range',
      label: 'Mass',
      min: 0.5, max: 10, step: 0.5,
      object: particle,
      property: 'm'
    }
  ])

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.frameRate(fr);
    p.background(232, 238, 242);
    p.fill(132, 191, 237);
    p.stroke(97, 154, 198);
  };
  

  p.draw = () => {
    particle.F = Vector.is(0, 200);
    particle.updateDynamics(p, dt);
    particle.updateKinematics(p, dt);
    console.log(particle.v.toString())

    p.clear();
    p.background(232, 238, 242);
    particle.draw(p);
  };
});

console.log("Main.ts loaded");
