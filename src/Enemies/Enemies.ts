import * as p5 from 'p5';

import Matter, { Body, Bodies, Engine, World } from 'matter-js';
import Player from '../player';
import Sword from '../sword';

class Enemy {
    s: p5;
    engine: Matter.Engine;
    body: Body;
    colour: string;
    
  
    constructor(s: p5, engine: Engine, positionx: number, positiony: number, width: number, height: number, colour: string) {
        this.s = s;
        this.engine = engine;
        this.colour = colour
        
        
        this.body = Bodies.rectangle(positionx, positiony, width, height);
        Body.setInertia(this.body, Infinity);
        

        World.add(engine.world, [this.body]);
    }

    update() {

        if (this.body.position.y > 700){
            Body.setVelocity (this.body, {x : 0, y : -20})}
    
    }
        
        

    draw() {
         
        this.s.fill (this.colour)

        this.s.beginShape()
        this.body.vertices.forEach(vertex => {
            this.s.vertex(vertex.x, vertex.y);
        })
        this.s.endShape(this.s.CLOSE);
    }

    delete(){
        World.remove(this.engine.world, this.body)
     }
}

export default Enemy;