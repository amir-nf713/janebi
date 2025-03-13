"use client"
import React, { useEffect, useState } from 'react'
import { GoChevronLeft } from "react-icons/go";
import Itemcategori from './Itemcategori';
import {GoChevronRight } from 'react-icons/go';
import { useRef } from 'react'; 
import axios from 'axios';
import apiKey from '../API';
// import { useRouter } from 'next/navigation';



export default function CategoriBox(props) {
    const contentRef = useRef(null);

    const scrollRight = () => {
        if (contentRef.current) {
          contentRef.current.scrollTo({
            left: contentRef.current.scrollLeft + 1000, // اسکرول 3 واحد به سمت راست
            behavior: 'smooth', // انیمیشن نرم
          });
        }
      };
    
      // اسکرول به چپ با انیمیشن نرم
      const scrollLeft = () => {
        if (contentRef.current) {
          contentRef.current.scrollTo({
            left: contentRef.current.scrollLeft - 1000, // اسکرول 3 واحد به سمت چپ
            behavior: "smooth", // انیمیشن نرم
          });
        }
      };

      
  const [categorii, setcategorii] = useState([]);

  useEffect(() => {
    
      axios.get(apiKey.getitem) // اضافه کردن `/` برای درستی URL
        .then(response => {
          if (response.data.data) {
            setcategorii(response.data.data); // تبدیل شیء به آرایه برای جلوگیری از خطا
          }
        })
        .catch(error => console.error("Error fetching data:"));
    
  }, []); // وابستگی به `id`

  // `/sellItem?id=${props.id}`
   
  

  return (
    <div className='flex flex-col font-dorna my-14'>
      <div className="flex justify-between items-center w-full px-8 mb-4 max-Wide-mobile-4xl:px-3">
          <h1 className="max-Wide-mobile-4xl:text-xl text-3xl font-normal">{props.categori}</h1>
      </div>
      <div className=" flex flex-row overflow-x-auto sc " ref={contentRef}>

          {
              categorii.map((Items, index) => ( 
                <div key={index} className=""> 
                  {
                    Items.categori === props.categori ? <Itemcategori id={Items._id} title={Items.onvan} img={Items.photo?.split("ph1:")[1]?.split("ph2:")[0] || ""}></Itemcategori> : <></>

                  }
                </div>
              ))
              
               
          }

        
      </div>
      <div className="flex flex-row-reverse w-full justify-center items-center mt-4 max-tablet-xl:hidden text-5xl">
        <div 
          onClick={scrollLeft} 
          className="text-white  size-16 flex bg-blue-900 justify-center items-center font-extrabold m-4 cursor-pointer rounded-full">
          <GoChevronLeft />
        </div>
        <div 
          onClick={scrollRight} 
          className="text-white bg-blue-900 size-16 flex justify-center items-center font-extrabold m-4 cursor-pointer rounded-full">
          <GoChevronRight />
        </div>
      </div>
    </div>
  )
}
