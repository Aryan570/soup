"use client"
import { Loader2 } from 'lucide-react';
import React, { Suspense } from 'react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
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
const Graph_test = (props: any) => {
    const data = props.arr;
    return (
        <Suspense fallback={<Loader2/>}>
            <div>
                <LineChart id="name" data={data} width={400} height={300}>
                    <Line dataKey="current" />
                    <CartesianGrid stroke='#ccc' />
                    <XAxis dataKey="voltage" />
                    <YAxis />
                </LineChart>
            </div>
        </Suspense>
    )
}

export default Graph_test
