import React, { useContext, useEffect, useState } from 'react';
import GameBot from "./GameBot";
import RealTimeGame from "./RealTimeGame"
import { WebsocketContext } from '../Contexts/WebSocketContext';
import { Socket } from 'socket.io-client';
// import FriendButtons from './FriendButtons';
import { GameDependency, GameDto } from '../game/game.dto';
import friendModal from './Modal';
import { Button } from 'rsuite';
import FriendButtons from './Modal';
// import { Modal , Button } from "rsuite";





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
    })

    socket.on("PLAY", res => {
        setGameId(res.gameId);
        setGameDependency(res.gameDependency)
        setShowRandomGame(true);
    })

    const handlePlayWithBot = () => {
        console.log('Playing with Bot');
        setShowBotGame(true)
    };

    const handlePlayWithRandomUser = () => {
        console.log('Playing with Random User');
        socket.emit("RANDOM", { clientId : socket.id, })
    
    };

    const openFriendModal = () => {
        console.log('Playing with Friend');
        setShowFriendModal(true);
    };

    const CreateNewGame = () =>{
        console.log(`Client id : |${clientId}|`);
        
        socket.emit("CREATE", { clientId: clientId,})
    }
    
    const closeModal = () => {
        setShowFriendModal(false);
    };
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
                <button className='w-[200px] h-[50px] bg-black text-[white] cursor-pointer text-base m-2.5 px-5 py-2.5 rounded-[5px] border-[none] hover:bg-[#AF6915]' onClick={handlePlayWithRandomUser}>Play with Random</button>
                <button className='w-[200px] h-[50px] bg-black text-[white] cursor-pointer text-base m-2.5 px-5 py-2.5 rounded-[5px] border-[none] hover:bg-[#AF6915]' onClick={openFriendModal}>Play with Friend</button>

            </>
       )}
        {showBotGame && <GameBot/>}
        {(showRandomGame && gameDependency) && <RealTimeGame socket={socket} clientId={clientId} gameId={gameId} gameDependency={gameDependency}/>}
        {(!showRandomGame) && (
            <div >
                <FriendButtons socket={socket} clientId={clientId}></FriendButtons>
            {/* <Modal open={showfriendModal} onClose={closeModal}  aria-labelledby="modal-title" aria-describedby="modal-description">
                <Modal.Header> 
                    <Modal.Title id="modal-title">Add Friends</Modal.Title> 
                </Modal.Header>
                <Modal.Body id="modal-description">
                    <button onClick={CreateNewGame} className="">Create new game</button>
                    <button onClick={JoinToGame} className="">Join game</button>
                    <input className="" id="GameId" type="text" placeholder="Enter game ID" />
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setShowFriendModal(false)}>Close</Button>
                </Modal.Footer>
            </Modal> */}
        </div>
        )}
    </div>
  );
};

export default GameButtons;