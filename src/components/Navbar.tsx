"use client"
import React, { Dispatch, SetStateAction } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Avat from './Avat'
import Toggle_grp from './Toggle_grp'
import { Button } from './ui/button'
import { signOut } from 'next-auth/react'
interface User {
  username : string,
  s_cur_active: Dispatch<SetStateAction<string>>,
  devices : string[]
}
const Navbar = (props : User) => {
  return (
    <nav className=' sticky h-14 inset-x-0 top-0 pt-2 z-30 w-full border-b border-gray-200 bg-transparent  backdrop-blur-sm transition-all'>
     <div className='flex justify-around items-center'>
        <Image src="/plug.png" width={40} height={40} alt='Soup.' />
        <div className='flex items-center space-x-8 font-mono font-extrabold text-sm '>
          {/* <input type='number' id='cost' name='cost' defaultValue={30} className='rounded-lg p-2 border border-emerald-400 bg-transparent focus:ring-0 focus:outline-none focus:border-emerald-300' required/> */}
          <Link className='hover:bg-gray-200 rounded-lg p-1' href={'/about'}>About</Link>
          <Toggle_grp s_curr_active={props.s_cur_active} devices = {props.devices}/>
          <Button className='hover:bg-red-700 rounded py-1 px-3 text-white' variant={"destructive"} onClick={()=> signOut()}>LogOut</Button>
          <Avat username={props.username}/>
        </div>
     </div>
    </nav>
  )
}

export default Navbar
// bg-white/75