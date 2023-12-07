"use client"

import Navbar from "../components/Navbar"
import GameButtons from "../components/GameComonents/GameButtons"
import RanderGame from "../components/GameComonents/GameBot";

export default function Game() {
  
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