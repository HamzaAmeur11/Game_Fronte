"use client"

import { useEffect, useRef, useState } from "react";
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
import { GameDependency } from "../../game/game.dto";

interface RealTimeGameProps  {
  socket: Socket;
  clientId: string;
  gameId: string;
  gameDependency: GameDependency;
};

let engine: Matter.Engine ;
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

let ID: number;

const RealTimeGame: React.FC<RealTimeGameProps> = ({ socket , clientId , gameId , gameDependency}) => {
  // You can now use the socket object here

	const gameDiv = useRef<HTMLDivElement>();
	const [objectsInitialized, setObjectsInitialized] = useState(false);
	console.log("i'm a realTime component: clientid : ", clientId);

	
	useEffect(() => {

		engine = Engine.create({
			gravity: {
			  x: gameDependency.engineOption.gravityX,
			  y: gameDependency.engineOption.gravityY,
			//   scale: gameDependency.engineOption.gravityScale,
			},
			// positionIterations : gameDependency.engineOption.positionIterations,
			// velocityIterations : gameDependency.engineOption.velocityIterations,
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
		
		socket.on("START", res => {
			console.log("START");
			console.log(res);
			ID = res.ID;
			ball = res.ball;
			Pv1 = res.p1;
			Pv2 = res.p2;
			score1 = res.score1;
			score2 = res.score2
			console.log("START ID: " , ID);
			console.log("p1 : ", res.p1);
			console.log("p2 : ", res.p2);
			ballBody = Bodies.circle(ball.x, ball.y, 10 );
			player1 = Bodies.rectangle( Pv1.x , Pv1.y , paddleWidth , paddleHeight,{ isStatic: true,  chamfer: { radius: 10},})
			player2 = Bodies.rectangle( Pv2.x , Pv2.y , paddleWidth , paddleHeight,{ isStatic: true,  chamfer: { radius: 10},})
			setObjectsInitialized(true);
	  });
	  
		socket.on("UPDATE", res=>{
			// console.log("UPDATE ID: " , ID);
			// console.log("p1 : ", res.p1);
			// console.log("p2 : ", res.p2);
			
			Body.setPosition(ballBody,res.ball)
			Body.setPosition(ballBody,res.ball)
			Body.setPosition(player1,res.p1)
			Body.setPosition(player2,res.p2)
			Engine.update(engine);
		});
	
		socket.on("WinOrLose", res=>{
			Render.stop(render);	
			if (res.content === "win")
				console.log("YOU WIN");
			else
				console.log("YOU LOSE");
		})
		
		socket.on("GAMEOVER", res=>{
			
			Render.stop(render);	
			console.log("GAMEOVER");
		})
	
		if (gameDiv.current)
			gameDiv.current.addEventListener('mousemove', (event: MouseEvent) => {
				let mouseX = event.clientX - gameDiv.current!.offsetLeft;
				let vecY = ID === 1 ? 780: 20;
				if (clientId && render.options && render.options.width ){
					const paddleX = Math.min(Math.max(mouseX - paddleWidth / 2, paddleWidth / 2), render.options.width - paddleWidth / 2)
					console.log("UPDATE CLIENTID: ", clientId);
					socket.emit("UPDATE", {
						gameId: gameId,
						vec: { x: ID === 1 ? paddleX: width - paddleX, y: vecY },
					})
				}
			})
		if (objectsInitialized){
			console.log("hello");

			World.add(engine.world, [ballBody, player1, player2, topground, downground, leftground, rightground]);
			Runner.run(Runner.create(), engine);
			Render.run(render);
		}
		return () =>{
			render.canvas.remove();
		}
	}, [objectsInitialized])

  return <div ref={gameDiv}></div>;
};

export default RealTimeGame;
