"use client"
import { Loader2 } from 'lucide-react';
import React, { Suspense, useEffect, useState } from 'react'
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Tooltip, Label } from 'recharts';

// const data = [
//     { name: 'Group A', value: 400 },
//     { name: 'Group B', value: 300 },
//     { name: 'Group C', value: 300 },
//     { name: 'Group D', value: 200 },
// ];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];
const RADIAN = Math.PI / 180;

const Pie_type = ({changes}: any) => {
    // console.log(changes)
    const data = changes.map((ch : any)=>{
        return {name : ch.collection , energy : (ch.change.fullDocument.energy)/(3600*1000)};
    })
    console.log(data)
    // const session = await getServerSession(authOptions);
    // const [check, setcheck] = useState(false);
    // data.push({name : "bulb", energy : bulb});
    // const [changes, setChanges] = useState([] as any);
    // useEffect(() => {
    //     const eventSource = new EventSource('/api/pie');
    //       eventSource.onmessage = (event) => {
    //         const newChange = JSON.parse(event.data);
    //         setChanges((prevChanges : any) => [...prevChanges, newChange]);
    //         console.log(changes)
    //       };
    //       eventSource.onerror = (error) => {
    //         console.error('EventSource failed:', error);
    //         eventSource.close();
    //       };
    
    //   return () => {
    //     eventSource.close();
    //   }
    // }, [changes])
    
    
    "use client"
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };
    // console.log(data);
    // let k : any[] = [];
    // if(bulb !== 0){
    //     k = data.filter((d)=>{
    //         d.name !== "bulb"
    //     });
    //     console.log(k);
    //     k.push({name : "bulb", energy : bulb});
    //     console.log(data);
    // }
    // k.push({name : "lamp", energy : 1000});
    // console.log("this one",data);
    return (
        <Suspense fallback={<Loader2 />}>
            <div className='text-xs font-mono w-60 h-60'>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart width={400} height={400}>
                        <Pie
                            data={data}
                            cx={100}
                            cy={100}
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="energy"
                        >
                            {data.map((entry : any, index : any) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                            
                        </Pie>
                        {/* <Label className='z-30' position="bottom" value="Energy (Ws)"/> */}
                        <Tooltip/>
                    </PieChart>
                </ResponsiveContainer>
                <div className='z-30 text-center - -translate-x-6 -translate-y-6'>Energy (KWh)</div>
            </div>
        </Suspense >
    )
}

export default Pie_type
