"use client"
import { Loader2 } from 'lucide-react';
import React, { Suspense } from 'react'
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Tooltip, Label } from 'recharts';

// const data = [
//     { name: 'Group A', value: 400 },
//     { name: 'Group B', value: 300 },
//     { name: 'Group C', value: 300 },
//     { name: 'Group D', value: 200 },
// ];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const RADIAN = Math.PI / 180;

const Pie_type = ({data ,devices, bulb} : {data : {name : string,energy : number}[] ,devices : string[], bulb : number}) => {
    // const session = await getServerSession(authOptions);
    // const [check, setcheck] = useState(false);
    // data.push({name : "bulb", energy : bulb});
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
    let k : any[] = [];
    if(bulb !== 0){
        k = data.filter((d)=>{
            d.name !== "bulb"
        });
        console.log(k);
        k.push({name : "bulb", energy : bulb});
        console.log(data);
    }
    k.push({name : "lamp", energy : 1000});
    console.log("this one",data);
    return (
        <Suspense fallback={<Loader2 />}>
            <div className='text-xs font-mono w-60 h-60'>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart width={400} height={400}>
                        <Pie
                            data={k}
                            cx={100}
                            cy={100}
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="energy"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Label/>
                        <Tooltip/>
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </Suspense >
    )
}

export default Pie_type
