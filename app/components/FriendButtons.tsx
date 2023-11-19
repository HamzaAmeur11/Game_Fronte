import { Socket } from "socket.io-client";

interface FriendButtonsProps  {
    socket: Socket;
    clientId: string;
  };

const FriendButtons: React.FC<FriendButtonsProps> = ({socket, clientId})=>{
    const CreateNewGame = () =>{
        console.log(`Client id : |${clientId}|`);
        
        socket.emit("message", {
            "method":"create",
            "clientId": clientId,
        })
    }
    const JoinToGame = () =>{
        const GameId = document.getElementsByClassName("GameId");
        socket.emit("message", {
            "method": "join",
            "clientId": clientId,
            "gameId": GameId,
        })
    }

    return (
        <div>
            <button onClick={CreateNewGame}>Create new game</button>
            <button onClick={JoinToGame}>Join game</button>
            <input className="GameId" type="text" placeholder="Enter game ID" />
        </div>)
}
export default FriendButtons;