"use client"
import React, { useEffect, useState } from 'react'
// Without two lines below , the whole thing will break, DO NOT TOUCH THIS CODE. IF YOU TOUCHED THE CODE, I'LL HAUNT YOU. : )
import dynamic from 'next/dynamic'
const Graph_test = dynamic(() => import('./Graph_test'), { ssr: false })
const Scatter_type = dynamic(() => import('./Scatter_type'), { ssr: false })
const Display_energy = dynamic(() => import('./Display_energy'), { ssr: false })
import io from 'socket.io-client'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
const Grid_check =  () => {
  const [Arr, setArr] = useState([]);
  const [Pwr,setPwr] = useState({});
  useEffect(() => {
     async function get_data() {
      const fkhell = await fetch('/api/fetchall');
      const fss = await fkhell.json();
      // console.log(fss);
      setArr(fss.arr);
    }
    const ar = get_data();
  }, [])
  
  useEffect(() => {
    const socket = io('http://localhost:3002');
    socket.on('connect',()=>{
        console.log("connected from client")
    })
    socket.on('new_data',(data :any)=>{
       let soup : any = Arr.slice();
       soup.push({current : data.current,voltage : data.voltage , power : data.power});
       setPwr({current : data.current,voltage : data.voltage , power : data.power});
      setArr(soup);
    })
    return () => {
      socket.disconnect();
    }
  }, [Arr])
  
  return (
      <ResizablePanelGroup
        direction="horizontal"
        className="max-w-full rounded-lg border inset-0"
      >
        <ResizablePanel defaultSize={33}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={50}>
              <div className="flex h-full items-center justify-center p-6">
                <span className="flex justify-center items-center font-semibold"><Graph_test arr={Arr} /></span>
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={50}>
              <div className="flex h-full items-center justify-center p-6">
                <span className="font-semibold"><Graph_test arr={Arr} /></span>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={33}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={50}>
              <div className="flex h-full items-center justify-center p-6">
                <span className="font-semibold"><Scatter_type /></span>
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={50}>
              <div className="flex h-full items-center justify-center p-6">
                <span className="font-semibold"><Graph_test arr={Arr} /></span>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={33}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="flex justify-center items-center font-semibold"><Display_energy pwr={Pwr}/></span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    //ResizableHandle goes where you want to control
    // <div className='grid grid-rows-2 grid-cols-3 min-h-screen max-h-screen'>
    //     <div className='col-start-1 flex justify-center items-center row-start-1 row-span-1 col-span-1 border-2 border-zinc-950 overflow-scroll scrollbar-hide rounded-3xl m-1'>
    //       <Graph_test/>
    //     </div>
    //     <div className='col-start-2 flex justify-center items-center row-start-1 row-span-1 col-span-1 border-2 border-zinc-950 overflow-scroll scrollbar-hide rounded-3xl m-1'>
    //       <Scatter_type/>
    //     </div>
    //     <div className='col-start-1 flex justify-center items-center row-start-2 row-span-1 col-span-1 border-2 border-zinc-950 overflow-scroll scrollbar-hide rounded-3xl m-1'>
    //       <Graph_test/>
    //     </div>
    //     <div className='col-start-2 flex justify-center items-center row-start-2 row-span-1 col-span-1 border-2 border-zinc-950 overflow-scroll scrollbar-hide rounded-3xl m-1'>
    //       <Graph_test/>
    //     </div>
    //     <div className='col-start-3 flex justify-center items-center row-start-1 row-span-2 col-span-1 border-2 border-zinc-950 overflow-scroll scrollbar-hide rounded-3xl m-1'>
    //       <Graph_test/>
    //     </div>
    // </div>
  )
}

export default Grid_check
