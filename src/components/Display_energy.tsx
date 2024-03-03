"use client"
import { Loader2 } from 'lucide-react';
import React, { BaseSyntheticEvent, Suspense, useState } from 'react'

const Display_energy = (props: any) => {
    const [Cost, setCost] = useState(10);
    function handleChange(e: BaseSyntheticEvent) {
        setCost(e.target.value)
    }
    return (
        <Suspense fallback={<Loader2 />}>
            <div className='text-sm font-light font-mono space-y-2'>
                <table className='border border-spacing-4 border-separate rounded-lg border-emerald-400 font-mono text-center'>
                    <tr>
                        <th>Current(A)</th>
                        <th>Voltage(V)</th>
                        <th>Power(W)</th>
                        <th>Energy(KWh)</th>
                    </tr>
                    <tr>
                        {/* <td>First</td> */}
                        <td>{props.pwr.current ? props.pwr.current : 0}</td>
                        <td>{props.pwr.voltage ? props.pwr.voltage : 0}</td>
                        <td>{props.pwr.power ? props.pwr.power : 0}</td>
                        <td>{props.pwr.energy ? (props.pwr.energy/(3600*1000)).toFixed(3) : 0}</td>
                    </tr>
                </table>
                <div className='space-y-1'>
                    <p className='pl-1'>Cost of 1 unit</p>
                    <div className='flex items-center'>
                        <input type='number' onChange={handleChange} id='cost' name='cost' defaultValue={Cost} className='rounded-lg p-2 border border-emerald-400 bg-transparent focus:ring-0 focus:outline-none focus:border-emerald-300 mr-2' required />
                        <div className='font-bold'>
                            <p>Cost(Rs)</p>
                            <p>{props.pwr.energy ? ((props.pwr.energy * Cost) / (3600 * 1000)).toFixed(3) : 0}</p>
                        </div>
                    </div>
                </div>
                <div className=' bg-emerald-400 bg-contain rounded-lg text-white p-2 font-bold'>Carbon Footprint : {props.pwr.energy ? (0.85 * (props.pwr.energy/(3600*1000))).toFixed(3) : 0} Kgs of Carbon</div>
            </div>
        </Suspense>
    )
}

export default Display_energy
