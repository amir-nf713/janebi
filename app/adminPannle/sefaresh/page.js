"use client"
import apiKey from '@/app/API'
import axios from 'axios'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { FaTrashAlt } from "react-icons/fa";

export default function page() {

    const [bascket, setbascket] = useState([]);

    useEffect(() => {
        const fetchData = () => {
            axios.get(apiKey.bascket)
                .then(response => {
                    const newData = response.data.data;

                    // مرتب‌سازی داده‌ها، ابتدا آیتم‌هایی که وضعیت "تمام شده" دارند
                    const sortedData = newData.sort((a, b) => {
                        if (a.vazeiat === 'تمام شده' && b.vazeiat !== 'تمام شده') return 1; // a بالا
                        if (a.vazeiat !== 'تمام شده' && b.vazeiat === 'تمام شده') return -1; // b بالا
                        return 0; // در غیر این صورت ترتیب تغییر نکند
                    });

                    setbascket(sortedData); // داده‌های مرتب‌شده رو ذخیره کن
                })
                .catch(error => console.error("Error fetching data:"));
        };

        fetchData(); // یکبار در ابتدا اجرا بشه

        const interval = setInterval(fetchData, 10000); // هر ۱۰ ثانیه اجرا بشه

        return () => clearInterval(interval); // توقف interval در هنگام unmount
    }, [bascket]); // وابستگی به `bascket` برای بررسی تغییرات

  return (
    <div className='w-full font-dorna h-[95vh] overflow-y-auto flex flex-col'>
      {
        bascket.map((item, index) => {
            return (
               <div key={index} className="text-2xl h-20 font-extrabold bg-white flex flex-row justify-around items-center my-3">
                  <div className="text-slate-400">{item.date}</div>
                  <div className="text-slate-400">{item.shenase}</div>
                  <div className="text-slate-400">{item.vazeiat}</div>
                  <Link href={`/adminPannle/sefaresh/informatio?id=${item._id}`} className="bg-sky-500 text-white rounded-xl w-40 h-14 flex justify-center items-center ">مشاهده</Link>
               </div>
            );
        })
      }
    </div>
  );
}
