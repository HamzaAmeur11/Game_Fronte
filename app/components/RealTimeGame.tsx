import { useRef } from "react";
import { Socket } from "socket.io-client";
import Matter, { 
    Engine, 
    Render, 
    Bodies, 
    Composite, 
    Runner, 
    Body
} from 'matter-js';



type RealTimeGameProps = {
    socket: Socket;
};

let engine = Engine.create();
let width = 600;
let height = 800;
let paddleWidth = 125;
let paddleHeight = 20;

const RealTimeGame: React.FC<RealTimeGameProps> = ({ socket }) => {
    // You can now use the socket object here

    const gameDiv = useRef<HTMLDivElement>();
    
    return <></>
   
};

export default RealTimeGame;