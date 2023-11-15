import React, { useState } from 'react';
import RanderGame from "./game";
import "./GameButtons.css";

const GameButtons = () => {

    const [showBotGame, setShowBotGame] = useState(false)
    const handlePlayWithBot = () => {
        // Handle logic for playing with a bot
        console.log('Playing with Bot');
    };

    const handlePlayWithRandomUser = () => {
    // Handle logic for playing with a random user
    console.log('Playing with Random User');
    };

    const handlePlayWithFriend = () => {
    // Handle logic for playing with a friend
    console.log('Playing with Friend');
    setShowBotGame(true)
    };

    return (
    <div className='button-container'>
        {!showBotGame && ( 
            <>
                <button className='play-button' onClick={handlePlayWithBot}>Play with Bot</button>
                <button className='play-button' onClick={handlePlayWithRandomUser}>Play with Random</button>
                <button className='play-button' onClick={handlePlayWithFriend}>Play with Friend</button>
            </>
       )}
        {showBotGame && <RanderGame/>}
    </div>
  );
};

export default GameButtons;