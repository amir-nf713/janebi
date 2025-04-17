"use client"
import apiKey from '@/app/API'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { FaTrashArrowUp } from "react-icons/fa6";
import { GrClose } from "react-icons/gr";


export default function Page() {
  const id = useSearchParams()
  const userId = id.get("id")  // گرفتن مقدار پارامتر id از URL

  const [data, setData] = useState([]);  
  const [filteredData, setFilteredData] = useState([]);  // داده‌های فیلتر شده
  const [serchinp, setSerchinp] = useState("");  
  const [close, setclose] = useState("hidden");  
  const [num, setnum] = useState("hidden");  
  const [moneinp, setmoneinp] = useState();  

  const searChang = (e) => {
    setmoneinp(Number(e.target.value));  // تغییر مقدار ورودی جستجو
  }

  const dd = (e) => {
    setmoneinp(e.target.value);  // تغییر مقدار ورودی جستجو
  }

  // بارگذاری داده‌ها از API (فقط یکبار)
  useEffect(() => {
    axios.get(apiKey.user)
      .then((response) => {
        setData(response.data.data);  // ذخیره داده‌ها
        setFilteredData(response.data.data);  // در ابتدا داده‌ها را بدون فیلتر ذخیره می‌کنیم
      })
      .catch((error) => {
        console.error("Error fetching data:");  // مدیریت خطا
      });
  }, []);  // این اثر فقط یکبار در ابتدای بارگذاری کامپوننت اجرا می‌شود

  // فیلتر کردن داده‌ها بر اساس مقدار جستجو
  useEffect(() => {
    if (serchinp === "") {
      setFilteredData(data);  // اگر ورودی جستجو خالی است، تمام داده‌ها را نمایش می‌دهیم
    } else {
      const filtered = data.filter(item =>
        item.phoneNumber.includes(serchinp)  // فیلتر کردن داده‌ها بر اساس phoneNumber
      );
      setFilteredData(filtered);  // ذخیره داده‌های فیلتر شده
    }
  }, [serchinp, data]);  // فیلتر کردن داده‌ها زمانی که serchinp یا data تغییر کنند

  // حذف یوزر از سرور و به‌روزرسانی داده‌ها
  const dleteUser = (phoneNumber) => {
    axios.delete(`${apiKey.user}/${phoneNumber}`)
      .then((response) => {
        // حذف یوزر از داده‌ها پس از موفقیت آمیز بودن حذف
        const updatedData = filteredData.filter(user => user.phoneNumber !== phoneNumber);
        setFilteredData(updatedData);  // به‌روزرسانی داده‌های فیلتر شده
        setData(updatedData);  // به‌روزرسانی داده‌های اصلی
      })
      .catch((error) => {
        console.error("Error deleting user:");
      });
  }

  const editUser = (e) => {
      // addCash
    
      
        axios.post(`${apiKey.user}/addCash`,{
         phoneNumber: num,
         cash: Number(moneinp)     
      })
      .then((data) => {ff()})
      .catch((err) => {})
      

  }


  const ff = (e) => {
      if (close === "hidden") {
        setclose("flex")
        setnum(e)
      }else{
        setclose("hidden")
      }


  }

  return (
    <div className='w-full flex flex-col items-center'>
      <input
        value={serchinp}
        placeholder='شماره وارد کنید...'
        onChange={searChang}
        type="text"
        className="h-12 w-11/12 bg-gray-300 rounded-full pr-5 mt-7"
      />
      <div className="flex  flex-row gap-3 justify-center flex-wrap">
         {
           filteredData.map((users, index) => (
             <div key={index} className="mt-3 pt-3 text-sky-700 bg-white border-2 w-60 flex-col drop-shadow-xl flex items-center justify-center">
               <div className="">شماره: {users.phoneNumber}</div>
               <div className="">پول: {users.cash}</div>
               <div className="">کد دعوت: {users.codeDavat}</div>
               <div className="flex my-5 flex-row justify-evenly items-center w-full">
                 <button 
                   onClick={() => dleteUser(users.phoneNumber)}  // حذف یوزر با استفاده از شماره تلفن
                   className=" text-red-600 text-2xl h-9 w-10 flex justify-center items-center">
                   <FaTrashArrowUp />
                 </button>
                 <button onClick={() => ff(users.phoneNumber)} className="bg-slate-100 text-gray-600 px-10 py-3 rounded-full text-xl font-bold h-9 w-10 flex justify-center items-center">
                   Money
                 </button>
               </div>

               {/* ------------ */}

               
             </div>
           ))
         }

               <div className={`top-0 left-0 ${close} justify-center items-center absolute h-[100vh] w-full z-40 bg-black/40`} >
                 <div className="bg-gray-600 py-4 flex-col gap-4 w-72 flex justify-center items-center">
                     <div onClick={ff} className="cursor-pointer text-2xl text-white"><GrClose /></div>
                    <input onChange={dd} value={moneinp} type="number" placeholder='مقدار پول را وارد کنید...' className="bg-slate-200 pr-3 h-10 w-11/12 rounded-full" />
                    <button onClick={editUser} className='w-11/12 h-10 bg-slate-800 text-white rounded-full mb-5'>تایید</button>
                 </div>
               </div>
      </div>
    </div>
  );
}
