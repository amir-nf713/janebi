"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { GoArrowLeft } from 'react-icons/go'; // If you're using react-icons
import { useRouter } from 'next/navigation'; // Import the useRouter hook
import apiKey from '../API';

const FavoritesPage = () => {
  const router = useRouter();
  const [products, setProducts] = useState([]);

  const fetchProducts = async (ids) => {
    const productsData = [];
    for (const id of ids) {
      try {
        const response = await axios.get(`${apiKey.getoneitem}/${id}`);
        console.log("API Response for ID", id, ":", response.data); // بررسی ساختار داده‌ها
        const data = response.data.data; // مطمئن شوید که داده‌ها در این مسیر قرار دارند
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
      try {
        // تبدیل رشته JSON به آرایه
        const favoritesArray = JSON.parse(favoritesCookie);
        console.log("Parsed favorites array:", favoritesArray); // برای دیباگ

        // استخراج idها
        const favoriteIds = favoritesArray.map(item => item.id);
        console.log("Favorite IDs:", favoriteIds); // برای دیباگ

        // دریافت اطلاعات محصولات
        fetchProducts(favoriteIds);
      } catch (error) {
        console.error("Error parsing favorites cookie:", error);
      }
    }
  }, []);

  return (
    <div className='gap-4 flex-wrap h-[100vh] flex justify-center items-center  p-4'>
     
      
      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product, index) => (
           <div onClick={() => router.push(`/sellItem?id=${product._id}`)} key={index} className="relative border w-56 h-[350px] p-4 rounded-lg shadow-md bg-white transform transition-all duration-300 hover:scale-105 hover:shadow-xl group overflow-hidden">
           {/* تصویر محصول */}
           <div className="relative h-48 w-full overflow-hidden rounded-lg">
             <img 
               src={product.photo?.split("ph1:")[1]?.split("ph2:")[0] || ""} 
               alt={product.onvan} 
               className="h-full  object-cover transition-transform duration-300 group-hover:scale-110"
             />
             {/* افکت hover روی تصویر */}
             <div className="absolute inset-0 bg-black bg-opacity-0 transition-all duration-300 group-hover:bg-opacity-20"></div>
           </div>
         
           {/* اطلاعات محصول */}
           <div className="mt-4 space-y-2">
             {/* عنوان محصول */}
             <h2 className="text-xl font-semibold text-gray-800 truncate">{product.onvan}</h2>
             {/* برند محصول */}
             <p className="text-gray-600 text-sm">{product.berand}</p>
             {/* قیمت محصول */}
             <p className="text-sky-600 font-bold text-lg">{product.money} تومان</p>
           
           
           </div>
         
           {/* دکمه اضافه به سبد خرید */}
         </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">هیچ محصولی در لیست علاقه‌مندی‌های شما وجود ندارد.</p>
      )}
      
    </div>
  );
};

export default FavoritesPage;