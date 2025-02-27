import apiKey from '@/app/API';
import axios from 'axios';
import React, { forwardRef, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';

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
    <div ref={ref} className="flex-wrap flex flex-row items-center justify-evenly mt-20">
      {Categori.map((item, index) => (
        <div onClick={() => sellPageHandler(item.onvan)} key={index} className='m-2 max-Wide-mobile-s:h-36 max-Wide-mobile-s:w-28 shadow-lg w-60 h-72 font-dorna flex justify-center items-center transition-all hover:shadow-2xl max-tablet-l:h-56 max-tablet-l:w-48'>
          <img className='h-full w-full bg-center object-cover' src={item.picture} alt="categori img" />
          <p className="font-bold flex justify-center items-center bg-white z-50 w-56 h-14 max-tablet-l:h-10 max-tablet-l:w-40 max-tablet-l:mt-40 text-3xl absolute mt-52 rounded-full max-Wide-mobile-s:h-6 max-Wide-mobile-s:w-20 max-Wide-mobile-s:mt-24 max-Wide-mobile-s:text-xs">
            {item.onvan}
          </p>
        </div>
      ))}
    </div>
  );
});

export default Categoris;
