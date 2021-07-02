import * as p5 from 'p5';
import { World, Bodies, Engine, Body } from 'matter-js';


class Player {
    s: p5;
    body: Body;
    Grounded

    constructor(s: p5, engine: Engine) {
        this.s = s;
        this.body = Bodies.rectangle(400, 550, 40, 80);
        //makes the player stay upright
        Body.setInertia(this.body, Infinity);
        this.Grounded = true

        World.add(engine.world, [this.body]);
    }


    update() {
        var playerPosX = this.body.position.x
        var playerPosY = this.body.position.y
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
        var posChange = {x: playerPosX - this.body.position.x, y: playerPosY - this.body.position.y}
        this.body.position.x = playerPosX
        this.body.position.y = playerPosY
        return posChange
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