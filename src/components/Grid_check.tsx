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
import Pie_type from './Pie_type'
const Grid_check = (props: { username: string, devices: string[] }) => {
  const [Arr, setArr] = useState([]);
  const [Pwr, setPwr] = useState({});
  const [curr_active, setcurr_active] = useState("bulb");
  const [forpie, setforpie] = useState([]);
  const [bulbenergy, setbulbenergy] = useState(0);
  useEffect(() => {
    async function get_data() {
      const fkhell = await fetch('/api/fetchall', {
        method: "POST",
        body: JSON.stringify(curr_active)
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
      socket.emit("collec_name", curr_active);
    })
    socket.on('new_data', (data: any) => {
      let soup: any = Arr.slice();
      soup.push({ current: data.current, voltage: data.voltage, power: data.power, Time: data.Time });
      setPwr({ current: data.current, voltage: data.voltage, power: data.power, energy: data.energy });
      setbulbenergy(data.energy);
      setArr(soup.slice(-10));
    })
    return () => {
      socket.disconnect();
    }
  }, [Arr, curr_active])
  useEffect(() => {
    async function get_data(device: string) {
      const fkhell = await fetch('/api/get_last', {
        method: "POST",
        body: JSON.stringify(device)
      });
      const fss = await fkhell.json();
      return fss;
    }
    let tmp: any = [];
    props.devices.forEach(async (device: string) => {
      let a;
      if (device === "bulb"){
        a = await get_data(device);
      }
      
      if(a !== undefined){
      tmp.push({ name: device, energy: a[0].energy });
      }
    })
    setforpie(tmp);
  }, [props.devices])

  return (
    <>
      <Navbar username={props.username} s_cur_active={setcurr_active} devices={props.devices} />
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
                  {/* <span className="font-semibold"><Graph_test arr={Arr} x_label={"Time"} y_label={"voltage"} /></span> */}
                  <span className="font-semibold"><Pie_type devices={props.devices} data={forpie} bulb = {bulbenergy} /></span>
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
