"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import apiKey from "../API";
import { FaPlus, FaTrashAlt } from "react-icons/fa";
import { GoDash } from "react-icons/go";
import { useRouter } from "next/navigation";
import { HiFire } from "react-icons/hi";


export default function Page() {
  const [cartItems, setCartItems] = useState([]);
  const [productDetails, setProductDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  // دریافت اطلاعات از کوکی هنگام لود شدن صفحه
  useEffect(() => {
    const getCartItems = () => {
      let items = Cookies.get("cart");
      items = items ? JSON.parse(items) : [];
      setCartItems(items);
    };

    getCartItems();
    window.addEventListener("storage", getCartItems);
    return () => window.removeEventListener("storage", getCartItems);
  }, []);

  const router = useRouter()
  const returnToHome = () => {
    router.push("/")
  }

  // دریافت اطلاعات محصولات از API
  useEffect(() => {
    if (cartItems.length === 0) {
      setProductDetails([]); // اگر سبد خرید خالی باشد، اطلاعات را پاک کن
      setLoading(false);
      return;
    }

    setLoading(true);
    Promise.all(cartItems.map(item => axios.get(`${apiKey.getoneitem}/${item.id}`)))
      .then(responses => {
        const fetchedProducts = responses.map(res => res.data.data);
        setProductDetails(fetchedProducts);
      })
      .catch(error => console.error("Error fetching data:", error))
      .finally(() => setLoading(false));
  }, [cartItems]);

  // تابع برای ذخیره در کوکی و آپدیت استیت
  const updateCart = (updatedCart) => {
    setCartItems(updatedCart);
    Cookies.set("cart", JSON.stringify(updatedCart), { expires: 7 });
  };

  // افزایش تعداد محصول
  const increaseQuantity = (id) => {
    const updatedCart = cartItems.map(item =>
      item.id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
    );
    updateCart(updatedCart);
  };

  // کاهش تعداد محصول
  const decreaseQuantity = (id) => {
    const updatedCart = cartItems
      .map(item =>
        item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter(item => item.quantity > 0);

    updateCart(updatedCart);
  };

  // حذف محصول از سبد خرید
  const removeItem = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    updateCart(updatedCart);
  };

  if (loading) {
    return <div className="text-center text-2xl">در حال بارگذاری...</div>;
  }

  return (
    <div className="text-2xl p-5 font-dorna w-full items-center justify-center">
    {cartItems.length > 0 ? (
      cartItems.map((cartItem, index) => {
        const product = productDetails.find(p => p._id === cartItem.id);
        if (!product) return null;

        return (
          <div key={index} className="border p-4 mb-4 flex items-center w-full justify-around border-sky-400">
              <div className="">
                 <img src={product.photo} alt="img" className="w-20 h-20 object-cover" />
              </div>
            <div className="flex flex-row justify-around max-tablet-xl:flex-col items-center w-full ">
              <div className="font-bold w-[25%] max-desktop-l:text-lg">{product.onvan}</div>
              <div className="flex flex-row max-tablet-xl:flex-col w-[40%] justify-between items-center">

              <div className="text-sm w-[10%] text-gray-500">{cartItem.model}</div>
              <div className="flex items-center gap-2">
                <span className="text-sm">رنگ:</span>
                <div className="w-6 h-6 rounded-full border border-black" style={{ backgroundColor: product.color }}></div>
              </div>
              <div className="text-lg font-semibold w-[10%] flex flex-row">
                {Math.floor((product.money / 100) * (100 - product.offer) / 1000) * 1000} تومان
              </div>
              </div>
              


            </div>
            <div className="flex flex-row justify-center items-center">

              <div className="flex mx-3 items-center gap-2 ">
                <button onClick={() => increaseQuantity(cartItem.id)} className="p-2 bg-sky-500 text-white rounded">
                  <FaPlus />
                </button>
                <span className="text-xl">{cartItem.quantity}</span>
                <button
                  onClick={() => decreaseQuantity(cartItem.id)}
                  className="p-2 bg-sky-500 text-white rounded"
                  disabled={cartItem.quantity === 1}
                >
                  <GoDash />
                </button>
              </div>
            <button onClick={() => removeItem(cartItem.id)} className="ml-auto p-2 bg-black text-white rounded">
              <FaTrashAlt />
            </button>
            </div>
          </div>
        );
      })
    ) : (
      <p className="font-extrabold text-2xl w-full flex justify-center items-center">سبد خرید خالی است</p>
    )}

    <button onClick={returnToHome} className="cursor-pointer text-2xl font-bold bg-sky-700 text-white h-16 active:bg-sky-900 w-60">ادامه خرید</button>
     <div className="w-full flex justify-between items-center flex-row text-slate-400">
        <span className="bg-slate-400 h-1 w-[48%]"></span>
        <span className="text-4xl"><HiFire /></span>
        <span className="bg-slate-400 h-1 w-[48%]"></span>
     </div>

     <div className="w-full flex flex-row-reverse max-desktop-l:flex-col justify-around items-center mt-24">
       <div className="bg-white p-8 w-[700px] shadow-xl flex flex-col justify-between items-center max-tablet-xl:w-11/12">
         <h1 className="mt-3 font-extrabold text-black">جمع سبد خرید</h1>
         
         <div className="mt-3 flex px-4 justify-between items-center w-11/12 bg-white h-24 shadow-md border border-black">
             <span className="">جمع خرید</span>
             <span className=""></span>          
         </div>
         
         <div className="mt-3 flex px-4 justify-between items-center w-11/12 bg-white h-24 shadow-md border border-black">
             <span className="">هزینه پست</span>
             <span className=""></span>          
         </div>
         
         <div className="mt-3 flex px-4 justify-between items-center w-11/12 bg-white h-24 shadow-md border border-black">
             <span className="">جمع کل</span>
             <span className=""></span>          
         </div>

         
         <button className="mt-6 flex px-4 justify-center items-center w-1/3 bg-sky-600 h-16 shadow-md font-extrabold text-white">تکمیل خرید</button>

       </div>
       <div className="flex flex-col justify-center items-center max-desktop-l:mt-6">
          <span className="max-Wide-mobile-2xl:text-6xl text-9xl font-extrabold text-black">SPEED</span>
          <span className="max-Wide-mobile-2xl:text-6xl text-9xl font-extrabold text-sky-600">JANEBI</span>
       </div>
       
     </div>
  
  </div>
  );
}

