"use client"
import React, { useId } from 'react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
const data = [
    {
        name: "Power",
        att1: 1500,
        att2: 2000,
        att3: 3000
    },
    {
        name: "Power2",
        att1: 2500,
        att2: 3000,
        att3: 4000
    },
    {
        name: "Power3",
        att1: 5500,
        att2: 2000,
        att3: 3000
    },
    {
        name: "Power4",
        att1: 1200,
        att2: 2500,
        att3: 3300
    }
]
const Graph_test = () => {
    const charId = useId();
    return (
        <div>
            <LineChart id="name" data={data} width={400} height={300}>
                <Line dataKey="att1" />
                <CartesianGrid stroke='#ccc' />
                <XAxis dataKey="name" />
                <YAxis />
            </LineChart>
        </div>
    )
}

export default Graph_test
