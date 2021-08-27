import * as p5 from 'p5';

import { Body, Bodies, Engine, World } from 'matter-js';
import Player from '../player';

class Enemy {
    s: p5;
    body: Body;
    colour: string;
    
  
    constructor(s: p5, engine: Engine, positionx: number, positiony: number, colour: string) {
        this.s = s;
        this.colour = colour
        
        
        this.body = Bodies.rectangle(positionx, positiony, 50, 50);
        Body.setInertia(this.body, Infinity);
        

        World.add(engine.world, [this.body]);
    }

    update() {

        if (this.body.position.y > 650){
            Body.applyForce(this.body, this.body.position, {x : 0, y : -0.2});
        }
        if (this.body.position.y < 450){
            Body.applyForce(this.body, this.body.position, {x : 0, y : 0.2})
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

export default Enemy;