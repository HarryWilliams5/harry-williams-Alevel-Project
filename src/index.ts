import p5 from 'p5';

import * as Matter from 'matter-js';

import Player from "./player";

import Obstacle from "./Obstacles/obstacle";

import Obstacle2 from "./Obstacles/obstacle2";

import Obstacle3 from "./Obstacles/obstacle3";

import Flagpole from  './flagpole';

import Platforms from "./platforms";

import Walls from "./walls";

import Sword from './sword';

import Enemy from './Enemies/Enemies';

var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies;
    //allows collision detection
    var SAT: any = (Matter as any).SAT

let sketch = function (p: p5) {
    let engine: Matter.Engine;
    let player: Player;
    let obstacles: Obstacle[];
    let obstacles2: Obstacle2[];
    let obstacles3: Obstacle3[];
    let flagpole: Flagpole[];
    let platforms: Platforms[];
    let walls: Walls[];
    var wallL: Matter.Body;
    var wallR: Matter.Body;
    var ceiling: Matter.Body;
    var cnv: p5.Renderer;
    let sword: Sword[];
    let Enemies: Enemy[];

    p.setup = function () {
       
        engine = Engine.create();
        wallL = Bodies.rectangle(-213, 100, 50, 1500, { isStatic: true});
        wallR = Bodies.rectangle(145000, 100, 50, 1500, { isStatic: true});
        ceiling = Bodies.rectangle(4812.5, -500, 10000, 100, { isStatic: true})

        
        player = new Player(p, engine, -100, 250, 40, 80);

        obstacles = [];
        for (let i = 0; i < 5; i++) {
            obstacles.push(new Obstacle(p, engine, 400+(i*35), 750,'grey'));
            
        }
        for (let i = 0; i < 5; i++) {
            obstacles.push(new Obstacle(p, engine, 1100+(i*35), 750, 'grey'));
        }
        for (let i = 0; i < 20; i++) {
            obstacles.push(new Obstacle(p, engine, 2100+(i*35), 750, 'grey'));
        }

        obstacles2 = [];
        //verical spikes
        for (let i = 0; i < 19; i++) {
            obstacles2.push(new Obstacle2(p, engine, 3185, 560-(i * 30), 'grey'));
        }

        World.add(engine.world, [wallL, wallR, ceiling]);
         
        //changeable gravity
        engine.world.gravity.y = 2;

        //changeable friction
        player.body.friction = 0.0075
        
    
        cnv = p.createCanvas(1425, 800);

        platforms = []  
        platforms.push(new Platforms(p, engine, 4812.5, 4760, 10000, 8000, 'white', 'white'));
        platforms.push(new Platforms(p, engine, 1850, 600, 350, 10, '#000033', 'white'));
        platforms.push(new Platforms(p, engine, 1450, 700, 350, 10, '#000033', 'white'));
        platforms.push(new Platforms(p, engine, 2400, 425, 800, 10, '#000033', 'white'));
        platforms.push(new Platforms(p, engine, 3000, 700, 400, 10, '#000033', 'white'));
        platforms.push(new Platforms(p, engine, 3180, 636, 40, 120, '#000033', 'white'));
        platforms.push(new Platforms(p, engine, 3400, 0, 400, 10, '#000033', 'white'));
        platforms.push(new Platforms(p, engine, 3600, 378, 10, 765, '#000033', 'white'));
        platforms.push(new Platforms(p, engine, 3800, 500, 400, 10, '#696969', 'white'));
        
        
        walls = []
        walls.push(new Walls(p, engine, 2000, -75, 10, 1000, 'white'));
        walls.push(new Walls(p, engine, 2800, -75, 10, 1000, 'white'));
        walls.push(new Walls(p, engine, 3200, 378, 10, 765, 'white'));
        walls.push(new Walls(p, engine, 4000, 328, 10, 650, 'white'));


        // walls.push(new Walls(p, engine, 100, 250, 100, 10, 'white'));

        flagpole = []
        flagpole.push(new Flagpole(p, engine, 4500, 560, 'gold'))


        Enemies = []
        Enemies.push(new Enemy(p, engine, 300, 500, 'red'))
        Enemies.push(new Enemy(p, engine, 900, 500, 'red'))
       

                  
    };
    

    p.draw = function () {
        Engine.update(engine, p.deltaTime);

        sword = []
        if (this.keyIsDown(81)){
            sword.push(new Sword(p, engine, player.body.position.x + 50, player.body.position.y , "silver")) 
        }
        
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

        // caps the max velocity at 30 in the y direction
        if (player.body.velocity.y <= -30) {
            Matter.Body.setVelocity(player.body, {
                x: player.body.velocity.x,
                y: -29,
            });
        }


        
        // Sidescrolling x direction
        p.translate(-player.body.position.x + p.width / 2, 0)
        // Sidescrolling y direction
        p.translate(0, -player.body.position.y + p.height / 2 + 0)
       

        p.background(0, 0, 20);

       
        player.update();
        Enemies.forEach(e => e.update());

        // Handle drawing of vertical spikes
        player.draw();
        obstacles.forEach(o => o.draw());

        // Handle drawing of horizontal spikes
        player.draw();
        obstacles2.forEach(o2 => o2.draw());


        // Handle drawing of platforms
        player.draw();
        platforms.forEach(z => z.draw());

        // Handles the drawing of walls
        player.draw();
        walls.forEach(w => w.draw());

        // Drawing the flagpoles
        player.draw();
        flagpole.forEach(f => f.draw());

        player.draw();
        sword.forEach(sw => sw.draw());

        player.draw();
        Enemies.forEach(e => e.draw());

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


        //check if the player is touching spikes
        player.Spiked1 = false
        obstacles2.forEach(o2=> {
            let collisonA = SAT.collides(player.body, o2.body);
            if (collisonA.collided) {
                player.Spiked1 = true
        }})

        player.Spiked2 = false
        Enemies.forEach(e=> {
            let collisonA = SAT.collides(player.body, e.body);
            if (collisonA.collided) {
                player.Spiked2 = true
        }})

        // Check of the player is flagged
        player.Flagged = false
        flagpole.forEach(f => {
            let collisionA = SAT.collides(player.body, f.body);
            if (collisionA.collided) {
                player.Flagged = true
            }
        }
        )


        //testing of the player is spiked
        console.log(player.Spiked)

        // testing if the player is grounded
        console.log(player.Grounded)

        // testing the players position
        console.log(player.body.position)

      
    };
  }


let myp5 = new p5(sketch);