import apiKey from '@/app/API';
import axios from 'axios';
import React, { forwardRef, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { BiChevronLeft } from "react-icons/bi";

const Categoris = forwardRef((props, ref) => { // ✅ اضافه کردن forwardRef

  const [Categori, setCategori] = useState([]);

  useEffect(() => {
    axios.get(apiKey.getCategori)
      .then(response => {
        if (response.data.data) {
          setCategori(response.data.data);
        }
      })
      .catch(error => console.error("Error fetching data:"));
  }, []);

  const app = useRouter()
  const sellPageHandler = (e) => {
    app.push(`/sellItemWirhCategori?onvan=${e}`)
  }

  return (
    <div ref={ref} className="flex-wrap mt-6 w-full flex flex-col items-center justify-evenly font-dorna text-xl">
        <div className="w-full h-[2px] bg-slate-300"></div>
      {Categori.map((item, index) => (
        <div onClick={() => sellPageHandler(item.onvan)} key={index} className='hover:text-sky-700 cursor-pointer w-full border-b-2 border-gray-300 flex justify-between items-center'>
          <p className="flex flex-row items-center justify-between w-full px-3 p-4">
            
            <span className="">{item.onvan}</span>
            <span className=""><BiChevronLeft/></span>
          </p>
        </div>
      ))}
    </div>
  );
});

export default Categoris;