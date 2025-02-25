import React from 'react'


export default function OfferDay(props) {



  return (
    <div className='flex flex-row items-center justify-center flex-wrap bg-blue-800 w-[96%] rounded-tr-[200px] max-desktop-l:rounded-tr-xl rounded-br-xl rounded-l-2xl border-8 border-black font-dorna mb-8'>
      <div className="flex flex-col max-laptop-l:flex-col items-center max-desktop-l:flex-row justify-evenly max-offer-wrap:mb-0 max-offer-wrap:mr-0 max-offer-wrap:w-full max-offer-wrap:items-center max-Wide-mobile-s:ml-0 mt-3 mr-24">
        <div className="text-5xl max-Wide-mobile-s:text-3xl text-cyan-950 font-extrabold">OFFER'S DAY</div>
        <div className="items-end flex flex-row-reverse ">
          <div className="flex flex-col items-center justify-center">
            <div className="text-white font-bold text-2xl">روز</div>
            <p className="text-2xl flex justify-center items-center bg-white size-14">{props.d}</p>
          </div>
          <p className="text-6xl font-black text-blue-950 mb-1 mx-2">:</p>
          <div className="flex flex-col items-center justify-center">
            <div className="text-white font-bold text-2xl">ساعت</div>
            <p className="text-2xl flex justify-center items-center bg-white size-14">{props.h}</p>
          </div>
          <p className="text-6xl font-black text-blue-950 mb-1 mx-2">:</p>
          <div className="flex flex-col items-center justify-center">
            <div className="text-white font-bold text-2xl">دقیقه</div>
            <p className="text-2xl flex justify-center items-center bg-white size-14">{props.m}</p>
          </div>
          <p className="text-6xl font-black text-blue-950 mb-1 mx-2">:</p>
          <div className="flex flex-col items-center justify-center">
            <div className="text-white font-bold text-2xl">ثانیه</div>
            <p className="text-2xl flex justify-center items-center bg-white size-14">{props.s}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-evenly w-[1370px] max-offer-wrap:w-full my-4">
            {props.item}
      </div>
    </div>
  )
}
