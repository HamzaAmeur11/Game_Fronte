import React from 'react'
import Image from 'next/image'
import { RootState } from '../store/store';
import { useSelector } from 'react-redux';

interface Achievement {
  unlocked: boolean;
  icon: string;
  title: string;
}

type Props = {
    noBadge: string;
    Achievs: Achievement[];
  };



function Achievements({noBadge, Achievs}:Props) {
  // const Achievs = useSelector((state: RootState) => state.user.user_Data?.achievements);
  // const unlocked = Achievs;
  return (
    <div className="xMedium:h-[60%] Large:h-full h-[50%] flex m-auto items-center mt-7 medium:mt-0 flex-col justify-between rounded-2xl w-full">
        <h1 className='text-center xLarge:text-3xl p-5 xLarge:p-0 text-[#E58E27] xLarge:mt-11'>{Achievs?.[0].title}</h1>
        <div className='xMedium:h-[90%] medium:w-[90%] grid content-center grid-cols-3 xLarge:grid-cols-4 gap-4 medium:gap-6 w-full h-full xLarge:gap-20'>
            <Image className='AchievsStyle' layout='Responsive' width={70} height={70} src={Achievs?.[0].unlocked ? Achievs?.[0].icon : noBadge} alt={Achievs?.[0].title} />
            <Image className='AchievsStyle' layout='Responsive' width={70} height={70} src={Achievs?.[1].unlocked ? Achievs?.[1].icon : noBadge} alt={Achievs?.[1].title}  />
            <Image className='AchievsStyle' layout='Responsive' width={70} height={70} src={Achievs?.[2].unlocked ? Achievs?.[2].icon : noBadge} alt={Achievs?.[2].title}  />
            <Image className='AchievsStyle' layout='Responsive' width={70} height={70} src={Achievs?.[3].unlocked ? Achievs?.[3].icon : noBadge} alt={Achievs?.[3].title}  />
            <Image className='AchievsStyle' layout='Responsive' width={70} height={70} src={Achievs?.[4].unlocked ? Achievs?.[4].icon : noBadge} alt={Achievs?.[4].title}  />
            <Image className='AchievsStyle' layout='Responsive' width={70} height={70} src={Achievs?.[5].unlocked ? Achievs?.[5].icon : noBadge} alt={Achievs?.[5].title}  />
            <Image className='AchievsStyle' layout='Responsive' width={70} height={70} src={Achievs?.[6].unlocked ? Achievs?.[6].icon : noBadge} alt={Achievs?.[6].title}  />
            <Image className='AchievsStyle' layout='Responsive' width={70} height={70} src={Achievs?.[7].unlocked ? Achievs?.[7].icon : noBadge} alt={Achievs?.[7].title}  />
            <Image className='AchievsStyle' layout='Responsive' width={70} height={70} src={Achievs?.[8].unlocked ? Achievs?.[8].icon : noBadge} alt={Achievs?.[8].title}  />
            <Image className='AchievsStyle' layout='Responsive' width={70} height={70} src={Achievs?.[9].unlocked ? Achievs?.[9].icon : noBadge} alt={Achievs?.[9].title}  />
            <Image className='AchievsStyle' layout='Responsive' width={70} height={70} src={Achievs?.[10].unlocked ? Achievs?.[10].icon : noBadge} alt={Achievs?.[10].title}  />
            <Image className='AchievsStyle' layout='Responsive' width={70} height={70} src={Achievs?.[11].unlocked ? Achievs?.[11].icon : noBadge} alt={Achievs?.[11].title}  />
        </div>
    </div>
  )
}

export default Achievements