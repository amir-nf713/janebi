"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { GoArrowLeft } from 'react-icons/go'; // اگر از react-icons استفاده می‌کنید
 import { useRouter } from 'next/navigation'; // Import the useRouter hook


const FavoritesPage = () => {

   


  const router = useRouter(); 



    
  const [products, setProducts] = useState([]);

  const fetchProducts = async (ids) => {
    const productsData = [];
    for (const id of ids) {
      try {
        const response = await axios.get(`${apiKey.getoneitem}/${id}`);
        const data = response.data.data;
        productsData.push(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    setProducts(productsData);
  };

  useEffect(() => {
    // خواندن کوکی
    const favoritesCookie = Cookies.get('favorit');
    if (favoritesCookie) {
      // تبدیل رشته JSON به آرایه
      const favoritesArray = JSON.parse(favoritesCookie);

      // استخراج idها
      const favoriteIds = favoritesArray.map(item => item.id);

      // دریافت اطلاعات محصولات
      fetchProducts(favoriteIds);
    }
  }, []);



  return (
    <div className='h-[100vh]'>
        <div  className="w-full flex flex-row justify-end p-2 text-2xl font-extrabold text-sky-700 items-center">
          <button  className="w-16 flex items-center justify-center" onClick={() => router.push("/")}><GoArrowLeft /></button>
        </div>
      <h1>علاقه‌مندی‌های شما</h1>
      {products.length > 0 ? (
        <div>
          {products.map((product, index) => (
            <div key={index} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
              <h2>{product.onvan}</h2>
              <p>{product.berand}</p>
              <p>{product.money}</p>
              <img src={product.photo} alt={product.onvan} style={{ width: '100px' }} />
            </div>
          ))}
        </div>
      ) : (
        <p>هیچ محصولی در لیست علاقه‌مندی‌های شما وجود ندارد.</p>
      )}
    </div>
  );
};

export default FavoritesPage;
