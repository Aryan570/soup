// import Graph_test from "@/components/Graph_test";
// import Grid_check from "@/components/Grid_check";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from 'next/navigation'
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import SignOut from "@/components/SignOut";
import SignIn from "@/components/SignIn";
import Avat from "@/components/Avat";
export default async function Home() {
  const session = await getServerSession(authOptions);
  // console.log(session);
  // let devices = session.devices;
  // console.log(session.devices,typeof a);

  // Override console.error
  // This is a hack to suppress the warning about missing defaultProps in recharts library as of version 2.12
  // @link https://github.com/recharts/recharts/issues/3615
  const error = console.error;
  console.error = (...args: any) => {
    if (/defaultProps/.test(args[0])) return;
    error(...args);
  };

  return (
    <div className=" min-h-screen h-screen overflow-hidden font-mono font-extrabold text-sm">
      <nav className="backdrop-blur-lg mt-3">
        <div className="flex justify-around ">
          <div className="text-lg font-sans font-bold"><span className="text-rose-600">So</span>up.</div>
          <div className='flex items-center space-x-8  '>
            <Link className='hover:bg-gray-200 rounded-lg p-1' href={'/about'}>About</Link>
            {!session ? <SignIn /> : <SignOut />}
            <Avat username={session.name} />
          </div>
        </div>
      </nav>
      <div aria-hidden={true} className='absolute transform-gpu overflow-hidden blur-3xl -z-50 inset-x-0 pointer-events-none'>
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className='relative aspect-[1155/500] translate-x-40 -translate-y-56 rotate-[30deg] bg-gradient-to-b from-rose-400 via-pink-400 to-rose-400 left-[calc(50%-30rem)] w-[72.1875rem] opacity-40' />
      </div>
      <footer className="bottom-0 absolute">
        <div>
          <p>©️ 2024 Soup. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
