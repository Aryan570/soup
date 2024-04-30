import { connectToDatabase } from "@/lib/mongodb"

export async function POST(request: Request) {
    let body = await request.json();
    let {db} = await connectToDatabase();
    await db.createCollection(`${body}`);
    console.log("collection created",body);
    return Response.json({  })
  }