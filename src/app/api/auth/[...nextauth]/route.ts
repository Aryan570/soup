import NextAuth from "next-auth/next"
import  CredentialsProvider  from "next-auth/providers/credentials"
import { connectToDatabase } from "@/lib/mongodb";
export const authOptions = {
    providers : [
        CredentialsProvider({
            name: "credentials",
            credentials: {},
            async authorize(credentials : any) : Promise<any>{
                const {uname,upass} =  credentials;
                const {db} = await connectToDatabase();
                // currently no idea of any database
                const user = await db.collection("users").findOne({
                      name: uname,
                      password: upass
                })
                return user;
            }
        })
    ],
    session: {
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token,user }: any) {
            if(user){
              token  = user
            }
            return {...token,...user};
        },
         async session ({ session, token }:any){
          session.user = token.user;
          return token
        }
      }
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };