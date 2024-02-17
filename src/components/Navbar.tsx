import React from 'react'

const Navbar = () => {
  return (
    <div className='container shadow-md shadow-rose-300 rounded-full bg-rose-400 my-1'>
      <div className='flex flex-row p-1 justify-evenly text-white'>
        <div>Home</div>
        <div>About</div>
        <div>Logout</div>
      </div>
    </div>
  )
}

export default Navbar
