"use client"

import Navbar from "../components/Navbar"
import GameButtons from "../components/GameButtons"
import RanderGame from "../components/game";

export default function Game() {

  console.log('test parent');
  
  return (
          <div className="flex flex-col text-slate-100 h-screen w-full">
            <div className=""><Navbar pageName="Game"/></div>
            <div className="border h-[87%] m-2 ">
              <div className="w-full h-full">
				        <GameButtons/>
                {/* <RanderGame/> */}
              </div>
            </div>
          </div>

  )
}