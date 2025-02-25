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
                <div key={index} className="text-5xl flex max-mobile-l:text-3xl justify-center items-center w-full h-20 bg-sky-600">
                  <Link className='mx-6 text-white' href={`${item.instagram}`}><FaSquareInstagram /></Link>
                  <Link className='mx-6 text-white' href={`${item.telegram}`}><FaTelegram /></Link>
                  <Link className='mx-6 text-white' href={`${item.wahtsapp}`}><IoLogoWhatsapp /></Link>
                </div>
             )
            })
        }
      
    </div>
  )
}
