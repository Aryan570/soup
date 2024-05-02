import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb';

export async function POST(request : Request) {
  const body = await request.json();
  const {db} = await connectToDatabase();
  const res = await db.collection(body).find().sort({$natural : -1}).limit(1)
//   const arr = await res.toArray();
//   console.log()
  return NextResponse.json(await res.toArray())
}