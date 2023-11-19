import React, { useContext, useState } from 'react';
import GameBot from "./GameBot";
import "./GameButtons.css";
import RealTimeGame from "./RealTimeGame"
import { WebsocketContext } from '../Contexts/WebSocketContext';
import { Socket } from 'socket.io-client';
import FriendButtons from './FriendButtons';





const GameButtons = () => {
    
    const socket = useContext(WebsocketContext);
    let clientId: string = '';
    let gameId: string;


    const [showBotGame, setShowBotGame] = useState(false)
    const [showRandomGame, setShowRandomGame] = useState(false)
    const [showfriendGame, setShowFriendGame] = useState(false)
    const [showInputAndButtons, setShowInputAndButtons] = useState(false);

    socket.on("connection", res=>{
        if (res.method === "connect"){
            clientId = res.clientId;
            console.log(`Client : ${clientId} Connected`);
        }
    })

    socket.on("message", res =>{

    })

    const handlePlayWithBot = () => {
        // Handle logic for playing with a bot
        console.log('Playing with Bot');
        setShowBotGame(true)
    };

    const handlePlayWithRandomUser = () => {
        console.log('Playing with Random User');
        socket.emit("message", {
            "method": "random",
            "clientId": clientId 
        })
        /** Wait Until game Created **/
        setShowRandomGame(true);
    
    };

    const handlePlayWithFriend = () => {
        console.log('Playing with Friend');
        setShowFriendGame(true);
        setShowInputAndButtons(true);
    };

    return (
    <div className='button-container'>
        {/* <FriendButtons socket={socket} clientId={clientId}/> */}
        {!showBotGame && ( 
            <>
                <button className='play-button' onClick={handlePlayWithBot}>Play with Bo9a</button>
                <button className='play-button' onClick={handlePlayWithRandomUser}>Play with Random</button>
                <button className='play-button' onClick={handlePlayWithFriend}>Play with Friend</button>
            </>
       )}
        {showBotGame && <GameBot/>}
        {showBotGame && <RealTimeGame socket={socket} clientId={clientId}/>}
        {showInputAndButtons && <FriendButtons socket={socket} clientId={clientId}/>}
    </div>
  );
};

export default GameButtons;