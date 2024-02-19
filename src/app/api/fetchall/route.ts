import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb';
export async function GET() {
  const {db} = await connectToDatabase();
  const res = db.collection("Major_Pro").find()
  const arr = await res.toArray();
  console.log(arr)
  return NextResponse.json({res})
}