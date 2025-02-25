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
    <div ref={ref} className="flex-wrap flex flex-row items-center justify-evenly mt-40">
      {Categori.map((item, index) => (
        <div onClick={() => sellPageHandler(item.onvan)} key={index} className='m-2 shadow-lg w-60 h-72 font-dorna flex justify-center items-center transition-all hover:shadow-2xl'>
          <img className='h-full w-full bg-center object-cover' src={item.picture} alt="categori img" />
          <p className="font-bold flex justify-center items-center bg-white z-50 w-56 h-14 text-3xl absolute mt-52 rounded-full">
            {item.onvan}
          </p>
        </div>
      ))}
    </div>
  );
});

export default Categoris;
