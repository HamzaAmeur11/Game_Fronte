import React, { useContext, useEffect, useState } from 'react';
import GameBot from "./GameBot";
import RealTimeGame from "./RealTimeGame";
import { WebsocketContext } from '../../Contexts/WebSocketContext';
import FriendButtons from './FriendButtons';
import { GameDependency } from '../../game/game.dto';
import RandomButtons from './RandomButtons';

const GameButtons = () => {
    
    const socket = useContext(WebsocketContext);
    const [clientId, setClientId] = useState<string>('');
    const [gameId, setGameId] = useState<string>('');
    const [gameDependency, setGameDependency] = useState<GameDependency>();

    const [showBotGame, setShowBotGame] = useState(false)
    const [showRandomGame, setShowRandomGame] = useState(false)
    const [showfriendModal, setShowFriendModal] = useState(false)

    socket.on("connection", res=>{
            console.log(`Client : ${res.clientId} Connected`);
            // console.log("response: ");
            // console.log(res);
            setClientId(res.clientId);
    })
    
    // socket.on("JOIN", res => {
        
        // })
    
    socket.on("CREATE", res => {
      setGameId(res.gameId);
    });

    socket.on("PLAY", res => {
      setGameId(res.gameId);
      setGameDependency(res.gameDependency);
      setShowRandomGame(true);
    });
  }, []); // Empty dependencies array to ensure the effect runs once when the component mounts

  const handlePlayWithBot = () => {
    console.log('Playing with Bot');
    setShowBotGame(true);
  };

    const handlePlayWithRandomUser = () => {
        console.log('Playing with Random User');
        socket.emit("RANDOM", { clientId : socket.id, })
    
    };

    const CreateNewGame = () =>{
        console.log(`Client id : |${clientId}|`);
        
        socket.emit("CREATE", { clientId: clientId,})
    }
    
    const JoinToGame = () =>{
        const GameId = document.getElementById("GameId") as HTMLInputElement;
        console.log(`GameId : ${GameId.value}`);
        
        socket.emit("JOIN", { clientId: clientId, gameId: GameId.value })
    }


    // useEffect(() => {
    //     const GameId = document.getElementById("GameId") as HTMLInputElement;
    //     const gameIdValue = GameId.value;
    //     console.log(gameIdValue);
    // }, []);

  return (
    <div className='flex justify-center items-center h-screen flex-col mt-5'>
        {!showBotGame && !showRandomGame && ( 
            <>
                <button className='w-[200px] h-[50px] bg-black text-[white] cursor-pointer text-base m-2.5 px-5 py-2.5 rounded-[5px] border-[none] hover:bg-[#AF6915]' onClick={handlePlayWithBot}>Play with Bo9a</button>
                {/* <button className='w-[200px] h-[50px] bg-black text-[white] cursor-pointer text-base m-2.5 px-5 py-2.5 rounded-[5px] border-[none] hover:bg-[#AF6915]' onClick={handlePlayWithRandomUser}>Play with Random</button> */}
                <RandomButtons socket={socket} clientId={clientId}></RandomButtons>
                <FriendButtons socket={socket} clientId={clientId}></FriendButtons>
            </>
       )}
        {showBotGame && <GameBot/>}
        {(showRandomGame && gameDependency) && <RealTimeGame socket={socket} clientId={clientId} gameId={gameId} gameDependency={gameDependency}/>}
        {/*{(!showRandomGame) && (
                
        )}*/}
    </div>
  );
};

export default GameButtons;
