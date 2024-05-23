"use client"
import React from 'react'
import { Button } from './ui/button'
import { redirect } from 'next/navigation';

const SignIn = (props : {head : string}) => {
  function handleClick(){
    redirect('/login');
  }
  return (
      <Button onClick={handleClick}>{props.head}</Button>
  )
}

export default SignIn
