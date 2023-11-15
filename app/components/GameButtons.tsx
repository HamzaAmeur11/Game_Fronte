import React, { useState } from 'react';
import RanderGame from "./game";
import "./GameButtons.css";

const GameButtons = () => {

    const [showBotGame, setShowBotGame] = useState(false)
    const [showRandomGame, setShowRandomGame] = useState(false)
    const [showfriendGame, setShowFriendGame] = useState(false)
    const handlePlayWithBot = () => {
        // Handle logic for playing with a bot
        console.log('Playing with Bot');
        setShowBotGame(true)
    };

    const handlePlayWithRandomUser = () => {
    // Handle logic for playing with a random user
    console.log('Playing with Random User');
    };

    const handlePlayWithFriend = () => {
    // Handle logic for playing with a friend
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
        {showBotGame && <RanderGame/>}
    </div>
  );
};

export default GameButtons;