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

import Boss1 from './Enemies/Boss1'

import JumpPads from './JumpPads';

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
    let sword: Sword | undefined;
    let Enemies: Enemy[];
    let boss1: Boss1;
    let jumpPads : JumpPads[];

    p.setup = function () {


        engine = Engine.create();
        wallL = Bodies.rectangle(-213, 100, 50, 1500, { isStatic: true});
        wallR = Bodies.rectangle(145000, 100, 50, 1500, { isStatic: true});
        ceiling = Bodies.rectangle(4812.5, -6000, 10000, 10000, { isStatic: true})

        //creating the player
        player = new Player(p, engine, -100, 600, 40, 80);

        //creating the first boss
        boss1 = new Boss1(p, engine, 6000, 600, 'white');

        
        
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

        //boss1 arena
        platforms.push(new Platforms(p, engine, 4750, 300, 700, 10, '#696969', 'white'));
        platforms.push(new Platforms(p, engine, 6025, 300, 700, 10, '#696969', 'white'));
        platforms.push(new Platforms(p, engine, 5400, -100, 700, 10, '#696969', 'white'));
        platforms.push(new Platforms(p, engine, 5400, -700, 2500, 10, '#000033', 'white'));


        walls = []
        walls.push(new Walls(p, engine, 2000, -75, 10, 1000, 'white'));
        walls.push(new Walls(p, engine, 2800, -75, 10, 1000, 'white'));
        walls.push(new Walls(p, engine, 3200, 378, 10, 765, 'white'));
        walls.push(new Walls(p, engine, 4000, -500, 10, 2000, 'white'));
        


        // walls.push(new Walls(p, engine, 100, 250, 100, 10, 'white'));

        flagpole = []
        flagpole.push(new Flagpole(p, engine, 7000, 560, 'gold'))


        Enemies = []
        Enemies.push(new Enemy(p, engine, 300, 500, 50, 50, 'red'))
        Enemies.push(new Enemy(p, engine, 950, -1000, 50, 50, 'red'))
        Enemies.push(new Enemy(p, engine, 700, 200, 50, 50, 'red'))
        Enemies.push(new Enemy(p, engine, 2000, 200, 80, 80, 'red'))



        jumpPads = []
        jumpPads.push(new JumpPads(p, engine, 4300, 765, 100, 10, 'cyan'))
        jumpPads.push(new JumpPads(p, engine, 5400, 765, 100, 10, 'cyan'))
        jumpPads.push(new JumpPads(p, engine, 4750, 300, 100, 10, 'cyan'))
        jumpPads.push(new JumpPads(p, engine, 6025, 300, 100, 10, 'cyan'))
        jumpPads.push(new JumpPads(p, engine, 5400, -100, 100, 10, 'cyan'))
        jumpPads.push(new JumpPads(p, engine, 6550, 765, 100, 10, 'cyan'))
       

                  
    };
    

    p.draw = function () {
        Engine.update(engine, p.deltaTime);

        p.background(0, 0, 20);

        //pupil of the first boss
        

        //creating the sword
        // if (p.keyCode == p.LEFT_ARROW){
        //     if (sword !== undefined) { 
        //         sword.delete()
        //     } else {
        //         sword = new Sword(p, engine, player.body.position.x + 50, player.body.position.y, 'grey')
        //     }
        // }

        if (p.keyCode == p.LEFT_ARROW && sword === undefined){
            sword = new Sword(p, engine, player.body.position.x + 50, player.body.position.y, 'grey')
        } else if(sword){
            sword.delete()
            sword = undefined
        }
        
        //instructions for boss1
        if (boss1.body.position.x > player.body.position.x){
            Matter.Body.applyForce(boss1.body, boss1.body.position, {x : -0.0175, y : 0})
        }
        if (boss1.body.position.x < player.body.position.x){
            Matter.Body.applyForce(boss1.body, boss1.body.position, {x : 0.0175, y : 0})
        }
        if (boss1.body.position.y > player.body.position.y){
            Matter.Body.applyForce(boss1.body, boss1.body.position, {x : 0, y : -0.15})
        }
        if (boss1.body.position.y < player.body.position.y){
            Matter.Body.applyForce(boss1.body, boss1.body.position, {x : 0, y : 0.01})
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
    

       
        player.update();
        Enemies.forEach(e => e.update());

        boss1.update();

        sword?.draw();
        

        // Handle drawing of vertical spikes
        boss1.draw();
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

        //Handles the drawing of enemies
        player.draw();
        Enemies.forEach(e => e.draw());

        //Handles the drawing of the jump pads
        player.draw();
        jumpPads.forEach(j => j.draw());

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

        // p.fill ('white')

        // p.beginShape()
        // boss1.vertices.forEach(vertex => {
        //     p.vertex(vertex.x, vertex.y);
        // })
        // p.endShape(p.CLOSE);

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

        player.SuperJump = false
        jumpPads.forEach(j=> {
            let collisonA = SAT.collides(player.body, j.body);
            if (collisonA.collided) {
                player.SuperJump = true
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
        })

        player.touchingBoss1 = false
            let collisionA = SAT.collides(player.body, boss1.body);
            if (collisionA.collided) {
                player.touchingBoss1 = true
            }

        
        // platforms.forEach(p => {
        //     Enemies.forEach(e =>{
        //     let collisionA = SAT.collides(e.body, p.body);
        //     if (collisionA.collided) {
                
        //     }
        // })})
        
        //testing of the player is spiked
        console.log(player.Spiked)

        // testing if the player is grounded
        console.log(player.Grounded)

        // testing the players position
        console.log(player.body.position)

      
    };
  }


let myp5 = new p5(sketch);