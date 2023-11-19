import React, { useContext, useState } from 'react';
import GameBot from "./GameBot";
import "./GameButtons.css";
import RealTimeGame from "./RealTimeGame"
import { WebsocketContext } from '../Contexts/WebSocketContext';
import { Socket } from 'socket.io-client';
import FriendButtons from './FriendButtons';





const GameButtons = () => {
    
    const socket = useContext(WebsocketContext);
    const [clientId, setClientId] = useState<string>('');
    const [gameId, setGameId] = useState<string>('');


    const [showBotGame, setShowBotGame] = useState(false)
    const [showRandomGame, setShowRandomGame] = useState(false)
    const [showfriendGame, setShowFriendGame] = useState(false)
    const [showInputAndButtons, setShowInputAndButtons] = useState(false);

    // const clientIdPromis = new Promise((resolve, reject) => {
        socket.on("connection", res=>{
            if (res.method === "connect"){
                setClientId(res.clientId);
                // resolve(res.clientId);
                console.log(`Client : ${res.clientId} Connected`);
            }
        })
    // });
 
    // clientIdPromis.then((id) =>{
    //     if (typeof id === 'string') 
    //     setClientId(id);
    //     console.log(`Client : ${id} Connected`);
    // })
 
    console.log(`Client : ${clientId} Connected`);

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
        if (!showInputAndButtons)
            setShowInputAndButtons(true);
        else
            setShowInputAndButtons(false);
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