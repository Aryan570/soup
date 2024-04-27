"use client"
import { Loader2 } from 'lucide-react';
import React, { Suspense } from 'react'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
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
                    <Line stroke={props.y_label == "current" ? "red" : "#00b7eb"} type={'natural'} dataKey={props.y_label} />
                    <CartesianGrid stroke='#ccc' />
                    {/* <Tooltip content={(props) => customTooltip(props)}/> */}
                    <Tooltip/>
                    <XAxis dataKey={props.x_label}/>
                    <YAxis type='number' dataKey={parseFloat(props.y_label)} domain={[0,(dataMax : number) => (dataMax*2)]} label={{value:`${props.y_label}`,angle:-90,position:"insideLeft"}}/>
                    <Legend/>
                </LineChart>
                </ResponsiveContainer>
            </div>
        </Suspense>
    )
}

export default Graph_test
