"use client"
import { Loader2 } from 'lucide-react';
import React, { Suspense } from 'react'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
// const data = [
//     {
//         name: "Power",
//         att1: 1500,
//         att2: 2000,
//         att3: 3000
//     },
//     {
//         name: "Power2",
//         att1: 2500,
//         att2: 3000,
//         att3: 4000
//     },
//     {
//         name: "Power3",
//         att1: 5500,
//         att2: 2000,
//         att3: 3000
//     },
//     {
//         name: "Power4",
//         att1: 1200,
//         att2: 2500,
//         att3: 3300
//     }
// ]
// const customTooltip = ({ active, payload, label } : any) => {
//     if (active && payload && payload.length) {
//         return (
//             <div className="bg-emerald-400 p-3 rounded-md text-white font-mono">
//                 <p>{`Voltage: ${label}`}</p>
//                 <p>{`Current: ${payload[0].value}`}</p>
//             </div>
//         );
//     }

//     return null;
// };
const Graph_test = (props: any) => {
    const data = props.arr;
    return (
        <Suspense fallback={<Loader2/>}>
            <div className='text-xs font-mono'>
                <ResponsiveContainer width={400} height={300}>
                <LineChart id="name" data={data} width={400} height={300}>
                    <Line dataKey={props.y_label} />
                    <CartesianGrid stroke='#ccc' />
                    {/* <Tooltip content={(props) => customTooltip(props)}/> */}
                    <Tooltip/>
                    <XAxis dataKey={props.x_label}/>
                    <YAxis dataKey={props.y_label} label={{value:`${props.y_label}`,angle:-90,position:"insideLeft"}}/>
                    <Legend/>
                </LineChart>
                </ResponsiveContainer>
            </div>
        </Suspense>
    )
}

export default Graph_test
