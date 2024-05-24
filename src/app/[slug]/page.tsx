'use client'
import { useEffect, useState } from "react"
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import Area_type from '@/components/Area_type'
import dynamic from 'next/dynamic'
import get_user from "@/lib/get_user"
import { redirect } from "next/navigation"
import Avat from "@/components/Avat"
import Link from "next/link"
import SignOut from "@/components/SignOut"
import { Options } from "@/components/Options"
const Graph_test = dynamic(() => import('@/components/Graph_test'), { ssr: false })
const Display_energy = dynamic(() => import('@/components/Display_energy'), { ssr: false })
interface Unit {
    current: string,
    voltage: string,
    Time: string,
    power: string
    energy?: number
}
export default function Device({ params }: { params: { slug: string } }) {
    const [Arr, setArr] = useState([] as Unit[]);
    const [Pwr, setPwr] = useState({});
    const [user, setuser] = useState<{ name: string, devices: string[] }>();
    useEffect(() => {
        async function ch() {
            const u = await get_user();
            if (u == undefined) {
                redirect('/');
            } else {
                setuser(u);
            }
        }
        ch();
    }, [])
    useEffect(() => {
        async function get_data() {
            const docs = await fetch('/api/fetchall', {
                method: "POST",
                body: JSON.stringify(params.slug)
            });
            const doc = await docs.json();
            setArr(doc.arr.reverse());
        }
        get_data();
    }, [params.slug])
    useEffect(() => {
        const eventSource = new EventSource(`/api/watch/${params.slug}`);
        eventSource.onmessage = (event) => {
            const data: Unit = JSON.parse(event.data);
            // console.log(data);
            let soup: Unit[] = Arr.slice();
            soup.push({
                current: data.current,
                voltage: data.voltage,
                power: data.power,
                Time: data.Time,
            });
            setPwr({ current: data.current, voltage: data.voltage, power: data.power, energy: data.energy });
            setArr(soup.slice(-10));
        };
        return () => {
            eventSource.close();
        };
    }, [params.slug, Arr])


    return (
        // <div>My Post: {params.slug}</div>
        <div className=" min-h-screen h-screen overflow-hidden font-mono font-extrabold text-sm">
            <nav className="backdrop-blur-lg mt-3 pb-3 border-b-[1px] z-10">
                <div className="flex justify-around">
                    <div className="text-2xl font-sans font-bold flex items-center space-x-2"><span className="text-rose-400">so</span>up. <h1 className="text-4xl font-thin flex items-center">/ <span className="ml-2 text-xl">{params.slug}</span></h1></div>
                    <div className="flex items-center space-x-8">
                        {user && <Options active={params.slug} devices={user?.devices as string[]}/>}
                        <Link className=' rounded-lg p-1' href={'/about'}>About</Link>
                        <SignOut/>
                        <Avat username={user?.name as string} />
                    </div>
                </div>
            </nav>
            <div className='flex h-4/5 mt-7 container'>
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
                                    {/* <span className="font-semibold"><Pie_type devices={props.devices} data={forpie} bulb = {bulbenergy} /></span> */}
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
        </div>
    )
}
