import * as p5 from 'p5';
import { World, Bodies, Engine, Body } from 'matter-js';


class Player {
    s: p5;
    body: Body;
    Grounded: boolean;
    Spiked: boolean;
    Spiked1: boolean;
    Flagged: boolean;

    constructor(s: p5, engine: Engine, posx: number, posy: number, width: number, height: number) {
        this.s = s;
        this.body = Bodies.rectangle(posx, posy, width, height);

        //makes the player stay upright
        Body.setInertia(this.body, Infinity);
        this.Grounded = true
        this.Spiked = false
        this.Spiked1 = false
        this.Flagged = false

        World.add(engine.world, [this.body]);
    }


    update() {
        // WASD keys move the player
        if (this.s.keyIsDown(87) && this.Grounded == true) {
            Body.applyForce(this.body, this.body.position, { x: 0, y: -0.075 });
        } 
        if (this.s.keyIsDown(65)) {
            Body.applyForce(this.body, this.body.position, { x: -0.005, y: 0 });
        }
        if (this.s.keyIsDown(68)) {
            Body.applyForce(this.body, this.body.position, { x: +0.005, y: 0 });
        }   
        if (this.s.keyIsDown(83)) {
            Body.applyForce(this.body, this.body.position, { x: 0, y: +0.1})
        }
        // sends the player back to the start if they touch a spike
        if (this.Spiked == true){
            Body.setPosition(this.body, {x: -150, y: 700});
        }
        if (this.Spiked1 == true){
            Body.setPosition(this.body, {x: -150, y: 700});
        }
        // moves the player to the next level when they touch the flag
        if (this.Flagged == true){
            Body.setPosition(this.body, {x: this.body.position.x + 500, y: 700 })
        }
        
            
            
    }

    draw() {
        this.s.fill('green');

        this.s.beginShape()
        this.body.vertices.forEach(vertex => {
            this.s.vertex(vertex.x, vertex.y);
        })
        this.s.endShape(this.s.CLOSE);
    }
}
export default Player;