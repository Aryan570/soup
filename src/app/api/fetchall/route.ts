import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb';
import { Server } from 'socket.io'

export async function GET() {
  const io = new Server({ path: "/api/fetchall", addTrailingSlash: false, cors: { origin: "*" } }).listen(3001);
  io.on('connection', () => {
    console.log("SomeOne connected")
  })
  // const {db} = await connectToDatabase();
  // const res = db.collection("Major_Pro").find()
  // const arr = await res.toArray();
  // console.log(arr)
  return NextResponse.json({})
}