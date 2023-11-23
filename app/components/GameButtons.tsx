import React, { useContext, useState } from 'react';
import GameBot from "./GameBot";
import "./GameButtons.css";
import RealTimeGame from "./RealTimeGame"
import { WebsocketContext } from '../Contexts/WebSocketContext';
import { Socket } from 'socket.io-client';
import FriendButtons from './FriendButtons';
import { GameDependency, GameDto } from '../game/game.dto';





const GameButtons = () => {
    
    const socket = useContext(WebsocketContext);
    const [clientId, setClientId] = useState<string>('');
    const [gameId, setGameId] = useState<string>('');
    const [gameDependency, setGameDependency] = useState<GameDependency>();
    const [gameProperties, setGameProperties] = useState<GameDto>();

    const [showBotGame, setShowBotGame] = useState(false)
    const [showRandomGame, setShowRandomGame] = useState(false)
    const [showfriendGame, setShowFriendGame] = useState(false)
    const [showInputAndButtons, setShowInputAndButtons] = useState(false);

    // const clientIdPromis = new Promise((resolve, reject) => {
    socket.on("connection", res=>{
        // if (res.method === "connect"){
            // resolve(res.clientId);
            console.log(`Client : ${res.clientId} Connected`);
            console.log("response: ");
            console.log(res);
            setClientId(res.clientId);
            
        // }
    })
 
    console.log(`Client : ${socket.id} Connected`);

    socket.on("message", res =>{
        console.log("------ res -----");
        // console.log(res);
        if (res.method === 'play'){
            setGameDependency(res.gameDependency);
            setGameProperties(res.gameProperties)

            console.log(res.gameDependency);
            console.log(gameDependency);
            console.log(res.gameProperties);
            console.log(gameProperties);
            setShowRandomGame(true);
        }
        console.log("------ end res -----");
    })

    const handlePlayWithBot = () => {
        console.log('Playing with Bot');
        setShowBotGame(true)
    };

    const handlePlayWithRandomUser = () => {
        console.log('Playing with Random User');
        socket.emit("message", {
            "method": "random",
            "clientId": socket.id, 
        })
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
        {!showBotGame && !showRandomGame && ( 
            <>
                <button className='play-button' onClick={handlePlayWithBot}>Play with Bo9a</button>
                <button className='play-button' onClick={handlePlayWithRandomUser}>Play with Random</button>
                <button className='play-button' onClick={handlePlayWithFriend}>Play with Friend</button>
            </>
       )}
        {showBotGame && <GameBot/>}
        {showRandomGame && gameDependency && gameProperties && <RealTimeGame socket={socket} clientId={clientId} gameDependency={gameDependency} gameProperties={gameProperties}/>}
        {!showRandomGame && showInputAndButtons && <FriendButtons socket={socket} clientId={socket.id}/>}
    </div>
  );
};

export default GameButtons;