import React from 'react'
// Without two lines below , the whole thing will break, DO NOT TOUCH THIS CODE. IF YOU TOUCHED THE CODE, I'LL HAUNT YOU. : )
import dynamic from 'next/dynamic'
const Graph_test = dynamic(()=> import('./Graph_test'),{ssr:false})
const Scatter_type = dynamic(()=> import('./Scatter_type'),{ssr:false})
// import Graph_test from './Graph_test'
const Grid_check = () => {
  return (
    <div className='grid grid-rows-2 grid-cols-3 min-h-screen max-h-screen'>
        <div className='col-start-1 flex justify-center items-center row-start-1 row-span-1 col-span-1 border-2 border-zinc-950 overflow-scroll scrollbar-hide rounded-3xl m-1'>
          <Graph_test/>
        </div>
        <div className='col-start-2 flex justify-center items-center row-start-1 row-span-1 col-span-1 border-2 border-zinc-950 overflow-scroll scrollbar-hide rounded-3xl m-1'>
          <Scatter_type/>
        </div>
        <div className='col-start-1 flex justify-center items-center row-start-2 row-span-1 col-span-1 border-2 border-zinc-950 overflow-scroll scrollbar-hide rounded-3xl m-1'>
          <Graph_test/>
        </div>
        <div className='col-start-2 flex justify-center items-center row-start-2 row-span-1 col-span-1 border-2 border-zinc-950 overflow-scroll scrollbar-hide rounded-3xl m-1'>
          <Graph_test/>
        </div>
        <div className='col-start-3 flex justify-center items-center row-start-1 row-span-2 col-span-1 border-2 border-zinc-950 overflow-scroll scrollbar-hide rounded-3xl m-1'>
          <Graph_test/>
        </div>
    </div>
  )
}

export default Grid_check
