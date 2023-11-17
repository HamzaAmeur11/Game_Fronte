import React, { useContext, useState } from 'react';
import GameBot from "./GameBot";
import "./GameButtons.css";
import RealTimeGame from "./RealTimeGame"
import { WebsocketContext } from '../Contexts/WebSocketContext';
import { Socket } from 'socket.io-client';



const GameButtons = () => {

    const socket = useContext(WebsocketContext);


    const [showBotGame, setShowBotGame] = useState(false)
    const [showRandomGame, setShowRandomGame] = useState(false)
    const [showfriendGame, setShowFriendGame] = useState(false)
    
    const handlePlayWithBot = () => {
        // Handle logic for playing with a bot
        console.log('Playing with Bot');
        setShowBotGame(true)
    };

    const handlePlayWithRandomUser = () => {
        console.log('Playing with Random User');
        setShowRandomGame(true);
    
    };

    const handlePlayWithFriend = () => {
        console.log('Playing with Friend');

    };

    return (
    <div className='button-container'>
        {!showBotGame && ( 
            <>
                <button className='play-button' onClick={handlePlayWithBot}>Play with Bo9a</button>
                <button className='play-button' onClick={handlePlayWithRandomUser}>Play with Random</button>
                <button className='play-button' onClick={handlePlayWithFriend}>Play with Friend</button>
            </>
       )}
        {showBotGame && <GameBot/>}
        {showBotGame && <RealTimeGame socket={socket} />}
    </div>
  );
};

export default GameButtons;