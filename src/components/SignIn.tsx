import React from 'react'
import { Button } from './ui/button'
import { redirect } from 'next/navigation';

const SignIn = () => {
  function handleClick(){
    redirect('/login');
  }
  return (
      <Button onClick={handleClick}>Sign In</Button>
  )
}

export default SignIn
