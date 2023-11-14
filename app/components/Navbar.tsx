import Link from 'next/link';
import React from 'react'
import { AiOutlineSearch } from "react-icons/ai";
import { BsFillPlayCircleFill } from "react-icons/bs";

type Props = {
    pageName: string
}

export default function Navbar({pageName}:Props) {
  return (
    <div className='flex justify-between medium:min-w-[640px] h-16 Large:h-24 mx-6'>
      <div className='flex w-[50%] text-[#E58E27] justify-normal items-center'>
        <h3 className='md:pr-8 pr-3 md:ml-3 xLarge:text-xl'>{pageName}</h3>
        <div className='relative'>
          <div>
            <input maxLength={13} type='text' className='text-orange-100 pl-1 py-1 text-sm focus:outline-none Large:w-[400px] w-32 Large:text-lg medium:w-[300px] border rounded-lg bg-transparent border-[#E58E27]'></input>
          </div>
          <div className='absolute top-1 left-[100px] Large:left-[368px] medium:left-[270px] text-2xl Large:text-3xl'><AiOutlineSearch/></div>
        </div>
      </div>
      <div className='flex w-[40%] text-[#E58E27] justify-end items-center'>
        <Link href={'/'}><h1 className="text-[#E58E27] mr-2 md:mr-8 font-sans text-md font-bold flex-none Large:text-xl">AREA 420</h1></Link>
        <Link href={'/game'} className=' medium:py-1 medium:px-6 Large:px-8 bg-[#E58E27] text-sm text-slate-100 rounded-full medium:rounded-sm flex-none Large:text-xl  ml-8'>
          <div className='hidden medium:block'>PLAY</div>
          <div className='text-3xl rounded-full medium:hidden'><BsFillPlayCircleFill/></div>
        </Link>
      </div>
    </div>
  )

}