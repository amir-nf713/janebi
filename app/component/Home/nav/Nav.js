"use client";
import "../../../globals.css";
import React, { useCallback, useEffect, useState } from "react";
import { BsTextIndentRight } from "react-icons/bs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useRef } from "react";
import SearchInput from "../main/searchInput";
import { FaRegUser } from "react-icons/fa6";
import { CiShoppingBasket } from "react-icons/ci";
import { CiChat2 } from "react-icons/ci";
import { CiBoxList } from "react-icons/ci";
import { IoHomeOutline } from "react-icons/io5";
import { BiChevronLeft } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";
import { GrBasket } from "react-icons/gr";
import { GrClose } from "react-icons/gr";
import axios from "axios";
import apiKey from "@/app/API";
import { FaPlus, FaTrashAlt } from "react-icons/fa";
import { GoDash } from "react-icons/go";
import Categoris from "../catecoris/Categoris";




export default function Nav({ targetRef }) {
  const [cartItems, setCartItems] = useState([]);
  const [productDetails, setProductDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCartItems = () => {
      const items = Cookies.get("cart");
      console.log("Cart Items:", items); // بررسی ساختار داده‌ها
      setCartItems(items ? JSON.parse(items) : []);
    }; 
    getCartItems();
    window.addEventListener("storage", getCartItems);
    return () => window.removeEventListener("storage", getCartItems);
  }, []);

  useEffect(() => {
    if (cartItems.length === 0) {
      setProductDetails([]);
      setLoading(false);
      return;
    }
  
    setLoading(true);
  
    // Fetch product details for all items in the cart
    Promise.all(cartItems.map(item => axios.get(`${apiKey.getoneitem}/${item.id}`)))
      .then(responses => {
        const fetchedProducts = responses
          .map(res => res.data.data)
          .filter(product => product !== undefined); // فیلتر کردن undefinedها
        console.log("Fetched Products:", fetchedProducts); // بررسی ساختار داده‌ها
        setProductDetails(fetchedProducts);
      })
      .catch(error => console.error("Error fetching data:", error))
      .finally(() => setLoading(false));
  }, [cartItems]);


  const [close, setClose] = useState("-left-96")


  const jh = () => {
    if (close === "-left-96") {
      setClose("left-0")
    }else{
      setClose("-left-96")
    }
  }

  const redral = useRef();
  const router = useRouter();

  const accontt = (e) => {
    e.preventDefault();
    const userId = Cookies.get("id");

    if (userId) {
      router.push("/UserPannle");
    } else {
      router.push("/login");
    }
  };

  const gg = () => {
    
  };

  // /bascket

  const scrollToSection = () => {
    targetRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const [w, stw] = useState("-right-96");
  const hh = () => {
    if (w === "-right-96") {
      stw("right-0");
    } else {
      stw("-right-96");
    }
  };

 const updateCart = useCallback((updatedCart) => {
    setCartItems(updatedCart);
    Cookies.set("cart", JSON.stringify(updatedCart), { expires: 1 });
  }, []);

  const increaseQuantity = useCallback((k, id) => {
    const updatedCart = cartItems.map(item => {
      if (item.k === k) {
        const product = productDetails.find(p => p._id === id);
        if (!product) return item;
  
        let canIncrease = false;
        
        // Check all variants for available stock
        product.devaiceOK.forEach(variant => {
          variant.mojodi.forEach((stock, colorIndex) => {
            if (item.indexcolor === colorIndex && stock > item.quantity) {
              canIncrease = true;
            }
          });
        });
  
        if (canIncrease) {
          return { ...item, quantity: (item.quantity || 1) + 1 };
        }
      }
      return item;
    });
  
    updateCart(updatedCart);
  }, [cartItems, productDetails, updateCart]);

  const decreaseQuantity = useCallback((k) => {
    const updatedCart = cartItems
      .map(item =>
        item.k === k && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter(item => item.quantity > 0);
    updateCart(updatedCart);
  }, [cartItems, updateCart]);

  const removeItem = useCallback((k) => {
    const updatedCart = cartItems.filter(item => item.k !== k);
    updateCart(updatedCart);
  }, [cartItems, updateCart]);

 
let c = 0

 



  return (
    <nav className="h-28 max-tablet-xl:h-20 max-Wide-mobile-l:h-14 w-full flex flex-row-reverse items-center justify-between">
      <div className="flex flex-row-reverse items-center justify-between">
        <div
          onClick={jh}
          className="mr-2  max-Wide-mobile-l:mr-1 max-tablet-xl:mr-1 ml-11 text-4xl max-tablet-xl:text-xl pl-3 max-tablet-xl:ml-3 max-Wide-mobile-l:text-xl cursor-pointer max-Wide-mobile-l:border-none  "
        >
          <GrBasket />
        </div>

        <div
          onClick={accontt}
          className="flex max-Wide-mobile-4xl:hidden cursor-pointer max-Wide-mobile-l:bg-white/0 flex-row justify-evenly p-2 items-center h-16 w-20 max-Wide-mobile-l:w-10 max-Wide-mobile-l:h-8  max-tablet-xl:h-10 max-tablet-xl:w-11 text-white max-Wide-mobile-l:text-black rounded-full"
        >
          <span className="text-4xl text-black max-tablet-xl:text-xl max-Wide-mobile-l:text-lg">
            <FaRegUser />
          </span>
        </div>
        <SearchInput></SearchInput>
      </div>

<Link className="h-full w-auto bg-transparent" href={"/"}>
      <img
        className="h-full w-auto bg-transparent"
        src="/Frame_395-removebg-preview.png"
        alt="logo"
      />
</Link>
      

      <div
        
        className={`fixed bg-neutral-100 z-[99999] h-[100vh] text-3xl w-60  ${w} transition-all overflow-auto items-center justify-start top-0 max-desktop-xl:flex flex-col hidden z-[100]`}
      >
        <button
          onClick={hh}
          className="w-full flex items-center p-3 text-2xl border-b-2 border-e-slate-700"
        >
          <IoMdClose />
        </button>
        <Link
          href={"/"}
          className="m-2 p-2 flex w-full max-Wide-mobile-l:text-xl flex-row justify-between items-center active:text-blue-800 hover:text-blue-800 cursor-pointer"
        >
          <div className="flex flex-row-reverse justify-center items-center">
            <span className="mr-2  font-dorna">خانه</span>
            <span>
              <IoHomeOutline />
            </span>
          </div>

          <span>
            <BiChevronLeft />
          </span>
        </Link>

        <div
          onClick={scrollToSection}
          className="m-2 p-2 w-full max-Wide-mobile-l:text-xl flex-row flex justify-between items-center active:text-blue-800 hover:text-blue-800 cursor-pointer"
        >
          <div className="flex flex-row-reverse justify-center items-center">
            <span className="mr-2 font-dorna">دسته بندی</span>
            <span>
              <CiBoxList />
            </span>
          </div>

          <span>
            <BiChevronLeft />
          </span>
        </div>

        <Link
          href={"/aboutMe"}
          className="m-2 p-2 max-Wide-mobile-l:text-xl flex w-full flex-row justify-between items-center active:text-blue-800 hover:text-blue-800 cursor-pointer"
        >
         

          <div className="flex flex-row-reverse justify-center items-center">
            <span className="font-dorna mr-2">درباره ما</span>
            <span>
            <CiChat2 />
            </span>
          </div>

          <span>
            <BiChevronLeft />
          </span>
        </Link>

        <Link
          href={"/traking"}
          className="m-2 p-2 flex w-full  flex-row justify-between max-Wide-mobile-l:text-xl items-center active:text-blue-800 hover:text-blue-800 cursor-pointer"
        >
          <div className="flex flex-row-reverse justify-center items-center">
            <span className="font-dorna mr-2">پیگیری سفارش</span>
            <span>
              <CiShoppingBasket />
            </span>
          </div>

          <span>
            <BiChevronLeft />
          </span>
        </Link>

      
        {/*  */}
          

<Categoris></Categoris>


        {/*  */}
      </div>

      <div className="flex text-2xl w-[33%] mr-11 flex-row items-center justify-between max-desktop-xl:hidden">
        <Link
          href={"/"}
          className="flex flex-row-reverse justify-between items-center active:text-blue-800 hover:text-blue-800 cursor-pointer"
        >
          <span className="mr-2 font-dorna">خانه</span>
          <span>
            <IoHomeOutline />
          </span>
        </Link>

        <p
          onClick={scrollToSection}
          className="flex flex-row-reverse justify-between items-center active:text-blue-800 hover:text-blue-800 cursor-pointer"
        >
          <span className="mr-2 font-dorna">دسته بندی</span>
          <span>
            <CiBoxList />
          </span>
        </p>

        <div className="flex flex-row-reverse justify-between items-center active:text-blue-800 hover:text-blue-800 cursor-pointer">
          <Link href={"/aboutMe"} className="mr-2 font-dorna">
            درباره ما
          </Link>
          <span>
            <CiChat2 />
          </span>
        </div>

        <Link
          href={"/traking"}
          className="flex flex-row-reverse justify-between items-center active:text-blue-800 hover:text-blue-800 cursor-pointer"
        >
          <span className="font-dorna mr-2">پیگیری سفارش</span>
          <span>
            <CiShoppingBasket />
          </span>
        </Link>
      </div>

      <div
        onClick={hh}
        className="hidden max-tablet-xl:text-4xl mr-10 max-tablet-xl:mr-4 text-5xl max-desktop-xl:flex justify-center items-center active:text-blue-800 hover:text-blue-800 cursor-pointer"
      >
        <BsTextIndentRight />
      </div>

{/* ---------------------= */}

       <div className={`fixed flex flex-col justify-between top-0 ${close} transition-all w-96 max-mobile-xlk:w-64 h-[100vh] bg-slate-50 z-[10010]`}>
            
            <div className="">
                 <div onClick={jh} className="w-full text-sky-600 text-2xl px-6 py-5 flex justify-between flex-row-reverse items-center font-bold font-dorna">
              <span className="flex justify-center items-center max-mobile-xlk:text-lg"><GrClose /> <span className="w-1"></span>بستن</span>
              <span className="text-3xl text-black max-mobile-xlk:text-xl">سبد خرید</span>
            </div>
 
            <div className="h-[2px] bg-black "></div>
            </div>
         
<div className="overflow-auto flex items-start justify-start h-full flex-col">

    {cartItems.length > 0 ? (
        cartItems.map((cartItem, index) => {
          const product = productDetails.find(p => p._id === cartItem.id);
          if (!product) return null; // اگر محصول وجود نداشت، رندر نشود

          return (
            <div key={index} className="border p-4 flex-col flex items-center  w-full justify-around border-gray-300">
              <div className="flex w-full flex-row items-center ">
                <img
                  src={product.photo?.split("ph1:")[1]?.split("ph2:")[0] || ""}
                  alt="img"
                  className="w-20 h-20 object-cover"
                />
                <div className="mr-4  text-sky-800  flex justify-center items-center font-bold  ">
                  {`${product.onvan} - ${cartItem.model}`}
                  
         
                </div>
              </div>


              <div className="flex-wrap flex w-full mt-4  flex-row justify-around items-center">
               
                <div className="flex flex-row justify-center items-center">
                  <div className="mx-3 flex items-center gap-2">
                    <button
                      onClick={() => increaseQuantity(cartItem.k, cartItem.id)}
                      className="p-2 bg-sky-500 text-white rounded"
                    >
                      <FaPlus />
                    </button>
                    <span className="text-xl">{cartItem.quantity}</span>
                    <button
                      onClick={() => decreaseQuantity(cartItem.k)}
                      className="p-2 bg-sky-500 text-white rounded"
                      disabled={cartItem.quantity === 1}
                    >
                      <GoDash />
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(cartItem.k)}
                    className="ml-auto p-2 bg-black text-white rounded"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              

               <div className="max-mobile-xlk:mt-3 justify-center items-center text-lg font-semibold  flex flex-row">
                  {Math.floor((((product.money / 100) * (100 - product.offer) / 1000) * 1000) * cartItem.quantity).toLocaleString()} تومان
                  <div
                    className="w-6 h-6 mr-5 rounded-full border border-black"
                    style={{ background: cartItem.color }}
                  ></div>
                </div>

              </div>

            </div>
          );
        })
      ) : (
        <p className="font-extrabold mt-6 max-mobile-xlk:text-lg text-2xl w-full flex justify-center items-center">سبد خرید خالی است</p>
      )}
</div>
          

            <div className="flex justify-center flex-col border-t border-black items-center mb-4">
              {
                cartItems.map((data, index) => {
                  const product = productDetails.find(p => p._id === data.id);
                  if (!product) return null; 
                  
                  c += ((((product.money / 100) * (100 - product.offer) / 1000) * 1000) * data.quantity)
                  
                  
                  
                })
                
              }
              <div className="text-2xl w-full flex items-center justify-around flex-row-reverse font-dorna font-bold py-4">
                <span className="">{c.toLocaleString()} تومان</span>
                <span className="text-lg text-gray-500">مبلغ سبد خرید :</span>
              </div>
              <button className="w-11/12 h-16 bg-sky-500 text-white rounded-full text-2xl font-dorna font-bold">ثبت نهایی</button>
            </div>
       </div>


{/* ---------------------- */}

    </nav>
  );
}
