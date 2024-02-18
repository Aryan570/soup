import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { LogIn } from 'lucide-react'
const Navbar = () => {
  return (
    <nav className='sticky h-14 inset-x-0 top-0 pt-2 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-sm transition-all'>
     <div className='flex justify-around items-center'>
        <Image src="/plug.png" width={40} height={40} alt='Soup.' />
        <div className='flex items-center space-x-8 font-mono font-extralight'>
          <Link className='hover:bg-gray-200 rounded-lg p-1'  href={'/'}>Overview</Link>
          <Link className='hover:bg-gray-200 rounded-lg p-1' href={'/'}>Customers</Link>
          <Link className='hover:bg-gray-200 rounded-lg p-1' href={'/'}>Settings</Link>
          <Link className='hover:bg-zinc-700 bg-zinc-950 rounded-md py-1 px-3 text-white' href={'/'}><div className='flex'>Login <LogIn/></div></Link>
        </div>
     </div>
    </nav>
  )
}

export default Navbar
