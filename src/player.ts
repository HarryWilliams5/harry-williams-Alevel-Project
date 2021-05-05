import * as p5 from 'p5';
import { World, Bodies, Engine, Body } from 'matter-js';

class Player {
    s: p5;
    body: Body;

    constructor(s: p5, engine: Engine) {
        this.s = s;
        this.body = Bodies.rectangle(s.width / 2, s.height / 2, 20, 20);

        World.add(engine.world, [this.body]);
    }

    update() {
        if (this.s.keyIsDown(this.s.UP_ARROW)) {
            Body.applyForce(this.body, this.body.position, { x: 0, y: -0.001 });
        }
        if (this.s.keyIsDown(this.s.LEFT_ARROW)) {
            Body.applyForce(this.body, this.body.position, { x: -0.001, y: 0 });
        }
        if (this.s.keyIsDown(this.s.RIGHT_ARROW)) {
            Body.applyForce(this.body, this.body.position, { x: +0.001, y: 0 });
        }
    }

    draw() {
        this.s.fill('blue');

        this.s.beginShape()
        this.body.vertices.forEach(vertex => {
            this.s.vertex(vertex.x, vertex.y);
        })
        this.s.endShape(this.s.CLOSE);
    }
}

export default Player;