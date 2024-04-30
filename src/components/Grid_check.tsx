"use client"
import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
const Graph_test = dynamic(() => import('./Graph_test'), { ssr: false })
const Display_energy = dynamic(() => import('./Display_energy'), { ssr: false })
import io from 'socket.io-client'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import Area_type from './Area_type'
import Navbar from './Navbar'
const Grid_check = (props : any) => {
  const [Arr, setArr] = useState([]);
  const [Pwr, setPwr] = useState({});
  const [curr_active,setcurr_active] = useState("readings");
  useEffect(() => {
    async function get_data() {
      const fkhell = await fetch('/api/fetchall',{
        method : "POST",
        body : JSON.stringify(curr_active)
      });
      const fss = await fkhell.json();
      setArr(fss.arr.reverse());
    }
    const ar = get_data();
  }, [curr_active])

  useEffect(() => {
    const socket = io('http://localhost:3002');
    socket.on('connect', () => {
      console.log("connected from client")
    })
    socket.on('new_data', (data: any) => {
      let soup: any = Arr.slice();
      soup.push({ current: data.current, voltage: data.voltage, power: data.power, Time: data.Time });
      setPwr({ current: data.current, voltage: data.voltage, power: data.power, energy: data.energy });
      setArr(soup.slice(-10));
    })
    return () => {
      socket.disconnect();
    }
  }, [Arr])

  return (
    <>
    <Navbar username={props.username} s_cur_active={setcurr_active}/>
    <div className='flex h-full mt-7 container'>
      <ResizablePanelGroup
        direction="horizontal"
        className="max-w-full min-w-max rounded-lg border inset-0 ml-1"
      >
        <ResizablePanel defaultSize={33}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={50}>
              <div className="flex h-full items-center justify-center p-6">
                <span className="flex justify-center items-center font-semibold"><Graph_test arr={Arr} x_label={"Time"} y_label={"current"} /></span>
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={50}>
              <div className="flex h-full items-center justify-center p-6">
                <span className="font-semibold"><Graph_test arr={Arr} x_label={"Time"} y_label={"voltage"} /></span>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={33}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={50}>
              <div className="flex h-full items-center justify-center p-6">
                <span className="font-semibold"><Area_type arr={Arr} x_label={"voltage"} y_label={"current"} /></span>
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={50}>
              <div className="flex h-full items-center justify-center p-6">
                <span className="font-semibold"><Graph_test arr={Arr} x_label={"Time"} y_label={"power"} /></span>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={33}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="flex justify-center items-center font-semibold"><Display_energy pwr={Pwr} /></span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
    </>
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
