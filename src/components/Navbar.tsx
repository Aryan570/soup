'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { LogIn } from 'lucide-react'
import Avat from './Avat'
import Toggle_grp from './Toggle_grp'
const Navbar = () => {
  return (
    <nav className='sticky h-14 inset-x-0 top-0 pt-2 z-30 w-full border-b border-gray-200 bg-transparent  backdrop-blur-sm transition-all'>
     <div className='flex justify-around items-center'>
        <Image src="/plug.png" width={40} height={40} alt='Soup.' />
        <div className='flex items-center space-x-8 font-mono font-extrabold text-sm '>
          {/* <input type='number' id='cost' name='cost' defaultValue={30} className='rounded-lg p-2 border border-emerald-400 bg-transparent focus:ring-0 focus:outline-none focus:border-emerald-300' required/> */}
          <Link className='hover:bg-gray-200 rounded-lg p-1' href={'/about'}>About</Link>
          <Toggle_grp/>
          <Link className='hover:bg-zinc-700 bg-zinc-950 rounded-md py-1 px-3 text-white' href={'/'}><div className='flex items-center'>Logout <LogIn className='scale-75'/></div></Link>
          <Avat/>
        </div>
     </div>
    </nav>
  )
}

export default Navbar
// bg-white/75