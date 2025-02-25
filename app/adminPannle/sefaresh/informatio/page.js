'use client'
import React, { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation';
import apiKey from '@/app/API';
import axios from 'axios';

function BasketPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const [basket, setBasket] = useState(null); // مقدار اولیه null است

  useEffect(() => {
    if (id) {
      axios.get(`${apiKey.bascket}/${id}`)
        .then(response => {
          if (response.data.data) {
            setBasket(response.data.data); // دیگر نیازی به `[]` نیست
          }
        })
        .catch(error => console.error("Error fetching data:", error));
    }
  }, [id]);

  if (!basket) {
    return <div className="text-center text-xl font-semibold p-5">در حال بارگذاری...</div>;
  }

  return (
    <div className='w-full flex justify-center items-center h-[95vh] flex-col'>
      {[
        { label: "وضعیت", value: basket.vazeiat },
        { label: "اسم", value: basket.name },
        { label: "شهر", value: basket.shahr },
        { label: "استان", value: basket.ostan },
        { label: "شماره", value: basket.phoneNumber },
        { label: "آدرس", value: basket.address },
        { label: "کد پستی", value: basket.postCode },
        { label: "شناسه سفارش", value: basket.shenase },
        { label: "تاریخ", value: basket.date },
        { label: "آیدی کاربر", value: basket.userId },
        { label: "مبلغ سفارش", value: basket.money },
      ].map((item, index) => (
        <div key={index} className="bg-white my-1 flex flex-row items-center justify-between px-3 w-11/12 h-14">
          <div className="text-xl text-black font-semibold">{item.label}</div>
          <div className="text-lg text-sky-500 font-semibold">{item.value}</div>
        </div>
      ))}
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>در حال بارگذاری...</div>}>
      <BasketPage />
    </Suspense>
  );
}
