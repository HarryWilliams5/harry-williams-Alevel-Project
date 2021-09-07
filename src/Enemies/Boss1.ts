import * as p5 from 'p5';

import { Body, Bodies, Engine, World } from 'matter-js';
import Player from '../player';

class Boss1 {
    s: p5;
    body: Body;
    pupil: Body;
    colour: string;

    
  
    constructor(s: p5, engine: Engine, positionx: number, positiony: number, colour: string) {
        this.s = s;
        this.colour = colour
        this.body = Bodies.circle(positionx, positiony, 100)
        this.pupil = Bodies.circle(this.body.position.x, this.body.position.y, 10)

        

        Body.setInertia(this.body, Infinity);
        

        World.add(engine.world, [this.body]);
    }

    update() {
        if (this.body.position.y > 600) {
            Body.applyForce(this.body, this.body.position, {x : 0, y : -0.1})
        }
        

        

    }

    draw() {
         
        this.s.fill (this.colour)

        this.s.beginShape()
        this.body.vertices.forEach(vertex => {
            this.s.vertex(vertex.x, vertex.y);
        })
        this.s.endShape(this.s.CLOSE);
    }
}

export default Boss1;