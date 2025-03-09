import "../../../globals.css";
import React, { useEffect, useState } from "react";
import { BsCartFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa6";
import { IoHome } from "react-icons/io5";
import { AiFillDatabase } from "react-icons/ai";
import { AiFillMessage } from "react-icons/ai";
import { AiFillAlert } from "react-icons/ai";
import { BsTextIndentRight } from "react-icons/bs";
import { FaInstagram } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io5";
import { RiTelegramLine } from "react-icons/ri";
import Link from "next/link";
import axios from "axios";
import apiKey from "@/app/API";


export default function Footer() {
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
    <footer className="h-[760px] bg-[#d2d2d2] flex pb-4 flex-col">
    <div className="flex h-1/2 max-tablet-l:flex-wrap max-tablet-l:justify-center items-center flex-row border-b-4 border-slate-900 justify-between">
      <div className="flex mr-28 max-tablet-l:mr-0 max-laptop-xl:mr-8 h-1/2 flex-row-reverse justify-between font-dorna max-Wide-mobile-l:w-[350px] max-laptop-xl:w-[400px] w-[600px]">
        <div className="flex items-start flex-col h-[80%]">
          <h1 className="max-mobile-l:text-base max-Wide-mobile-l:text-xl max-laptop-xl:text-2xl text-3xl font-dorna font-semibold">
            دسترسی سریع
          </h1>
          <Link
            href="/login"
            className="max-mobile-l:text-xs max-Wide-mobile-l:text-lg max-laptop-xl:text-xl mt-3 text-2xl font-normal cursor-pointer"
          >
            حساب کاربری
          </Link>
          <Link
            href="/login"
            className="max-mobile-l:text-xs max-Wide-mobile-l:text-lg max-laptop-xl:text-xl mt-3 text-2xl font-normal cursor-pointer"
          >
            ورود به حساب
          </Link>
          <Link
            href="singup"
            className="max-mobile-l:text-xs max-Wide-mobile-l:text-lg max-laptop-xl:text-xl mt-3 text-2xl font-normal cursor-pointer"
          >
            ثبت نام
          </Link>
          
          <Link
            href="/aboutMe"
            className="max-mobile-l:text-xs max-Wide-mobile-l:text-lg max-laptop-xl:text-xl mt-3 text-2xl font-normal cursor-pointer"
          >
            درباره ما
          </Link>
        </div>
        <div className="flex items-start flex-col h-[80%]">
          <h1 className="max-mobile-l:text-base max-Wide-mobile-l:text-xl max-laptop-xl:text-2xl text-3xl font-dorna font-semibold">
            خدمات مشتریان
          </h1>
          <Link
            href="/fo/faq"
            className="max-mobile-l:text-xs max-Wide-mobile-l:text-lg max-laptop-xl:text-xl mt-3 text-2xl font-normal cursor-pointer"
          >
            سوالات شما
          </Link>
          <Link
            href="/fo/marjoee"
            className="max-mobile-l:text-xs max-Wide-mobile-l:text-lg max-laptop-xl:text-xl mt-3 text-2xl font-normal cursor-pointer"
          >
            رویه بازگردانی کالا
          </Link>
          <Link
            href="/traking"
            className="max-mobile-l:text-xs max-Wide-mobile-l:text-lg max-laptop-xl:text-xl mt-3 text-2xl font-normal cursor-pointer"
          >
            پیگیری سفارش
          </Link>
        </div>
        <div className="flex items-start flex-col h-[80%]">
          <h1 className="max-mobile-l:text-base max-Wide-mobile-l:text-xl max-laptop-xl:text-2xl text-3xl font-dorna font-semibold">
            اسپید جانبی
          </h1>
          <Link
            href="/aboutMe"
            className="max-mobile-l:text-xs max-Wide-mobile-l:text-lg max-laptop-xl:text-xl mt-3 text-2xl font-normal cursor-pointer"
          >
            درباره ما
          </Link>
          <Link
            href="/fo/kharid"
            className="max-mobile-l:text-xs max-Wide-mobile-l:text-lg max-laptop-xl:text-xl mt-3 text-2xl font-normal cursor-pointer"
          >
            راهنمای خرید
          </Link>
        </div>
      </div>

      <div className="ml-20 max-laptop-l:ml-0">
        <h1 className="flex flex-col">
          <span className="max-mobile-l:text-5xl text-8xl max-desktop-s:text-6xl font-extrabold text-gray-900">
            SPEED
          </span>
          <span className="max-mobile-l:text-5xl text-8xl max-desktop-s:text-6xl font-extrabold text-blue-800">
            JANEBI
          </span>
        </h1>
      </div>
    </div>

    <div className="flex flex-row-reverse justify-between items-center h-1/2">
      <div className="flex flex-row max-tablet-l:flex-col">
        <img src="/enamad.png" alt="e-namd" height="80px" width="100px" />
        <img
          src="/namad-01.png"
          alt="namad"
          height="80px"
          width="100px"
        />
        <img src="/rezi.png" alt="namad" height="80px" width="100px" />
      </div>

      <div className="flex flex-col items-end mx-28 max-laptop-xl:mx-8">
        <div className="flex max-Wide-mobile-l:text-2xl text-4xl flex-row">

        {
            Basket.map((item, index) => {
             return(
                <div key={index} >
                  


                  <Link className="mx-3" href={`${item.instagram}`}>
                      <FaInstagram />
                  </Link>
                  <Link className="mx-3" href={`${item.wahtsapp}`}>
                      <IoLogoWhatsapp />
                  </Link>
                  <Link className="mx-3" href={`${item.telegram}`}>
                      <RiTelegramLine />
                  </Link>

                </div>
             )
            })
        }
          
        </div>
        <div className=" text-3xl max-mobile-l:text-xs max-Wide-mobile-l:text-base max-laptop-xl:text-2xl flex flex-col items-end font-dorna font-semibold ">
          <p className="mt-6">شماره : 09966820923</p>
          <p className="mt-6">ساعت کاری و جوابدهی 8 صبح تا 11 شب</p>
        </div>
      </div>
    </div>
  </footer>
  )
}
