"use client"
import React, { useEffect, useState } from 'react'
import Link from "next/link";
import axios from 'axios';
import apiKey from '../API';


export default function AdminPannle() {
 
  

  const [key, setkey] = useState("hidden")
  const [ke, setke] = useState("flex")
  const [keye, setkeye] = useState("")

useEffect(() => {
  axios.post(`${apiKey.getOneAdmin}${keye}`)
  .then(data => {
    console.log(data.data.data);
    
    if (data.data.data === "ok") {
      setkey("flex")
      setke("hidden")
    }
  })
}, [keye])


  const keych = (e) => {
    setkeye(e.target.value)
  }

  // /api/webdata/add/web/data/in/data/base/
  const ff = ()=>{
    axios.get("https://janebi-speed.ir/api/webdata/add/web/data/in/data/base/")
    .then(data => alert("دیتا اضافه شد دیگر کلیک نکنید"))
  }
        
  return (
    <div className="">
      <div className={`w-full ${ke} justify-center items-center bg-sky-500 h-[20vh]`}>
         <input className='h-16 px-5 rounded-full w-11/12' value={keye} onChange={keych} placeholder='ورود رمز' type="text" />
      </div>
      <div className={`w-full ${key} h-[100vh] justify-around items-center flex-wrap`}>
         <Link className='font-dorna font-semibold text-white text-4xl active:bg-sk m-6 transition-all hover:shadow-2xl rounded-3xl bg-sky-600 h-48 w-[402px] flex justify-center items-center' href="/adminPannle/item">محصولات</Link>      
         <Link className='font-dorna font-semibold text-white text-4xl active:bg-sk m-6 transition-all hover:shadow-2xl rounded-3xl bg-sky-600 h-48 w-[402px] flex justify-center items-center' href="/adminPannle/poshtibani">پشتیبانی</Link>      
         <Link className='font-dorna font-semibold text-white text-4xl active:bg-sk m-6 transition-all hover:shadow-2xl rounded-3xl bg-sky-600 h-48 w-[402px] flex justify-center items-center' href="/adminPannle/sefaresh">سفارش ها</Link>      
         <Link className='font-dorna font-semibold text-white text-4xl active:bg-sk m-6 transition-all hover:shadow-2xl rounded-3xl bg-sky-600 h-48 w-[402px] flex justify-center items-center' href="/adminPannle/WebInformation">محتوای سایت</Link>      
         <Link className='font-dorna font-semibold text-white text-4xl active:bg-sk m-6 transition-all hover:shadow-2xl rounded-3xl bg-sky-600 h-48 w-[402px] flex justify-center items-center' href="/adminPannle/code">کد تخفیف و هدیه</Link>      
         <Link className='font-dorna font-semibold text-white text-4xl active:bg-sk m-6 transition-all hover:shadow-2xl rounded-3xl bg-sky-600 h-48 w-[402px] flex justify-center items-center' href="/adminPannle/user?id=">مشتریان</Link>   
         <button onClick={ff} className='font-dorna font-semibold text-white text-4xl active:bg-sk m-6 transition-all hover:shadow-2xl rounded-3xl bg-sky-600 h-48 w-[402px] flex justify-center items-center' >add data</button>   
      </div>
    </div>
  )
}
