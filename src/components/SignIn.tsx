"use client"
import React from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation';

const SignIn = (props : {head : string}) => {
  const router = useRouter();
  return (
      <Button onClick={()=> router.push('/login')}>{props.head}</Button>
  )
}

export default SignIn
