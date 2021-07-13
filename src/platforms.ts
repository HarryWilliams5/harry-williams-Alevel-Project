import * as p5 from 'p5';

import { Body, Bodies, Engine, World } from 'matter-js';
import Player from './player';

class Platforms {
    s: p5;
    body: Body;
    colour: String;

    constructor(s: p5, engine: Engine, positionx: number, positiony: number, colour: string) {
        this.s = s;
        this.colour = colour
        
        this.body = Bodies.rectangle(positionx, positiony, 350, 10, { isStatic: true});

        World.add(engine.world, [this.body]);
    }

    update() {

    }

    draw() {
         
        this.s.fill ('white')

        this.s.beginShape()
        this.body.vertices.forEach(vertex => {
            this.s.vertex(vertex.x, vertex.y);
        })
        this.s.endShape(this.s.CLOSE);
    }
}

export default Platforms;