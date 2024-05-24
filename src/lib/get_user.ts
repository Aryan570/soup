"use server"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

const get_user  = async () => {
  const session = await getServerSession(authOptions);
  if(!session){
    return undefined;
  }
  return session;
}

export default get_user
