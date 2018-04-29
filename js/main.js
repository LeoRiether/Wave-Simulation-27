import { Wave, Particle } from "./wave.js";
import { Vector } from "./vector.js";


let thep5 = new p5(function (p) {

  let wave = new Wave(250, p, p.windowWidth*0.1);
  let fr = 40;
  let dt = 1.0/fr;

  let opt = {
    staticLastParticle: false,
    mouseMoves: true
  };

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
      type: 'color',
      label: 'Color',
      format: 'hex',
      onChange: (c) => {
        p.fill(p.color(c));
        p.stroke(p.color(c));
      }
    },
    {
      type: 'button',
      label: 'Reset',
      action: () => {
        for (let i = wave.particles.length-1; i >= 0; i--) {
          wave.at(i).pos.y = p.windowHeight/2.0;
          wave.at(i).v = Vector.zero;
          wave.at(i).a = Vector.zero;
          wave.at(i).last_a = Vector.zero;
        }
      }
    },
    {
      type: 'checkbox',
      label: 'Static Last Particle',
      object: opt,
      property: 'staticLastParticle'
    },
    {
      type: 'checkbox',
      label: 'Mouse Moves Particles',
      object: opt,
      property: 'mouseMoves'
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
    // wave.particles[wave.particles.length-1].pos.y = p.mouseY;
    // wave.particles[0].pos.y = p.windowHeight/2;
    if (opt.staticLastParticle) wave.at(-1).pos.y = p.windowHeight/2.0;
    if (p.mouseIsPressed && opt.mouseMoves) wave.at(0).pos.y = p.mouseY;
    // if (p.mouseIsPressed && opt.mouseMoves) wave.at(Math.floor(wave.len/2)).pos.y = p.mouseY;
    wave.update(p, dt, opt.staticLastParticle);
    wave.draw(p);
  };
});

console.log("Main.ts loaded");
