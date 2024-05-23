'use client'
import { connectToDatabase } from "@/lib/mongodb"
import { useEffect, useState } from "react"
interface Unit {
    current : string,
    voltage : string,
    Time : string,
    power : string
    energy? : number
}
export default function Device({ params }: { params: { slug: string } }) {
    const [Arr, setArr] = useState([] as Unit[]);
    const [Pwr, setPwr] = useState({});
    useEffect(() => {
        async function get_data() {
            const docs = await fetch('/api/fetchall', {
                method: "POST",
                body: JSON.stringify(params.slug)
            });
            const doc = await docs.json();
            setArr(doc.arr.reverse());
        }
        get_data();
    }, [params.slug])
    useEffect(() => {
        const eventSource = new EventSource(`/api/watch/${params.slug}`);
        eventSource.onmessage = (event) => {
            const data: Unit = JSON.parse(event.data);
            // console.log(data);
            let soup: Unit[] = Arr.slice();
            soup.push({
                current: data.current,
                voltage: data.voltage,
                power: data.power,
                Time: data.Time,
            });
            setPwr({ current: data.current, voltage: data.voltage, power: data.power, energy: data.energy });
            setArr(soup.slice(-10));
        };
        return () => {
            eventSource.close();
        };
    }, [params.slug, Arr])
    

    return (
        <div>My Post: {params.slug}</div>
    )
}
