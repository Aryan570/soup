import { connectToDatabase } from "@/lib/mongodb"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(request: Request) {
  let body = await request.json();
  let session = await getServerSession(authOptions);
  let devices : string[] = session.devices;
  devices.push(body);
  let { db } = await connectToDatabase();
  await db.createCollection(`${body}`);
  await db.collection("users").updateOne({name : session.name , password : session.password}, {$set : {devices : devices}});
  console.log("collection created", body);
  return Response.json({})
}