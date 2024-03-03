"use client"
import React from 'react'
import { CartesianGrid, Scatter, ScatterChart, Tooltip, XAxis, YAxis, ZAxis } from 'recharts'
const data01 = [
    { x: 10, y: 30 },
    { x: 30, y: 200 },
    { x: 45, y: 100 },
    { x: 50, y: 400 },
    { x: 70, y: 150 },
    { x: 100, y: 250 }
  ];
  const data02 = [
    { x: 30, y: 20 },
    { x: 50, y: 180 },
    { x: 75, y: 240 },
    { x: 100, y: 100 },
    { x: 120, y: 190 }
  ];
const Scatter_type = () => {
  return (
    <div>
      <ScatterChart width={400} height={300} className='font-mono text-xs'> 
        <CartesianGrid/>
        <XAxis type='number' dataKey="x"/>
        <YAxis type='number' dataKey="y"/>
        <ZAxis range={[100]}/>
        <Tooltip/>
        <Scatter data={data01} fill='#51e9f4' line shape="cross"/>
        <Scatter data={data02} fill='#5bf451' line shape="square"/>
      </ScatterChart>
    </div>
  )
}

export default Scatter_type
