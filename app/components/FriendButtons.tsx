

const FriendButtons: React.FC<FriendButtonsProps> = ({socket, clientId})=>{
    const CreateNewGame = () =>{
        console.log(`Client id : |${clientId}|`);
        
        socket.emit("CREATE", { clientId: clientId,})
    }
    const JoinToGame = () =>{
        const GameId = document.getElementsByClassName("GameId")[0];
        console.log(`GameId : ${GameId.value}`);
        
        socket.emit("JOIN", { clientId: clientId, gameId: GameId.value })
    }

    return (
        <div>
            <button onClick={CreateNewGame}>Create new game</button>
            <button onClick={JoinToGame}>Join game</button>
            <input className="GameId" type="text" placeholder="Enter game ID" />
        </div>)
}
export default FriendButtons;