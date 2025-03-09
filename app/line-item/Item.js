"use client"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react'
import { FaCartPlus } from "react-icons/fa";


export default function Items(props) {
  const router = useRouter()
  const gotoCategiri = (e) => {
    router.push(`/sellItem?id=${props.id}`)
  }
  return (
    <div onClick={gotoCategiri} className='ml-5 max-Wide-mobile-4xl:min-w-48 max-Wide-mobile-4xl:min-h-36 max-laptop-xl:min-w-64 max-laptop-xl:min-h-56  min-w-[423px]  min-h-[570px] bg-white flex flex-col justify-evenly font-dorna border-2 border-black'>
      <div className="border-b-2 border-black flex justify-center items-center max-Wide-mobile-4xl:max-h-64 max-Wide-mobile-4xl:min-h-64 max-h-[500px] min-h-64 flex-col">
        <img src={props.img} alt='img' className="w-[97%] h-[350px] max-Wide-mobile-4xl:h-40 max-laptop-xl:h-52"></img>
        <div className="w-full flex items-start flex-col mr-4 my-3">
            <p className="font-extrabold text-2xl text-slate-500 max-laptop-xl:text-xl max-Wide-mobile-l:text-sm ">{props.categori}</p> {/* categori */}
            <p className=" font-extrabold w-11/12 max-laptop-xl:text-xl max-Wide-mobile-4xl:text-sm text-2xl">{props.onvan}</p> {/* onvan */}
        </div>
      </div>
      <div className="flex max-Wide-mobile-4xl:min-h-16 max-Wide-mobile-4xl:max-h-16 flex-row-reverse justify-between items-center">
        <div className="">
            <div  className="text-5xl max-laptop-xl:text-3xl ml-5 max-Wide-mobile-l:active:text-3xl active:text-6xl transition-all max-Wide-mobile-l:text-2xl"><button><FaCartPlus /></button></div> {/* btn */}
        </div>
        <div className="mr-4">
    {props.off === 0 ? (
        <p className="text-2xl max-laptop-xl:text-xl font-black text-black">{props.money} تومان</p> // نمایش فقط قیمت اصلی
    ) : (
        <>
            <p className="text-2xl max-laptop-xl:text-xl font-black text-slate-500 line-through max-Wide-mobile-l:text-sm"> {props.money}</p> {/* قیمت اصلی که خط خورده */}
            <p className="text-4xl max-laptop-xl:text-2xl font-black max-Wide-mobile-l:text-sm"> {Math.floor((props.money / 100)* (100 - props.off) / 1000) * 1000} <span className='text-xl text-gray-700 max-Wide-mobile-l:text-sm'>تومان</span></p> {/* قیمت با تخفیف */}
        </>
    )}
</div>

      </div>
    </div>
  )
}
