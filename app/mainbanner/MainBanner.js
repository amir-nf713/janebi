import React from 'react'

export default function MainBanner() {
  return (
    <div className="bg-img font-dorna p-8 flex items-center justify-around flex-col">
      <div className="h-52 flex flex-col justify-between items-start w-full">
        <h1 className=" bg-blue-900 font-extrabold max-tablet-l:h-16 max-tablet-l:w-64 max-tablet-l:text-3xl h-20 w-80 flex justify-center items-center rounded-full text-5xl max-mobile-xl:h-14 max-mobile-xl:w-56 max-mobile-xl:text-xl text-white">اسپید جانبی</h1>
        <h1 className=" text-5xl text-white font-bold max-mobile-xl:text-xl max-tablet-l:text-3xl">عرضه کننده متنوع ترین و به روز ترین لوازم جانبی و تجهیزات الکترونیک</h1>
      </div>
      <div className="items-start w-full flex flex-col">
        <p className="max-mobile-xl:text-lg max-tablet-l:text-2xl text-4xl text-white m-3">تضمین کیفیت</p>
        <p className="max-mobile-xl:text-lg max-tablet-l:text-2xl text-4xl text-white m-3">فروشگاه تخصصی گارد و لوازم جانبی موبایل</p>
        <p className="max-mobile-xl:text-lg max-tablet-l:text-2xl text-4xl text-white m-3">به روزترین و متنوع ترین کاور های تلفن همراه</p>
      </div>
    </div>
  )
}
