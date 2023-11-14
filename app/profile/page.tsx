'use client'
import Navbar from "../components/Navbar"
import Image from "next/image"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux';
import Achievements from "../components/Achievements"
import MatchHist from "../components/MatchHist"
import { UserInfos, fetchInfos, userState } from "../Slices/userSlice"
import { AsyncThunk } from "@reduxjs/toolkit"
import { AppDispatch, RootState } from "../store/store";

export default function Pra() {

  const matchHIst = useSelector((state: RootState) => state.user.user_Data?.matches);
  const Achievs = useSelector((state: RootState) => state.user.user_Data?.achievements);
  const dataUser = useSelector((state: RootState) => state.user.user_Data?.userData);

  console.log("================");
  // console.log(matchHIst);
  // console.log(dataUser);

  
  console.log("================");
  // const status = useSelector((state: any) => state.user.status);
  // const error = useSelector((state: any) => state.user.error);


  // localStorage.setItem('user', JSON.stringify({ name: 'anas jaidi', userName: ' mqwed khou anas', rank: 1000000000, level: 100000 }))
  // const [data, setData] = useState(null)
  // const [isLoading, setLoading] = useState(true)
 
  // useEffect(() => {
  //   fetch('http://10.11.3.8:3000/users/GetUsers')
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setData(data)
  //       setLoading(false)
  //     })
  // }, [])

  return (




    <div className="flex flex-col medium:h-full min-h-screen min-w-screen">
      <div className="h-16 mb-7 w-full Large:h-24"><Navbar pageName="Profile" /></div>
      <div className="flex justify-between flex-col space-y-16 medium:space-y-0 h-full  medium:flex-row  medium:gap-12 medium:min-h-[1200px] w-[410px] medium:w-[95%] xMedium:h-[1200px] medium:min-w-[1000px] medium:mx-auto">
        <div className="w-[100%] xMedium:w-[45%] medium:h-[90%] h-[80%] Large:h-full items-center xMedium:ml-0 m-auto flex flex-col medium:gap-6">
          <div className="flex flex-col xMedium:flex-row w-[100%] items-center xMedium:w-full h-[40%] medium:h-[40%] xMedium:h-[32%] xLarge:h-[45%] Large:h-[38%] rounded-lg medium:mb-2 mx-auto">
            <div className="min-w-[30%] w-72 h-[70%]">
              <div className="grid h-full w-full content-center ">
                {dataUser?.avatar && <Image className='rounded-full border-4 mx-auto w-40 h-40 xMedium:w-36 xMedium:h-36 Large:w-56 Large:h-56 border-[#E58E27]' alt='' src={dataUser?.avatar} height={150} width={150}/>}

                {/* <Image className='shadow-neon-light' layout="fill" objectFit="contain" src={'/gsus.jpeg'} alt="PING PONG" /> */}
              </div>
            </div>
            <div className="flex flex-col my-auto h-48 medium:h-[60%] w-[70%] justify-between text-[14px] xMedium:w-[90%] medium:rounded-xl rounded-2xl min-w-[320px] Large:h-[90%] xLarge:h-[95%] xMedium:h-[70%] xMedium:text-[16px]">
              <div className="flex xLarge:text-2xl Large:text-xl Large:p-5 xLarge:p-6 justify-between w-full xMedium:p-4 p-3 mx-auto bg-[#323232] rounded-2xl">
                <div>Name :</div>
                <div>{dataUser?.firstName} {dataUser?.lastName}</div>
              </div>
              <div className="flex xLarge:text-2xl Large:text-xl Large:p-5 xLarge:p-6 justify-between w-full xMedium:p-4 p-3 mx-auto bg-[#323232] rounded-2xl">
                <div>User Name :</div>
                <div>{dataUser?.login}</div>
              </div>
              <div className="flex xLarge:text-2xl Large:text-xl Large:p-5 xLarge:p-6 justify-between w-full xMedium:p-4 p-3 mx-auto bg-[#323232] rounded-2xl">
                <div>Rank :</div>
                <div>19</div>
              </div>
              <div className="flex xLarge:text-2xl Large:text-xl Large:p-5 xLarge:p-6 justify-between w-full xMedium:p-4 p-3 mx-auto bg-[#323232] rounded-2xl">
                <div>Level :</div>
                <div>105</div>
              </div>
              {/* <div className="flex flex-col justify-between h-[65%] text-lg xLarge:text-2xl m-auto text-slate-500">
                <div className="md:py-2">Name : </div>
                <div className="md:py-2">User Name :</div>
                <div className="md:py-2">Rank :</div>
                <div className="md:py-2">Level :</div>
              </div>
              <div className="flex flex-col justify-between h-[65%] text-lg xLarge:text-2xl m-auto text-white">
                <div className="md:py-2">{user.name}</div>
                <div className="md:py-2">{user.userName}</div>
                <div className="md:py-2">{user.rank}</div>
                <div className="md:py-2">{user.level}</div>
              </div> */}
            </div>
          </div>
          {/* <Achievements noBadge={"user.pathImg"}/> */}
          <Achievements noBadge="/noBadge.png" Achievs={Achievs}/>
        </div>
        <div className="h-[60%] medium:h-[90%] Large:h-full w-full medium:w-[38%] medium:min-w-[50%] bg-[#323232] flex flex-col items-center m-auto rounded-2xl">
          <h1 className=" xLarge:text-3xl medium:pt-9 text-[#E58E27] p-5">LAST MATCH HISTORY</h1>
          <div className="overflow-y-scroll flex flex-col h-[100%] medium:h-[90%] w-[100%] medium:w-[100%] text-[#E58E27] m-auto scrollbar-hide">
          {matchHIst?.map((_: any, index: number) => (
    <div key={index} className="p-5">
      <MatchHist index={index} />
    </div>
  ))}
          </div>
        </div>
      </div>

    </div>


  )
} 