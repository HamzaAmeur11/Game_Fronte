import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { GoPerson, GoTrophy } from "react-icons/go";
import { HiOutlineChatBubbleLeftEllipsis } from "react-icons/hi2";
import { GiAchievement } from "react-icons/gi";
import { FiLogOut } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";

export default function Sidebar() {
    return (
        <div id="navbar1" className="bg-[#323232] text-slate-100 flex flex-col justify-between min-h-full h-full w-16 medium:w-20 xLarge:w-32">
                <div className='flex flex-col justify-between h-[60%]'>
                    <div className="p-1 xLarge:p-0 h-[10%]">
                        <Image className='rounded-full shadow-neon-light' src={'/batman.png'} layout="responsive" width={30} height={30} alt="PING PONG" priority={true} />
                    </div>
                    <div className='flex flex-col justify-between mt-10 xLarge:mt-24 h-[75%]'>
                          <Link className="text-[#E58E27] m-auto text-3xl xLarge:text-4xl" href={'/profile'}><GoPerson/></Link>
                          <Link className="text-[#E58E27] m-auto text-3xl xLarge:text-4xl" href={'/rank'}><GoTrophy/></Link>
                          <Link className="text-[#E58E27] m-auto text-3xl xLarge:text-4xl" href={'/chat'}><HiOutlineChatBubbleLeftEllipsis/></Link>
                          <Link className="text-[#E58E27] m-auto text-3xl xLarge:text-4xl" href={'/'}><GiAchievement/></Link>
                          <Link className="text-[#E58E27] m-auto text-3xl xLarge:text-4xl" href={'/setting'}><IoSettingsOutline/></Link>
                    </div>
                </div>
                <div className="text-[#E58E27] xLarge:text-2xl xLarge:items-center xLarge:m-auto xLarge:mb-8">LOG OUT</div>
        </div>
      )
}
