import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
const Navbar = () => {
  return (
    <nav className='sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-sm transition-all'>
     <div className='flex justify-between'>
        <Image src="/plug.png" width={50} height={50} alt='Soup.' />
        <div className='flex items-center space-x-2 font-mono font-extralight'>
          <Link className='hover:bg-gray-200 rounded-lg p-1'  href={'/'}>Overview</Link>
          <Link className='hover:bg-gray-200 rounded-lg p-1' href={'/'}>Customers</Link>
          <Link className='hover:bg-gray-200 rounded-lg p-1' href={'/'}>Settngs</Link>
        </div>
     </div>
    </nav>
  )
}

export default Navbar
