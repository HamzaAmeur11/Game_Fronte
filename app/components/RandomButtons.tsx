import React, { useState } from "react";
import Button from 'rsuite';
import { Socket } from "socket.io-client";

interface RandomButtons  {
    socket: Socket;
    clientId: string;
};

const FriendButtons: React.FC<RandomButtons> = ({socket, clientId})=>{
	const [showModal, setShowModal] = useState(false);
    const [mode, setMod] = useState('');
    const [map, setMap] = useState('');

    const handleMod = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setMod(event.target.value);
    };
    const handleMap = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setMap(event.target.value);
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

	return (
    <>
      <button
        className="w-[200px] h-[50px] bg-black text-[white] cursor-pointer text-base m-2.5 px-5 py-2.5 rounded-[5px] border-[none] hover:bg-[#AF6915]"
        type="button"
        onClick={() => setShowModal(true)}
      >
      Play with Random
      </button>
      {showModal ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                  <h3 className="text-3xl font=semibold">Play With Random</h3>
                  <button
                    className=""
                    onClick={() => setShowModal(false)}
                  >
                    <span className="text-black opacity-7 h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full">
                      x
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">

                    {/* <button onClick={CreateNewGame} className="w-[200px] h-[50px] bg-black text-[white] cursor-pointer text-base m-2.5 px-5 py-2.5 rounded-[5px] border-[none] hover:bg-[#AF6915]">Create new game</button>
                    <button onClick={JoinToGame} className="w-[200px] h-[50px] bg-black text-[white] cursor-pointer text-base m-2.5 px-5 py-2.5 rounded-[5px] border-[none] hover:bg-[#AF6915]">Join game</button>
                    <input className="bg-black text-[white] cursor-pointer text-base m-2.5 px-5 py-2.5 rounded-[5px] border-[none]" id="GameId" type="text" placeholder="Enter game ID" />
                    */}
                        <div>
                            <input type="radio" name="mapChoice" value="BEGINNER" checked={map === "BEGINNER" onChange={handleMap}}>BEGINNER</input>
                            <input>INTEMIDIER</input>
                            <input>ADVANCED</input>
                            <select>
                                <option value="BEGINNER">BEGINNER</option>
                                <option value="INTEMIDIER">INTEMIDIER</option>
                                <option value="ADVANCED">ADVANCED</option>
                            </select>
                        </div>
                        <input
                            type="radio"
                            name="modsChoice"
                            value="defi"
                            checked={mode === 'defi'}
                            onChange={handleMod}
                            />
                            <label>Defi</label>

                            <input
                            type="radio"
                            name="modsChoice"
                            value="time"
                            checked={mode === 'time'}
                            onChange={handleMod}
                            />
                            <label>Time</label>
                    
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className=" bg-black text-[white] cursor-pointer text-base m-2.5 px-5 py-2.5 rounded-[5px] border-[none] hover:bg-[#b44242de]"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-black text-[white] cursor-pointer text-base m-2.5 px-5 py-2.5 rounded-[5px] border-[none] hover:bg-[#AF6915]"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default FriendButtons;