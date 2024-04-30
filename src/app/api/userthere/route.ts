import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb';
export async function POST(request: Request) {
  const justBody = await request.json();
  const {db} = await connectToDatabase();
  const res = await db.collection("users").findOne({
    name: justBody.username
  },{
    projection: {_id:0,name:1,password:1}
  })
  return NextResponse.json({res})
}