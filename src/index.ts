import p5 from 'p5';

import * as Matter from 'matter-js';

import Player from "./player"

import Obstacle from "./obstacle"

var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies;

let sketch = function (p: p5) {
    let engine: Matter.Engine;
    var ground: Matter.Body;
    let player: Player;
    let obstacles: Obstacle[]
    var wallL: Matter.Body;
    var wallR: Matter.Body;
    var ceiling: Matter.Body;

    p.setup = function () {
        p.createCanvas(1425, 800);

        let spikes: number[] = [1000, 965, 930, 895, 860]

        engine = Engine.create();
        ground = Bodies.rectangle(712.5, 1160, 1425, 800, { isStatic: true });
        wallL = Bodies.rectangle(-25, 100, 50, 1500, { isStatic: true});
        wallR = Bodies.rectangle(1450, 100, 50, 1500, { isStatic: true});
        ceiling = Bodies.rectangle(725, -25, 1450, 50, { isStatic: true})

        player = new Player(p, engine);
        obstacles = [];
        for (let i = 0; i < 5; i++) {
            obstacles.push(new Obstacle(p, engine, 860+(i*35)));
        }

        World.add(engine.world, [ground, wallL, wallR, ceiling]);
        
        engine.world.gravity.y = 2;
    };
    

    p.draw = function () {
        Engine.update(engine, p.deltaTime);

        p.background(0, 0, 20);

        // Handle updates of game objects
        player.update();
        obstacles.forEach(o => o.update());

        // Handle drawing of game objects
        
        player.draw();
        obstacles.forEach(o => o.draw());
        

        p.fill(0, 0, 20);
        
        p.beginShape()
        wallR.vertices.forEach(vertex => {
            p.vertex(vertex.x, vertex.y);
        })
        p.endShape(p.CLOSE);

        p.fill(0, 0, 20);
        
        p.beginShape()
        wallL.vertices.forEach(vertex => {
            p.vertex(vertex.x, vertex.y);
        })
        p.endShape(p.CLOSE);

        // Draw ground
        p.fill('white');

        p.beginShape()
        ground.vertices.forEach(vertex => {
            p.vertex(vertex.x, vertex.y);
        })
        p.endShape(p.CLOSE);

        p.fill('white')

        p.beginShape()
        ceiling.vertices.forEach(vertex => {
            p.vertex(vertex.x, vertex.y);
        })
        p.endShape(p.CLOSE)
    };
};

let myp5 = new p5(sketch);