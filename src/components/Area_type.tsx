"use client"
import { Loader2 } from 'lucide-react';
import React, { Suspense } from 'react'
import { CartesianGrid, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis ,AreaChart, Area} from 'recharts'
const Area_type = (props: any) => {
    const data = props.arr;
    return (
        <Suspense fallback={<Loader2/>}>
            <div className='text-xs font-mono'>
                <ResponsiveContainer width={400} height={300}>
                <AreaChart id="name" data={data} width={400} height={300}>
                    <Area type={'natural'} dataKey={props.y_label} fill='#DFB1E8' stroke='#DFB1E8' />
                    {/* <CartesianGrid stroke='#ccc' /> */}
                    {/* <Tooltip content={(props) => customTooltip(props)}/> */}
                    <Tooltip/>
                    <XAxis dataKey={props.x_label} label={{value:`${props.x_label}`,position:"insideBottom",offset:"1"}}/>
                    <YAxis type='number' dataKey={props.y_label} domain={[0,(dataMax : number) => (parseFloat((dataMax*(1.5)).toFixed(3)))]} label={{value:`${props.y_label}`,angle:-90,position:"insideLeft"}} />
                    {/* <Legend/> */}
                </AreaChart>
                </ResponsiveContainer>
            </div>
        </Suspense>
    )
}

export default Area_type