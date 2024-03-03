import { Loader2 } from 'lucide-react';
import React, { Suspense } from 'react'

const Display_energy = (props: any) => {
    console.log(props);
    return (
        <Suspense fallback={<Loader2 />}>
            <div className='text-base font-light font-mono'>
                <table className='border border-spacing-8 border-separate rounded-lg border-emerald-400 font-mono text-center'>
                    <tr>
                        <th>Device</th>
                        <th>Current</th>
                        <th>Voltage</th>
                        <th>Power</th>
                    </tr>
                    <tr>
                        <td>First</td>
                        {/* <td>{props.pwr.current ? props.pwr.current : 0}</td>
                        <td>{props.pwr.voltage ? props.pwr.voltage : 0}</td>
                        <td>{props.pwr.power ? props.pwr.power : 0}</td> */}
                        <td>1</td>
                        <td>2</td>
                        <td>3</td>
                    </tr>
                </table>
            </div>
        </Suspense>
    )
}

export default Display_energy