import React from 'react'
import Link from "next/link";

export default function AdminPannle() {
  return (
    <div className='w-full h-[100vh] flex justify-around items-center flex-wrap'>
         <Link className='font-dorna font-semibold text-white text-4xl active:bg-sk m-6 transition-all hover:shadow-2xl rounded-3xl bg-sky-600 h-48 w-[402px] flex justify-center items-center' href="/adminPannle/item">محصولات</Link>      
         <Link className='font-dorna font-semibold text-white text-4xl active:bg-sk m-6 transition-all hover:shadow-2xl rounded-3xl bg-sky-600 h-48 w-[402px] flex justify-center items-center' href="/adminPannle/poshtibani">پشتیبانی</Link>      
         <Link className='font-dorna font-semibold text-white text-4xl active:bg-sk m-6 transition-all hover:shadow-2xl rounded-3xl bg-sky-600 h-48 w-[402px] flex justify-center items-center' href="/adminPannle/sefaresh">سفارش ها</Link>      
         <Link className='font-dorna font-semibold text-white text-4xl active:bg-sk m-6 transition-all hover:shadow-2xl rounded-3xl bg-sky-600 h-48 w-[402px] flex justify-center items-center' href="/adminPannle/WebInformation">محتوای سایت</Link>      
         <Link className='font-dorna font-semibold text-white text-4xl active:bg-sk m-6 transition-all hover:shadow-2xl rounded-3xl bg-sky-600 h-48 w-[402px] flex justify-center items-center' href="/adminPannle/code">کد تخفیف و هدیه</Link>      
         <Link className='font-dorna font-semibold text-white text-4xl active:bg-sk m-6 transition-all hover:shadow-2xl rounded-3xl bg-sky-600 h-48 w-[402px] flex justify-center items-center' href="/adminPannle/user">مشتریان</Link>   
    </div>
  )
}
