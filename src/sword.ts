import * as p5 from 'p5';

import Matter, { Body, Bodies, Engine, World } from 'matter-js';
import Player from './player';

class Sword {
    s: p5;
    engine: Engine;
    body: Body;
    colour: string;
    // touchingEnemy: boolean;
    
  
    constructor(s: p5, engine: Engine, positionx: number, positiony: number, colour: string) {
        this.s = s;
        this.colour = colour
        this.engine = engine
        // this.touchingEnemy = false

        this.body = Bodies.polygon(positionx, positiony, 3, 50, { isStatic: true});
        Body.rotate(this.body, Math.PI/3)

        World.add(engine.world, [this.body]);
    }

    update() {
      
    }

    remove(){
       World.remove(this.engine.world, this.body)
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

export default Sword;