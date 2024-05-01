import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb';
import makeHash from '@/app/hashing/hashPass';

export async function POST(request: Request) {
  const justBody = await (request).json()
  const pass = makeHash(justBody.password)
  let {db} = await connectToDatabase();
  const res = await db.collection("users").insertOne({
    name: justBody.username,
    password: pass,
    devices : ["bulb"]
  })
  return NextResponse.json({res,pass})
}