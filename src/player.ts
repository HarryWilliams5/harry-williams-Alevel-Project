import * as p5 from 'p5';
import { World, Bodies, Engine, Body } from 'matter-js';


class Player {
    s: p5;
    body: Body;
    Grounded

    constructor(s: p5, engine: Engine, heighty: number) {
        this.s = s;
        this.body = Bodies.rectangle(-150, 550, 40, heighty);
        //makes the player stay upright
        Body.setInertia(this.body, Infinity);
        this.Grounded = true

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
        //if (this.s.keyIsDown(83) && this.Grounded == true)
            
            
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