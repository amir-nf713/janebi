import React from 'react'

export default function Tag() {
  return (
    <div className='max-desktop-xl:flex-col mt-16 w-full flex flex-wrap flex-row justify-around items-center'>
      <div className="flex flex-row max-desktop-xl:w-full max-desktop-xl:my-7 justify-around w-1/2">
      <div className="max-Wide-mobile-4xl:flex-wrap max-Wide-mobile-4xl:justify-center max-Wide-mobile-4xl::items-center  flex mx-3 flex-row">
        <div className="">
            <img className='max-tablet-xl:w-16 max-tablet-xl:h-16 h-24 w-24' src="/zemanat.png" alt="zemanat" />
        </div>
        <div className="mr-2 max-Wide-mobile-4xl:flex max-Wide-mobile-4xl:justify-center max-Wide-mobile-4xl:items-center max-Wide-mobile-4xl:flex-col">
            <h1 className="max-tablet-xl:text-2xl text-4xl font-dorna font-extrabold">ضمانت کالا</h1>
            <p className="text-center font-dorna max-tablet-xl:text-xl font-semibold text-2xl text-gray-900">ضمانت اصل بودن کالا</p>
        </div>
      </div>

      <div className="max-Wide-mobile-4xl:flex-wrap max-Wide-mobile-4xl:justify-center max-Wide-mobile-4xl::items-center  flex mx-3 flex-row justify-center items-center">
        <div className="">
            <img className='max-tablet-xl:w-16 max-tablet-xl:h-16 h-24 w-24' src="/poshtibani.png" alt="poshtibani" />
        </div>
        <div className="mr-2 max-Wide-mobile-4xl:flex max-Wide-mobile-4xl:justify-center max-Wide-mobile-4xl:items-center max-Wide-mobile-4xl:flex-col">
            <h1 className="max-tablet-xl:text-2xl text-4xl font-dorna font-extrabold">پشتیبانی</h1>
            <p className="text-center font-dorna max-tablet-xl:text-xl font-semibold text-2xl text-gray-900">پشتیبانی دائم و تمام وقت در روز های کاری</p>
        </div>
      </div>
</div>
<div className="flex flex-row max-desktop-xl:my-7 justify-around max-desktop-xl:w-full w-1/2">
      <div className="max-Wide-mobile-4xl:flex-wrap max-Wide-mobile-4xl:justify-center max-Wide-mobile-4xl::items-center  flex mx-3 flex-row justify-center items-center">
        <div className=" ">
            <img className='max-tablet-xl:w-16 max-tablet-xl:h-16 h-24 w-24' src="/margoyi.png" alt="margoyi" />
        </div>
        <div className="mr-2 max-Wide-mobile-4xl:flex max-Wide-mobile-4xl:justify-center max-Wide-mobile-4xl:items-center max-Wide-mobile-4xl:flex-col">
            <h1 className="max-tablet-xl:text-2xl text-4xl font-dorna font-extrabold">مرجویی</h1>
            <p className="text-center font-dorna max-tablet-xl:text-xl font-semibold text-2xl text-gray-900">تا 7 روز مرجویی کالا</p>
        </div>
      </div>

      <div className="max-Wide-mobile-4xl:flex-wrap max-Wide-mobile-4xl:justify-center max-Wide-mobile-4xl::items-center  flex mx-3 flex-row justify-center items-center">
        <div className="">
            <img className='max-tablet-xl:w-16 max-tablet-xl:h-16 h-24 w-24' src="/ersal.png" alt="ersal" />
        </div>
        <div className="mr-2 max-Wide-mobile-4xl:flex max-Wide-mobile-4xl:justify-center max-Wide-mobile-4xl:items-center max-Wide-mobile-4xl:flex-col">
            <h1 className="max-tablet-xl:text-2xl text-4xl font-dorna font-extrabold">ارسال سریع</h1>
            <p className="text-center font-dorna max-tablet-xl:text-xl font-semibold text-2xl text-gray-900">ارسال در سریع ترین حالت ممکن</p>
        </div>
      </div>
</div>
    </div>
  )
}
