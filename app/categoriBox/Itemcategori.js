'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function Itemcategori(props) {
  const router = useRouter()
  const toShop = (e) => {
    router.push( `/sellItem?id=${props.id}`)
  }
  return (
    <div onClick={toShop} className='flex object-cover flex-col max-Wide-mobile-4xl:min-w-32 max-Wide-mobile-4xl:min-h-40 font-dorna font-bold bg-white min-h-72 min-w-60 rounded-2xl justify-center items-center max-Wide-mobile-4xl:mx-1 mx-4 cursor-pointer'>
      <img className='h-[80%] w-[99%] object-cover' src={props.img} alt="img" />
      <p className="text-xl text-black text-center max-Wide-mobile-4xl:text-sm my-3 mx-2">{props.title}</p>
    </div>
  )
}
