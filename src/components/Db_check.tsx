import { connectToDatabase } from '@/lib/mongodb'
import React from 'react'

const Db_check = async () => {
  const {db} = await connectToDatabase();
//   const res = db.collection('Major_Pro').find();
//   const ff = await res.toArray()
//   console.log(ff)
//   const res = db.collection("Major_Pro").watch([],{fullDocument : 'updateLookup'});

//   res.on("change",(e)=>{
//     // Core of the project
//     if(e.operationType === 'insert'){
//       console.log(e.fullDocument);
//     }
//   })
  return (
    <div>
      Aryan
    </div>
  )
}

export default Db_check
