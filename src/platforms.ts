import * as p5 from 'p5';

import { Body, Bodies, Engine, World } from 'matter-js';
import Player from './player';

class Platforms {
    s: p5;
    body: Body;
    colour: string;
    stroke: string;

    constructor(s: p5, engine: Engine,  positionx: number, positiony: number, width: number, height: number,
     colour: string, stroke: string,) {
        
        this.s = s;
        this.colour = colour
        this.stroke = colour
        
        this.body = Bodies.rectangle(positionx, positiony, width, height, { isStatic: true});

        World.add(engine.world, [this.body]);
    }

    update() {

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

export default Platforms;