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
} from "matter-js";
import { GameDependency, GameDto } from "../game/game.dto";

interface RealTimeGameProps  {
  socket: Socket;
  clientId: string;
  gameDependency: GameDependency;
  gameProperties: GameDto,
};

let engine ;
let width = 600;
let height = 800;
let paddleWidth = 125;
let paddleHeight = 20;

const RealTimeGame: React.FC<RealTimeGameProps> = ({ socket , clientId , gameDependency, gameProperties}) => {
  // You can now use the socket object here

  const gameDiv = useRef<HTMLDivElement>();
  console.log(`i'm a realTime component: clientid : ${clientId}`);
  console.log(`gameDDep :`);
  console.log(gameDependency);
  
  socket.on("update", res => {
    console.log(res);
    
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
    let ball = Bodies.circle(
      gameProperties.ball.x,
      gameProperties.ball.y,
      10, {
          restitution: gameDependency.ballOptions.restitution,
          frictionAir: gameDependency.ballOptions.frictionAir,
          friction: gameDependency.ballOptions.friction,
          inertia: gameDependency.ballOptions.inertia,
          render:{
            fillStyle: gameDependency.ballOptions.color,
          }
      })
      Matter.Body.setVelocity(ball, {
        x: gameDependency.ballOptions.velocityX,
        y: gameDependency.ballOptions.velocityY}
    )
    let player1 = Bodies.rectangle(
      gameProperties.player1.x,
      gameProperties.player1.y,
      paddleWidth,
      paddleHeight,
      {
        isStatic: true,
        chamfer: {radius: gameDependency.playersOption.chamferReduis},
        render:{fillStyle: gameDependency.playersOption.color}
      }
    )
    let player2 = Bodies.rectangle(
      gameProperties.player2.x,
      gameProperties.player2.y,
      paddleWidth,
      paddleHeight,
      {
        isStatic: true,
        chamfer: {radius: gameDependency.playersOption.chamferReduis},
        render:{fillStyle: gameDependency.playersOption.color}
      }
    )

    Composite.add(engine.world, [ball, player1, player2, topground, downground, leftground, rightground]);
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
