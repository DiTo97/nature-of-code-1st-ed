'use strict';

// p5.js instance mode
let _p5 = new p5(_ => {}, 'p5-main')

let repeller;
let particle_system;


_p5.setup = () => {
    _p5.createCanvas(720, 240);

    let x = _p5.width / 2;
    let y = 50;

    repeller = new Repeller(_p5, x, y + 50);
    particle_system = new ParticleSystem(_p5, x, y);
}

_p5.draw = () => {
    _p5.background(31);

    particle_system.spawn();

    // Apply a dummy force
    let gravity = _p5.createVector(0, 0.1);
    particle_system.apply_force(gravity);

    // Apply the repeller
    particle_system.apply_repeller(repeller);

    repeller.display();
    particle_system.run();
}