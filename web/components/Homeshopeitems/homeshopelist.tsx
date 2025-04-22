"use client"
import { useEffect, useState } from 'react';
import Datas from '@/app/schema/data';
import Link from 'next/link';
import ShopCardItem from '../Shope/shopeitem';
const page=1
const per_page=5
const url=process.env.NEXT_PUBLIC_API_URL
export default function HomeShopeItemlist (){
  const [data,setData]=useState<Datas[]>([])
  useEffect(()=>{
    async function fetchdata(){
      try{
        const response= await fetch(`${url}/api/products/${per_page}/${page}`)
        const fetchedata=await response.json()
        setData(fetchedata)
      }
      catch(error){
        console.error("error fetched data",error)
      }

    }
    fetchdata()
  },[])
  console.log(data);

  return(
    <main>
      <div className='p-8'>
  {/* Header with "All" link */}
  <div className='flex justify-between items-center mb-6'>
    <h2 className='text-xl font-semibold'>Featured Products</h2>
    <Link href={'/shop'} className='text-indigo-600 hover:text-indigo-800 font-medium'>
      View All
    </Link>
  </div>
  
  {/* Horizontal scrollable container */}
  <div className='overflow-x-auto pb-4 scrollbar-hide'>
    <div className='flex gap-4 min-w-min'>
      {data.map((item) => (
        <div 
          key={item._id} 
          className='flex-none w-32 sm:w-64 mx-6'
        >
          <ShopCardItem value={item} />
        </div>
      ))}
    </div>
  </div>
</div>
    </main>
  )

}

