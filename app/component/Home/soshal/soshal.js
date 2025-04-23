"use client"
import apiKey from '@/app/API';
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'



export default function Soshal() {

    // const [Basket, setBasket] = useState([]);
    const [ins, setins] = useState([]);
    const [wat, setwat] = useState([]);
    const [tel, settel] = useState([]);

    useEffect(() => {
      const fetchShippingCost = async () => {
        try {
          const response = await axios.get(apiKey.Web);
          setins(response?.data?.data?.[0]?.instagram || "");
          setwat(response?.data?.data?.[0]?.wahtsapp || "");
          settel(response?.data?.data?.[0]?.telegram || "");
        } catch (err) {
          console.error("Failed to fetch shipping cost:", err);
          setShippingCost(0);
        }
      };
  
      fetchShippingCost();
    }, []);
    

    
  return (
    <div className='w-full'>
        
            
             
                <div key={index} className="text-5xl flex max-mobile-l:text-3xl justify-center items-center w-full h-24 bg-sky-800">
                  <Link className='mx-6 text-white ' href={ins}>
                     <img src="ico/67c7195642931.png" className='size-20 max-Wide-mobile-s:size-16 max-mobile-l:size-12 ' alt="img" />
                  </Link>

                  <Link className='mx-6 text-white ' href={tel}>
                      <img src="ico/67c719811ab3e.png" className='size-20 max-Wide-mobile-s:size-16 max-mobile-l:size-12 ' alt="img" />
                  </Link>

                  <Link className='mx-6 text-white ' href={wat}>
                      <img src="ico/67c719c6f2533.png" className='size-20 max-Wide-mobile-s:size-16 max-mobile-l:size-12 ' alt="img" />
                  </Link>
                </div>
             
            
        
      
    </div>
  )
}
