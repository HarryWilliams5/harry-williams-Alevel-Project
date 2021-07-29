import p5 from 'p5';

import * as Matter from 'matter-js';

import Player from "./player";

import Obstacle from "./obstacle";

import Platforms from "./platforms";

import Walls from "./walls";

var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies;
    //allows collision detection
    var SAT: any = (Matter as any).SAT

let sketch = function (p: p5) {
    let engine: Matter.Engine;
    let player: Player;
    let obstacles: Obstacle[];
    let platforms: Platforms[];
    let walls: Walls[]
    var wallL: Matter.Body;
    var wallR: Matter.Body;
    var ceiling: Matter.Body;
    var cnv: p5.Renderer;

    p.setup = function () {
       
        engine = Engine.create();
        wallL = Bodies.rectangle(-213, 100, 50, 1500, { isStatic: true});
        wallR = Bodies.rectangle(145000, 100, 50, 1500, { isStatic: true});
        ceiling = Bodies.rectangle(4812.5, -500, 10000, 100, { isStatic: true})

        
        player = new Player(p, engine, -150, 550, 40, 80);

        obstacles = [];
        for (let i = 0; i < 5; i++) {
            obstacles.push(new Obstacle(p, engine, 300+(i*35), 'grey'));
        }

        World.add(engine.world, [wallL, wallR, ceiling]);
         
        //changeable gravity
        engine.world.gravity.y = 2;

        //changeable friction
        player.body.friction = 0.01
        
    
        cnv = p.createCanvas(1425, 800);

        platforms = []  
        platforms.push(new Platforms(p, engine, 4812.5, 4760, 10000, 8000, '0,0,20'));
        platforms.push(new Platforms(p, engine, 1500, 600, 350, 10, 'white'));
        platforms.push(new Platforms(p, engine, 1200, 650, 500, 10, 'white'));

        
        walls = []
        walls.push(new Walls(p, engine, 100, 100, 100, 100, 'white'));

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

        // // caps the max velocity at 10 in the left direction
        if (player.body.velocity.x <= -10) {
            Matter.Body.setVelocity(player.body, {
                x: -9,
                y: player.body.velocity.y,
            });
        }
        
        // Sidescrolling x direction
        p.translate(-player.body.position.x + p.width / 2, 0)
        // Sidescrolling y direction
        p.translate(0, -player.body.position.y + p.height / 2 + 110)
       

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

        // Draw Ceiling
        p.fill('white')

        p.beginShape()
        ceiling.vertices.forEach(vertex => {
            p.vertex(vertex.x, vertex.y);
        })
        p.endShape(p.CLOSE)

        //check if the player is grounded
        player.Grounded = false
        platforms.forEach(p=> {
            let collisonA = SAT.collides(player.body, p.body);
            if (collisonA.collided) {
                player.Grounded = true
        }})

        //check if the player is touching spikes
        player.Spiked = false
        obstacles.forEach(o=> {
            let collisonA = SAT.collides(player.body, o.body);
            if (collisonA.collided) {
                player.Spiked = true
        }})

        //testing of the player is spiked
        console.log(player.Spiked)

        // testing if the player is grounded
        console.log(player.Grounded)

        // testing the players position
        console.log(player.body.position)

      
    };
  }


let myp5 = new p5(sketch);