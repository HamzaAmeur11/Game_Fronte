'use client'
import './globals.css'
import type { Metadata } from 'next'
import Sidebar from './components/Sidebar'
import { Space_Grotesk } from 'next/font/google';
import MyProvider from './store/provider';
import { usePathname } from 'next/navigation';
import NotFoud404 from './notFoud404/page';
import { useState } from 'react';
import { AiOutlineMenu } from "react-icons/ai";
import React from 'react';


const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: '300',
})

const metadata: Metadata = {
  title: 'AREA 420 PING PONG',
  description: 'ONLINE PING PONG',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const router = usePathname();

    const handleMouseEnter = () => {
      setIsOpen(true)
    }

    const handleMouseLeave = () => {
      setIsOpen(false)
    }
    console.log(isOpen);

    if (router !== '/chat' && router !== '/profile' && router !== '/setting' && router !== '/rank' && router !== '/profs' && router !== '/game' && router !== '/2FaValidation' && router !== '/login') {
      return <NotFoud404/>;
    }
    if (router === '/2FaValidation' || router === '/login')
    return (

      <html lang="en" className={spaceGrotesk.className}>
        <body className=''>
          <main className='flex min-w-fit h-screen text-white justify-start bg-[#131313] ' >
              <div className='w-full medium:h-screen xMedium:h-full'>
                {children}
              </div>
          </main>
        </body>
      </html>
    )
  return (

    <html lang="en" className={spaceGrotesk.className}>
      <body className=' bg-[#131313] h-full w-full'>
        <main className='flex min-w-fit h-full text-white justify-start relative' >
          <MyProvider>
            <button onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className={` cursor-pointer absolute text-xl left-5 medium:hidden p-2 bg-[#E58E27] rounded-full top-3 z-40 w-5 h-10`}><AiOutlineMenu /></button>
            <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}  className={`${isOpen ? "left-0" : "left-[-80px]"} cursor-pointer medium:left-0 absolute z-50 h-screen w-10 medium:w-20 xLarge:w-32 `}><Sidebar /></div>
            <div className={`w-full medium:ml-16   h-screen xMedium:h-full`}>
            {React.Children.map(children, child => {
 return React.cloneElement(child as React.ReactElement<any>, { isOpen });
})}
            </div>
          </MyProvider>
        </main>
      </body>
    </html>
  )
}
