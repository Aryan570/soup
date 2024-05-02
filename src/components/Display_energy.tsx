"use client"
import { Loader2 } from 'lucide-react';
import React, { BaseSyntheticEvent, Suspense, useEffect, useState } from 'react'

const Display_energy = (props: any) => {
    const [Cost, setCost] = useState(10);
    const [Budget,setBudget] = useState(10);
    const [msg,setMsg] = useState(false);
    function handleChange(e: BaseSyntheticEvent) {
        setCost(e.target.value)
    }
    function handleBudget(e : BaseSyntheticEvent){
        setBudget(e.target.value)
    }
    let check = props.pwr.enery ? props.pwr.energy : 0;
    // useEffect(() => {
    //   const timer = setTimeout(() => {
    //     setMsg(true);
    //   }, 10000);
    //   return () => {
    //     clearTimeout(timer);
    //   }
    // }, [])
    if((((check*Cost)/(3600 *1000 *Budget))*100 >= 100)){
            fetch('/api/send-mail', {
            method: 'POST',
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
            
          }).then((res) => {
            console.log('Response received',res)
            if (res.status === 250) {
              console.log('Response succeeded!')
              
            }
          })
          setMsg(false);
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
                    <p className='pl-1 font-bold text-xs'>Cost of 1 unit</p>
                    <div className='flex items-center'>
                        <input type='number' onChange={handleChange} id='cost' name='cost' defaultValue={Cost} className='rounded-lg p-2 border border-emerald-400 bg-transparent focus:ring-0 focus:outline-none focus:border-emerald-300 mr-2' required />
                        <div className='font-bold text-xs'>
                            <p>Cost(Rs)</p>
                            <p>{props.pwr.energy ? ((props.pwr.energy * Cost) / (3600 * 1000)).toFixed(3) : 0}</p>
                        </div>
                    </div>
                </div>
                <div>
                    <p className='pl-1 text-xs font-bold'>Enter Budget (Rs)</p>
                    <div>
                        <input type='number' defaultValue={Budget} onChange={handleBudget} min={10} id='budget' name='budget' className='rounded-lg p-2 border border-emerald-400 bg-transparent focus:ring-0 focus:outline-none focus:border-emerald-300 mr-2' required/>
                    </div>
                </div>
                <div className=' bg-emerald-400 bg-contain rounded-lg text-white p-2 font-bold'>Carbon Footprint : {props.pwr.energy ? (0.85 * (props.pwr.energy/(3600*1000))).toFixed(3) : 0} Kgs of Carbon</div>
                {/* <div className=' font-bold flex items-center border p-2 w-fit border-emerald-400 rounded-lg'>
                    Condition : 
                    <div className={`w-4 h-4 ${parseInt(props.pwr.current) > 240 ? 'bg-red-400' : 'bg-emerald-400'} mx-2 rounded-lg`} color='red'></div>
                </div>
                <div className=' font-bold flex items-center border p-2 w-fit border-emerald-400 rounded-lg'>
                    Condition : 
                    <div className={`w-4 h-4 ${parseInt(props.pwr.current) > 240 ? 'bg-red-400' : 'bg-emerald-400'} mx-2 rounded-lg`} color='red'></div>
                </div>
                <div className=' font-bold flex items-center border p-2 w-fit border-emerald-400 rounded-lg'>
                    Condition : 
                    <div className={`w-4 h-4 ${parseInt(props.pwr.current) > 240 ? 'bg-red-400' : 'bg-emerald-400'} mx-2 rounded-lg`} color='red'></div>
                </div> */}
                <div className='font-bold pl-1 text-xs'>Alerts</div>
                <table className='border border-spacing-4 border-separate rounded-lg border-emerald-400 font-mono text-center'>
                    <tr className='text-xs'>
                        <th>Voltage</th>
                        <th>Current</th>
                        <th>Budget</th>
                    </tr>
                    <tr>
                        <td>{parseInt(props.pwr.voltage) > 240 || parseInt(props.pwr.voltage) <150 ? props.pwr.volatge > 240 ? <div className='text-rose-500 p-1 rounded-lg text-xs font-bold'>High</div> : <div className='text-rose-500 p-1 rounded-lg text-xs font-bold'>Low</div> : <div className='p-1 rounded-lg text-emerald-400 text-xs font-bold'>Normal</div>}</td>
                        <td>{parseInt(props.pwr.current) > 5 ? <div className='text-rose-500 p-1 rounded-lg text-xs font-bold'>Abnormal</div> : <div className=' p-1 rounded-lg text-emerald-400 text-xs font-bold'>Normal</div>}</td>
                        <td>{((check*Cost)/(3600 *1000 *Budget))*100 > 80 ? <div className='text-xs p-1 rounded-lg font-bold text-rose-500'>{props.pwr.energy ? (((((props.pwr.energy * Cost) / (3600 * 1000* Budget))))*100).toFixed(3) : 0}%</div> : <div className='text-xs p-1 rounded-lg font-bold text-emerald-400'>{props.pwr.energy ? (((((props.pwr.energy * Cost) / (3600 * 1000 * Budget))))*100).toFixed(3) : 0}%</div>}</td>
                    </tr>
                </table>
                {((check*Cost)/(3600 *1000 *Budget))*100 > 80 && ((check*Cost)/(3600 *1000 *Budget))*100 <100 ? <div className='text-xs rounded-lg text-amber-400 font-bold'>About to react the Budget limit</div> : <div></div>}
                {((check*Cost)/(3600 *1000 *Budget))*100 >= 100? <div className='text-xs rounded-lg text-rose-500 font-bold'>Budget limit has been crossed!</div> : <div></div>}
            </div>
        </Suspense>
    )
}

export default Display_energy
