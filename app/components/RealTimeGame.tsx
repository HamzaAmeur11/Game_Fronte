"use client"

import { useEffect, useRef } from "react";
import { Socket } from "socket.io-client";
import Matter, {
  Engine,
  Render,
  Bodies,
  Composite,
  Runner,
  Body,
  Vector,
  World,
} from "matter-js";
import { GameDependency, GameDto } from "../game/game.dto";

interface RealTimeGameProps  {
  socket: Socket;
  clientId: string;
  gameDependency: GameDependency;
};

let engine ;
let width : number = 600;
let height : number = 800;
let paddleWidth : number = 125;
let paddleHeight : number = 20;
let ball : Vector;
let Pv1: Vector;
let Pv2: Vector;
let score1: number;
let score2: number;

let ballBody: Body;
let player1: Body;
let player2: Body;


const RealTimeGame: React.FC<RealTimeGameProps> = ({ socket , clientId , gameDependency}) => {
  // You can now use the socket object here

  const gameDiv = useRef<HTMLDivElement>();
  console.log(`i'm a realTime component: clientid : ${clientId}`);
  console.log(`gameDDep :`);
  console.log(gameDependency);

  socket.on("START", res => {
    console.log("START");
    console.log(res);
    
	  ball = res.ball;
	  Pv1 = res.p1;
	  Pv2 = res.p2;
	  score1 = res.score1;
	  score2 = res.score2
  });
  
  socket.on("UPDATE", res=>{
    console.log("UPDATE");
    
    console.log(res);
    // if (ballBody)
    // Body.setPosition(ballBody, res.ball);
    // if (player1)
    // Body.setPosition(player1, res.p1);
    // if (player2)
    // Body.setPosition(player2, res.p2);
	  ball = res.ball;
	  Pv1 = res.p1;
	  Pv2 = res.p2;
	  score1 = res.score1;
	  score2 = res.score2
  });

  socket.on("WinOrLose", res=>{
	if (res.content === "win")
		console.log("YOU WIN");
	else
		console.log("YOU LOSE");
		
  })
  
  useEffect(() => {
    engine = Engine.create({
      gravity: {
        x: gameDependency.engineOption.gravityX,
        y: gameDependency.engineOption.gravityY,
        scale: gameDependency.engineOption.gravityScale,
      },
      positionIterations : gameDependency.engineOption.positionIterations,
      velocityIterations : gameDependency.engineOption.velocityIterations,
    })

    let render = Render.create({
      element: gameDiv.current || document.body,
      engine: engine,
      options:{
        background: gameDependency.renderOptions.background,
        width: width,
        height: height, wireframes: gameDependency.renderOptions.wireframe,
      }
    })
    let topground =  Bodies.rectangle(0, 0, 1200, 10, { isStatic: true });
    let downground =  Bodies.rectangle(0, 800, 1200, 10, { isStatic: true });
    let leftground =  Bodies.rectangle(0, 0, 10, 1600, { isStatic: true });
    let rightground =  Bodies.rectangle(600, 0, 10, 1600, { isStatic: true });
    if (ball){
      ballBody = Bodies.circle(
        ball.x,
        ball.y,
        10, {
            restitution: gameDependency.ballOptions.restitution,
            frictionAir: gameDependency.ballOptions.frictionAir,
            friction: gameDependency.ballOptions.friction,
            inertia: gameDependency.ballOptions.inertia,
            render:{
              fillStyle: gameDependency.ballOptions.color,
            }
        })
      Body.setVelocity(ballBody, {
        x: gameDependency.ballOptions.velocityX,
        y: gameDependency.ballOptions.velocityY}
      )}
    if (Pv1)
      player1 = Bodies.rectangle(
        Pv1.x,
        Pv1.y,
        paddleWidth,
        paddleHeight,
        {
          isStatic: true,
          chamfer: {radius: gameDependency.playersOption.chamferReduis},
          render:{fillStyle: gameDependency.playersOption.color}
        }
      )
    if (Pv2)
      player2 = Bodies.rectangle(
        Pv2.x,
        Pv2.y,
        paddleWidth,
        paddleHeight,
        {
          isStatic: true,
          chamfer: {radius: gameDependency.playersOption.chamferReduis},
          render:{fillStyle: gameDependency.playersOption.color}
        }
      )
    if (ballBody && player1 && player2)
      World.add(engine.world, [ballBody, player1, player2, topground, downground, leftground, rightground]);
            // // run the renderer
    Render.run(render);
    Runner.run(Runner.create(), engine);
    return () =>{
      render.canvas.remove();
    }

  }, [])

  return <div ref={gameDiv}></div>;
};

export default RealTimeGame;
