import p5 from 'p5';

import * as Matter from 'matter-js';

import Player from "./player";

import Obstacle from "./obstacle";

import Platforms from "./platforms";

var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies;
    //allows collision detection
    var SAT: any = (Matter as any).SAT

let sketch = function (p: p5) {
    let engine: Matter.Engine;
    var ground: Matter.Body;
    let player: Player;
    let obstacles: Obstacle[];
    let platforms: Platforms[];
    var wallL: Matter.Body;
    var wallR: Matter.Body;
    var ceiling: Matter.Body;
    var cnv: p5.Renderer;

    p.setup = function () {
       

        engine = Engine.create();
        ground = Bodies.rectangle(712.5, 4760, 1800, 8000, { isStatic: true });
        wallL = Bodies.rectangle(-213, 100, 50, 1500, { isStatic: true});
        wallR = Bodies.rectangle(145000, 100, 50, 1500, { isStatic: true});
        ceiling = Bodies.rectangle(725, -25, 1450, 50, { isStatic: true})

        player = new Player(p, engine);
        obstacles = [];
        for (let i = 0; i < 5; i++) {
            obstacles.push(new Obstacle(p, engine, 860+(i*35), 'red'));
        }

        World.add(engine.world, [ground, wallL, wallR, ceiling]);
         
        //changeable gravity
        engine.world.gravity.y = 2;

        //changeable friction
        player.body.friction = 0.01
        ground.friction = 0.01
    
        cnv = p.createCanvas(1425, 800);

    };
    

    p.draw = function () {
        Engine.update(engine, p.deltaTime);

        //caps the max velocity at 10 in the right diection
        if (player.body.velocity.x >= 10) {
            Matter.Body.setVelocity(player.body, {
                x: 9,
                y: player.body.velocity.y,
            });
            
        }

        // caps the max velocity at 10 in the left direction
        if (player.body.velocity.x <= -10) {
            Matter.Body.setVelocity(player.body, {
                x: -9,
                y: player.body.velocity.y,
            });
        }
        // Sidescrolling
        p.translate(-player.body.position.x + p.width / 2, 0)

        p.background(0, 0, 20);

        // Handle updates of game objects
        var posChange = player.update();
        obstacles.forEach(o => o.update());

        // Handle drawing of game objects
        
        player.draw();
        obstacles.forEach(o => o.draw());

        // Handle drawing of platforms
        player.draw();
        platforms.forEach(z => z.draw());

        // Draw boarders
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

        // Draw Ceiling
        p.fill('white')

        p.beginShape()
        ceiling.vertices.forEach(vertex => {
            p.vertex(vertex.x, vertex.y);
        })
        p.endShape(p.CLOSE)

        //check if the player is grounded
        let collisonA = SAT.collides(player.body, ground);
        if (collisonA.collided) {
            player.Grounded = true
        } else 
        player.Grounded = false
        //testing if the player is grounded
        console.log(player.Grounded)

        console.log(player.body.position)



    };
};


let myp5 = new p5(sketch);