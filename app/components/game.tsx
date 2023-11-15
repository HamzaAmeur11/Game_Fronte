"use client"

import React, { useRef, useEffect } from "react";
import { Engine, Render, Bodies, Composite, Runner, Body } from 'matter-js';
import Matter from "matter-js";

let engine = Engine.create();


function RanderGame() {
    const gameDiv = useRef<HTMLDivElement>(null);

    const initializeObjects = () => {
        
        //create the Engine
        engine = Engine.create({
            gravity: {x: 0, y: 0, scale: 0.001},
            positionIterations: 10,
            velocityIterations: 8,
        });
        
        
        //Create the renderer
        let render = Render.create({
            element: gameDiv.current || document.body,
            engine: engine,
            options:{
                background: '#ffffff',
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
            frictionAir: 0,
            friction:0,
            inertia: Infinity,
            render:{
                fillStyle: "red"
            }
        });
        Matter.Body.setVelocity(ball, {
            x: 5,
            y: 5,
        })
        
        var player1 = Bodies.rectangle(300, 20, 125, 20, {
            isStatic: true,
            chamfer: { radius: 10},
            render:{
                fillStyle: "purple"
            },
        });
        
        var player2 = Bodies.rectangle(300, 780, 125, 20, { 
            isStatic: true,
            chamfer: { radius: 10},
            render:{
                fillStyle: "blue"
            }
        });
        
        const maxVelocity = 7;

        Matter.Events.on(engine, "collisionStart", (event) =>{
            event.pairs.forEach((pair)=>{
                const bodyA = pair.bodyA;
                const bodyB = pair.bodyB;
                
                
                if (bodyA === ball || bodyB == ball){
                        const normal = pair.collision.normal;
                        const Threshold = 0.1;
                        if (Math.abs(normal.x) < Threshold){
                            const sign = Math.sign(ball.velocity.x);
                            const i = 0.5;
                            Body.setVelocity(ball, {
                                x: Math.min(ball.velocity.x + sign * i , maxVelocity),
                                y : ball.velocity.y
                            })
                            const restitution = 1; // Adjust this value for desired bounciness
                            const friction = 0; // Adjust this value for desired friction
                            
                            // Set restitution and friction for the ball
                            Body.set(ball, { restitution, friction });
                            
                            // Set restitution and friction for the other body (if it's not static)
                            const otherBody = bodyA === ball ? bodyB : bodyA;
                            if (!otherBody.isStatic) {
                                Body.set(otherBody, { restitution, friction });
                            }
                            
                        }
                    }
                });
            }); 
            let score1 = 0
            let score2 = 0
            Matter.Events.on(engine, "beforeUpdate", () =>{
                if (ball.position.y < )
            })
            
            Matter.Events.on(engine, "beforeUpdate", () => {
                const maxX = 600;
                const maxY = 800;
                
                // Check if the ball is outside the bounds
                if (ball.position.x <= 10 || ball.position.x >= maxX - 10|| ball.position.y <= 10 || ball.position.y >=  maxY - 10) {
                    // Reset the ball to the center
                    Body.setPosition(ball, { x: 300, y: 400 });
                    Body.setVelocity(ball, { x: 5, y: -5 });
                    
                    // Reset the ball's velocity if needed
                }
            });
            
            Composite.add(engine.world, [ball, player1, player2, topground, downground, leftground, rightground]);
            // // run the renderer
            Render.run(render);
            Runner.run(Runner.create(), engine);
            // Body.setPosition(player2,  {x: ball.position.x, y:20})

            
            gameDiv.current!.addEventListener('mousemove', (event: MouseEvent) => {
                let mouseX = event.clientX;
                let mouseY = event.clientY;
                // calculate new position for paddleA
                // let newPosition = { x: mouseX, y: player2.position.y };
                if (render.options && render.options.width){
                    const playerWidth = 125;
                    const paddleX = Math.min(Math.max(mouseX - playerWidth / 2, playerWidth / 2), render.options.width - playerWidth / 2)
                    Body.setPosition(player2,  {x: paddleX, y:player2.position.y})
                }
            });
            console.log("hello");
            Matter.Events.on(engine, "beforeUpdate", () => {
            Body.setPosition(player1,  {x: ball.position.x, y:player1.position.y})
        });
        return () =>{
             render.canvas.remove();
        }

    };

    

    useEffect(() => {
        initializeObjects();
    }, []);

    return (
            <div className="hh" ref={gameDiv}></div>
    );
}

export default RanderGame;