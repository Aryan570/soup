import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb';

export async function GET() {
  const {db} = await connectToDatabase();
  const res = db.collection("readings").find({},{projection : {current:1,_id:0,voltage:1}}).sort({$natural : -1}).limit(10)
  const arr = await res.toArray();
  // console.log(arr,res)
  return NextResponse.json({arr})
}