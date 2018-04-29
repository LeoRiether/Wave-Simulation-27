import { Wave, Particle } from "./wave.js";
import { Vector } from "./vector.js";


let thep5 = new p5(function (p) {

  let wave = new Wave(250, p, p.windowWidth*0.1);
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
      label: 'k',
      min: 120, max: 500, step: 10,
      object: wave,
      property: 'k'
    },
    {
      type: 'button',
      label: 'Reset',
      action: () => {
        for (let i = wave.particles.length-1; i--; ) {
          wave.particles[i].pos.y = p.windowHeight/2;
          wave.particles[i].v = Vector.zero;
        }
      }
    }
  ])

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.frameRate(fr);
    p.background(232, 238, 242);
    p.fill(132, 191, 237);
    p.stroke(97, 154, 198);
    p.strokeWeight(4);
  };
  
  p.draw = () => {
    p.clear();
    p.background(232, 238, 242);
    wave.particles[0].pos.y = p.mouseY;
    wave.update(p, dt);
    wave.draw(p);
  };
});

console.log("Main.ts loaded");
