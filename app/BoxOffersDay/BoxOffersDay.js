import React from 'react'
import { FaCartPlus } from "react-icons/fa";

export default function BoxOffersDay(props) {
  return (
    <div className='w-[423px] h-[570px] max-Wide-mobile-s:w-72 max-Wide-mobile-s:h-96 bg-white flex flex-col justify-evenly font-dorna border-2 border-black max-laptop-xl:mb-9'>
      <div className="border-b-2 border-black flex justify-center items-center flex-col">
        <img src={props.img} alt='img' className="w-[97%] h-[350px] max-Wide-mobile-s:h-56"></img>
        <div className="w-full flex items-start flex-col mr-4 my-3">
            <p className="font-extrabold text-2xl text-slate-500 max-Wide-mobile-s:text-lg">{props.categori}</p> {/* categori */}
            <p className=" font-extrabold text-3xl max-Wide-mobile-s:text-xl">{props.onvan}</p> {/* onvan */}
        </div>
      </div>
      <div className="flex flex-row-reverse justify-between items-center">
        <div className="">
            <button className="text-5xl ml-5 active:text-6xl transition-all max-Wide-mobile-s:text-3xl"><FaCartPlus /></button> {/* btn */}
        </div>
        <div className="mr-4">
            <p className="text-2xl font-black text-slate-500 line-through max-Wide-mobile-s:text-xl"> {props.money}</p> {/* offer */}
            <p className="text-4xl font-black max-Wide-mobile-s:text-2xl"> {(props.money / 100)* (100 - props.off)} <span className='text-xl text-gray-700'>تومان</span></p> {/* real money */}
            
        </div>
      </div>
    </div>
  )
}
