'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function Itemcategori(props) {
  const router = useRouter()
  const toShop = (e) => {
    router.push( `/sellItem?id=${props.id}`)
  }
  return (
    <div
  onClick={toShop}
  className="flex flex-col w-60 h-80 bg-white rounded-2xl justify-between items-center mx-4 cursor-pointer max-Wide-mobile-4xl:w-36 max-Wide-mobile-4xl:h-48"
>
  <img
    className="w-11/12 h-4/5 rounded-2xl object-cover mt-2"
    src={props.img}
    alt="img"
  />
  <p className="text-xl text-black text-center max-Wide-mobile-4xl:text-xs my-2 px-2 font-dorna font-bold">
    {props.title}
  </p>
</div>

  )
}
