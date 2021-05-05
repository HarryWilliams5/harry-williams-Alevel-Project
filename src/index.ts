import p5 from 'p5';

import * as Matter from 'matter-js';

import Player from "./player"

import Obstacle from "./obstacle"

var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies;

let sketch = function (p: p5) {
    // create an engine
    let engine: Matter.Engine;
    var ground: Matter.Body;
    let BoxA: Matter.Body;
    let BoxB: Matter.Body;
    let player: Player;
    let obstacles: Obstacle[]

    p.setup = function () {
        p.createCanvas(700, 410);

        engine = Engine.create();
        ground = Bodies.rectangle(400, 410, 810, 60, { isStatic: true });

        player = new Player(p, engine);
        obstacles = [];
        for (let i = 0; i < 5; i++) {
            obstacles.push(new Obstacle(p, engine));
        }

        World.add(engine.world, [ground]);
    };

    p.draw = function () {
        Engine.update(engine, p.deltaTime);

        p.background(0);

        // Handle updates of game objects
        player.update();
        obstacles.forEach(o => o.update());

        // Handle drawing of game objects
        player.draw();
        obstacles.forEach(o => o.draw());

        // Draw ground
        p.fill('brown');

        p.beginShape()
        ground.vertices.forEach(vertex => {
            p.vertex(vertex.x, vertex.y);
        })
        p.endShape(p.CLOSE);
    };
};

let myp5 = new p5(sketch);