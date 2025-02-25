'use client'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation';
import apiKey from '@/app/API';
import axios from 'axios';

export default function page() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  
  const [Basket, setBasket] = useState([]);

  useEffect(() => {
    if (id) {
      axios.get(`${apiKey.bascket}/${id}`) // اضافه کردن `/` برای درستی URL
        .then(response => {
          if (response.data.data) {
            setBasket([response.data.data]); // تبدیل شیء به آرایه برای جلوگیری از خطا
          }
        })
        .catch(error => console.error("Error fetching data:"));
    }
  }, [id]); // وابستگی به `id`

  return (
    <div className='w-full flex justify-center items-center h-[95vh]'>
      {
        Basket.length > 0 ? Basket.map((item, index) => (
          <div key={index} className="w-full flex justify-center items-center flex-col">
            <div className="bg-white my-1 flex flex-row items-center justify-between px-3 w-11/12 h-14">
              <div className="text-xl text-black font-semibold">وضعیت</div>
              <div className="text-lg text-sky-500 font-semibold">{item.vazeiat}</div>
            </div>

            <div className="bg-white my-1 flex flex-row items-center justify-between px-3 w-11/12 h-14">
              <div className="text-xl text-black font-semibold">اسم</div>
              <div className="text-lg text-sky-500 font-semibold">{item.name}</div>
            </div>

            <div className="bg-white my-1 flex flex-row items-center justify-between px-3 w-11/12 h-14">
              <div className="text-xl text-black font-semibold">شهر</div>
              <div className="text-lg text-sky-500 font-semibold">{item.shahr}</div>
            </div>

            <div className="bg-white my-1 flex flex-row items-center justify-between px-3 w-11/12 h-14">
              <div className="text-xl text-black font-semibold">استان</div>
              <div className="text-lg text-sky-500 font-semibold">{item.ostan}</div>
            </div>

            <div className="bg-white my-1 flex flex-row items-center justify-between px-3 w-11/12 h-14">
              <div className="text-xl text-black font-semibold">شماره</div>
              <div className="text-lg text-sky-500 font-semibold">{item.phoneNumber}</div>
            </div>

            <div className="bg-white my-1 flex flex-row items-center justify-between px-3 w-11/12 h-14">
              <div className="text-xl text-black font-semibold">آدرس</div>
              <div className="text-lg text-sky-500 font-semibold">{item.address}</div>
            </div>

            <div className="bg-white my-1 flex flex-row items-center justify-between px-3 w-11/12 h-14">
              <div className="text-xl text-black font-semibold">کد پستی</div>
              <div className="text-lg text-sky-500 font-semibold">{item.postCode}</div>
            </div>

            <div className="bg-white my-1 flex flex-row items-center justify-between px-3 w-11/12 h-14">
              <div className="text-xl text-black font-semibold">شناسه سفارش</div>
              <div className="text-lg text-sky-500 font-semibold">{item.shenase}</div>
            </div>

            <div className="bg-white my-1 flex flex-row items-center justify-between px-3 w-11/12 h-14">
              <div className="text-xl text-black font-semibold">تاریخ</div>
              <div className="text-lg text-sky-500 font-semibold">{item.date}</div>
            </div>

            <div className="bg-white my-1 flex flex-row items-center justify-between px-3 w-11/12 h-14">
              <div className="text-xl text-black font-semibold">آیدی کاربر</div>
              <div className="text-lg text-sky-500 font-semibold">{item.userId}</div>
            </div>

            <div className="bg-white my-1 flex flex-row items-center justify-between px-3 w-11/12 h-14">
              <div className="text-xl text-black font-semibold">مبلغ سفارش</div>
              <div className="text-lg text-sky-500 font-semibold">{item.money}</div>
            </div>
               


          </div>
        )) : <div className="text-center text-xl font-semibold p-5">در حال بارگذاری...</div>
      }         
    </div>
  );
}
