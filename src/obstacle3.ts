import * as p5 from 'p5';

import { Body, Bodies, Engine, World } from 'matter-js';
import Player from './player';

class Obstacle3 {
    s: p5;
    body: Body;
    colour: string;
    
  
    constructor(s: p5, engine: Engine, positionx: number, positiony: number, colour: string) {
        this.s = s;
        this.colour = colour
        
        this.body = Bodies.polygon(positionx, positiony, 3, 20, { isStatic: true});
        Body.rotate(this.body, Math.PI/3)
        

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

export default Obstacle3