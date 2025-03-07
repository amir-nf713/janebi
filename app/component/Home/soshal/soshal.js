"use client"
import apiKey from '@/app/API';
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FaTelegram } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io";


export default function Soshal() {

    const [Basket, setBasket] = useState([]);

    useEffect(() => {
      
        axios.get(apiKey.Web) // اضافه کردن `/` برای درستی URL
          .then(response => {
            if (response.data.data) {
              setBasket([response.data.data]); // تبدیل شیء به آرایه برای جلوگیری از خطا
            }
          })
          .catch(error => console.error("Error fetching data:"));
      
    }, []); // وابستگی به `id`
  return (
    <div className='w-full'>
        {
            Basket.map((item, index) => {
             return(
                <div key={index} className="text-5xl flex max-mobile-l:text-3xl justify-center items-center w-full h-24 bg-sky-800">
                  <Link className='mx-6 text-white ' href={`${item.instagram}`}>
                     <img src="ico/67c7195642931.png" className='size-20 max-Wide-mobile-s:size-16 max-mobile-l:size-12 ' alt="img" />
                  </Link>

                  <Link className='mx-6 text-white ' href={`${item.telegram}`}>
                      <img src="ico/67c719811ab3e.png" className='size-20 max-Wide-mobile-s:size-16 max-mobile-l:size-12 ' alt="img" />
                  </Link>

                  <Link className='mx-6 text-white ' href={`${item.wahtsapp}`}>
                      <img src="ico/67c719c6f2533.png" className='size-20 max-Wide-mobile-s:size-16 max-mobile-l:size-12 ' alt="img" />
                  </Link>
                </div>
             )
            })
        }
      
    </div>
  )
}
