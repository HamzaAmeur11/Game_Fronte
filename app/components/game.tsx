"use client"

import React, { useRef, useEffect } from "react";
import { Engine, Render, World, Bodies, Composite, Runner } from 'matter-js';
import Matter from "matter-js";

let engine = Engine.create();

type Game = {
    engine: Engine,
    render: Render,
    runner: Runner,
    bodies: Bodies,
    composite: Composite,
    world: World,
}

let game : Game;

function gameLoop(deltaTime: number) {
    // update the engine
    Matter.Engine.update(engine, deltaTime);
 
    // request the next animation frame
    requestAnimationFrame(gameLoop);
 }



function RanderGame() {
    const gameDiv = useRef(null);

    const initializeObjects = () => {

        //create the Engine
        engine = Engine.create({
            gravity: {x: 0, y: 0},
            positionIterations: 10,
            velocityIterations: 8,
        });

        Matter.Events.on(engine, "collisionStart", (event) =>{
            event.pairs.forEach((pair)=>{
                const bodyA = pair.bodyA;
                const bodyB = pair.bodyB;
            });
        });

        //Create the renderer
        let render = Render.create({
            element: gameDiv.current || document.body,
            engine: engine,
            options:{
                background: 'gray',
                width: 600,
                height: 800,
                wireframes: false,
            }
        });;

        var topground =  Bodies.rectangle(0, 0, 1200, 10, { isStatic: true });
        var downground =  Bodies.rectangle(0, 800, 1200, 10, { isStatic: true });
        var leftground =  Bodies.rectangle(0, 0, 10, 1600, { isStatic: true });
        var rightground =  Bodies.rectangle(600, 0, 10, 1600, { isStatic: true });
        
        var ball = Bodies.circle(300, 400, 10, { 
            restitution: 1,
            friction:0,
            inertia: Infinity,
            render:{
                fillStyle: "red"
            }
            // restitution: 1
        });
        Matter.Body.setVelocity(ball, {
            x: 5,
            y: 5,
          })

        var player1 = Bodies.rectangle(300, 50, 125, 25, {
            isStatic: true,
            chamfer: { radius: 10},
            render:{
                fillStyle: "green"
            }
        });

        var player2 = Bodies.rectangle(300, 750, 125, 25, { 
            isStatic: true,
            chamfer: { radius: 10},
            render:{
                fillStyle: "blue"
            }
        });


        Composite.add(engine.world, [ball, player1, player2, topground, downground, leftground, rightground]);




        // // run the renderer
        Render.run(render);
        Runner.run(Runner.create(), engine);

        gameDiv.current!.addEventListener('mousemove', (event: MouseEvent) => {
            let mouseX = event.clientX;
            let mouseY = event.clientY;
         
            // calculate new position for paddleA
            let newPosition = { x: mouseX, y: player2.position.y };
         
            // update paddleA position
            Matter.Body.setPosition(player2, newPosition);
         });
         
        //  // start the game loop
        //  gameLoop(1000 / 60); 

        return ;
    };

    

    useEffect(() => {
        initializeObjects();
    }, []);

    return (
            <div ref={gameDiv}></div>
    );
}

export default RanderGame;