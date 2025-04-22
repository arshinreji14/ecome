
"use client"
import ShopCardItem from '../Shope/shopeitem';
import { useEffect, useState } from 'react';

import Link from 'next/link';
import Catagory from './catagory';
const page=1
const per_page=20
interface Catagory{
  id:number,
  image: string,
  title: string,
}
export default function CatagoryList (){
  const [data,setData]=useState<Catagory[]>([])
  useEffect(()=>{
    async function fetchdata(){
      try{
        const response= await fetch(`http://localhost:3000/api`)
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
      <div className='grid grid-cols-4 sm:grid-cols-4  md:grid-cols-3 xl:grid-cols-4 gap-4  mt-10 mx-10'>
    {data.map((item)=>(
<div key={item.id}>

  <Catagory value={item}/>

    </div>
      ))
    }
</div>
    </main>
  )

}



