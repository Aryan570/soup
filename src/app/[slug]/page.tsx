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
        async function watching() {
            const { db } = await connectToDatabase();
            const res = db.collection(params.slug).watch([], { fullDocument: 'updateLookup' });
            res.on("change", (e: any) => {
                console.log(typeof e);
                if (e.operationType === 'insert') {
                    let data : Unit = e.fullDocument;
                    let soup: Unit[] = Arr.slice();
                    soup.push({ current: data.current, voltage: data.voltage, power: data.power, Time: data.Time });
                    setPwr({ current: data.current, voltage: data.voltage, power: data.power, energy: data.energy });
                    setArr(soup.slice(-10));
                }
            })
        }
        watching();
    }, [params.slug, Arr])
    

    return (
        <div>My Post: {params.slug}</div>
    )
}
