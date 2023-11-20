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

interface RealTimeGameProps  {
  socket: Socket;
  clientId: string;
};

let engine = Engine.create();
let width = 600;
let height = 800;
let paddleWidth = 125;
let paddleHeight = 20;

const RealTimeGame: React.FC<RealTimeGameProps> = ({ socket , clientId }) => {
  // You can now use the socket object here

  const gameDiv = useRef<HTMLDivElement>();

  useEffect(() => {
    
  }, [])

  return <div ref={gameDiv}></div>;
};

export default RealTimeGame;
