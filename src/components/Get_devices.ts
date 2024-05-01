import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { connectToDatabase } from "@/lib/mongodb";
import { getServerSession } from "next-auth"

const Get_devices = async () => {
  const session = await getServerSession(authOptions);
  const {db} = await connectToDatabase();
  let result = await db.collection("users").findOne({name : session.name , password : session.password});
  return result.devices;
}

export default Get_devices
