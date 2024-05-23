'use client'
import { connectToDatabase } from "@/lib/mongodb"
import { useEffect } from "react"

export default function Device({ params }: { params: { slug: string } }) {
    useEffect(() => {
        async function watching() {
            const {db} = await connectToDatabase();
            const res = db.collection(params.slug).watch([], { fullDocument: 'updateLookup' });
            res.on("change", (e : any) => {
                console.log(typeof e);
                if (e.operationType === 'insert') {
                  // console.log(e.fullDocument);
                  // socket.emit('new_data', { current, voltage ,power ,Time});
                  // console.log(fkk)
                  // fkk.push({e.fullDocument.current,e.fullDocument.voltage});
                }
              })
        }
        watching();
    //   return () => {
    //   }
    }, [params.slug])
    
    return <div>My Post: {params.slug}</div>
  }
  