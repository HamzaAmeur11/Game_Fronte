import './globals.css'
import type { Metadata } from 'next'
import Sidebar from './components/Sidebar'
import { Space_Grotesk } from 'next/font/google';
import { Provider } from 'react-redux';
import store from './store/store';
import MyProvider from './store/provider';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: '300',
})

export const metadata: Metadata = {
  title: 'AREA 420 PING PONG',
  description: 'ONLINE PING PONG',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

    <html lang="en" className={spaceGrotesk.className}>
      <body className=''>
        <main className='flex min-w-fit h-full text-white justify-start bg-[#131313] ' >
          <MyProvider>
            <div className='w-20 xLarge:w-32'><Sidebar /></div>
            <div className='w-full medium:h-screen xMedium:h-full'>
            {children}
            </div>
          </MyProvider>
        </main>
      </body>
    </html>
  )
}
