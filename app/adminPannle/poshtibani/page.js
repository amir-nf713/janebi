"use client"
import apiKey from '@/app/API'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaTrashAlt } from "react-icons/fa";

export default function page() {
    const [stay, setStay] = useState([]);

    useEffect(() => {
        const fetchData = () => {
            axios.get(apiKey.getStayincall)
                .then(response => {
                    const newData = response.data.data;

                    // اگر داده جدید متفاوت از داده قبلی بود
                    if (JSON.stringify(newData) !== JSON.stringify(stay)) {
                        setStay(newData); // فقط داده جدید رو جایگزین کن
                    }
                })
                .catch(error => console.error("Error fetching data:"));
        };

        fetchData(); // یکبار در ابتدا اجرا بشه

        const interval = setInterval(fetchData, 10000); // هر ۱۰ ثانیه اجرا بشه

        return () => clearInterval(interval); // توقف interval در هنگام unmount
    }, [stay]); // وابستگی به `stay` برای بررسی تغییرات


    const Delete = (e) => {
           axios.delete(`${apiKey.getStayincall}/${e}`)
           .then(data => {
              window.location.reload()
           })
    }

    return (
        <div className='w-full font-dorna h-[100vh]  flex flex-col'>
            {
                stay.map((item, index) => {
                    return (
                        <div key={index} className="text-2xl font-extrabold bg-white flex flex-col justify-between my-3">
                            <div className="w-full text-sky-500 justify-between p-3 flex flex-row">
                                <h1 className="">{item.onvan}</h1>
                                <p className="">{item.number}</p>
                            </div>
                            <div className="w-full justify-between flex-wrap p-3 flex flex-row">
                                <p className="text-slate-500 w-11/12">{item.tozih}</p>
                                <button onClick={() => Delete(item.shenase)} className='cursor-pointer'><FaTrashAlt /></button>
                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
}
