"use client"
import { signOut } from 'next-auth/react'
import React from 'react'
import { Button } from './ui/button'

const SignOut = () => {
  return (
    <Button className='hover:bg-red-700 rounded py-1 px-3 text-white' variant={"destructive"} onClick={()=> signOut()}>LogOut</Button>
  )
}

export default SignOut
