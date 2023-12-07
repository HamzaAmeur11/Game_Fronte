"use client"

import Link from 'next/link';
import React from 'react'
import { AiOutlineSearch } from "react-icons/ai";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { useState } from 'react';

type Props = {
    pageName: string
}



export default function Navbar({pageName}:Props) {
  
  const usersData = [
    { id: 1, name: 'dser1', username: 'user1' },
    { id: 2, name: 'dser2', username: 'user2' },
    { id: 3, name: 'doyo', username: 'yoyo' },
    { id: 4, name: 'dodo', username: 'dodo' },
    { id: 5, name: 'doro', username: 'doro' },
    { id: 6, name: 'dppl', username: 'dppl' },
  ];
  const [searchInput, setSearchInput] = useState<string>('');
  const [hideIt, setHideIt] = useState<boolean>(false);
  const sortedUsersData = usersData.slice().sort((a, b) => a.name.localeCompare(b.name));

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };
  let filteredUsers = searchInput ? sortedUsersData.filter((user) =>
    user.name.toLowerCase().includes(searchInput.toLowerCase())
  )  : [];
  return (
    <div className='flex justify-between medium:min-w-[400px] h-16 Large:h-24 mx-6'>
      <div className='flex w-[50%] text-[#E58E27] justify-normal items-center'>
        <h3 className='md:pr-8 pr-3 ml-7 medium:ml-3 xLarge:text-xl'>{pageName}</h3>
        <div className='relative h-full w-full'>
          <div>
            <input maxLength={13} type='text' name={searchInput} onChange={handleSearch} className={`${hideIt ? "medium:w-[270px]" : "hidden"} medium:block top-[18px] absolute text-orange-100 pl-1 py-1 text-sm focus:outline-none Large:w-[400px] w-52 Large:text-lg medium:w-[300px] border rounded-lg bg-transparent border-[#E58E27]`}></input>
            <ul className={` overflow-y-auto scrollbar-hide max-h-48 list-none p-1 m-0 absolute top-[52px] text-sm Large:w-[400px] w-[270px] Large:text-lg medium:w-[300px] ${searchInput && filteredUsers.length > 0 && hideIt ? "" : "hidden medium:block"} ${searchInput && filteredUsers.length > 0 ? "" : "bg-opacity-0"} border-t-0 rounded-b-lg bg-opacity-80 bg-[#323232] border-[#E58E27]`}>
              {searchInput && filteredUsers.length === 0 ? (<li></li>) :
              (filteredUsers.map((user) => (
              <li
                key={user.id}
                className="cursor-pointer p-2 hover:text-orange-500 hover:bg-white rounded-md text-slate-200"
              >
                {user.name}
              </li>)
              )) }
            </ul>
          </div>
          <div className='hidden medium:block absolute top-5 left-[240px] Large:left-[368px] medium:left-[270px] text-2xl Large:text-3xl'><AiOutlineSearch/></div>
          <button onClick={() => setHideIt(!hideIt)} className={`absolute top-5 ${hideIt ? "left-[180px]" : "left-[5px]"} Large:left-[368px] medium:hidden medium:left-[270px] text-2xl Large:text-3xl`}><AiOutlineSearch/></button>
        </div>
      </div>
      <div className='flex w-[40%] text-[#E58E27] justify-end items-center'>
        <Link href={'/'}><h1 className={`${hideIt ? "hidden medium:block" : ""} text-[#E58E27] mr-2 md:mr-8 font-sans medium:text-md font-bold flex-none Large:text-xl`}>AREA 420</h1></Link>
        <Link href={'/game'} className="medium:py-1 medium:px-6 Large:px-8 bg-[#E58E27] text-sm text-slate-100 rounded-full medium:rounded-sm flex-none Large:text-xl  ml-8">
          <div className='hidden medium:block'>PLAY</div>
          <div className='text-3xl rounded-full medium:hidden'><BsFillPlayCircleFill/></div>
        </Link>
      </div>
    </div>
  )

}