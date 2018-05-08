import { Wave, Particle } from "./wave.js";
import { Vector } from "./vector.js";


let thep5 = new p5(function (p) {

  let wave = new Wave(1500, p, p.windowWidth*0.1);
  let fr = 40;
  let dt = 1.0/fr;

  let opt = {
    staticLastParticle: false,
    mouseIndex: 0
  };

  // Guify
  let gui = new guify({
    title: 'Wave Simulation #27',
    align: 'right',
    theme: 'dark'
  });

  gui.Register([
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
          wave.at(i).vl = 0;
          wave.at(i).vr = 0;
          wave.at(i).a  = 0;
        }
      }
    },
    {
      type: 'checkbox',
      label: 'Fixed last particle',
      object: opt,
      property: 'staticLastParticle'
    },
    {
      type: 'range',
      label: 'Moved particle index',
      min: 0, max: wave.len-1, step: 1,
      object: opt,
      property: 'mouseIndex'
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
    
    // Moves particle with mouse
    if (p.mouseIsPressed && !p.keyIsDown(p.SHIFT)) {
      if(opt.mouseIndex !== wave.len) wave.at(opt.mouseIndex).vr = (p.mouseY - wave.at(opt.mouseIndex).pos.y)/dt;
      if(opt.mouseIndex !== 0) wave.at(opt.mouseIndex).vl = (p.mouseY - wave.at(opt.mouseIndex).pos.y)/dt;
      wave.at(opt.mouseIndex).pos.y = p.mouseY;
    }

    wave.update(p, dt, opt.staticLastParticle);
    if (opt.staticLastParticle) wave.at(-1).pos.y = p.windowHeight/2.0;
    wave.draw(p);
  };
});