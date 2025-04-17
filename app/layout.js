'use client'
import "./globals.css";
import React from "react";
import { GrBasket } from "react-icons/gr";
import { FaRegUser } from "react-icons/fa6";
import { GrFavorite } from "react-icons/gr";
import { AiOutlineShop } from "react-icons/ai";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Suspense } from "react";
import Loading from "./loding/Loding";
import { IoHomeOutline } from "react-icons/io5";
  

export default function RootLayout({ children }) {

  const router = useRouter()
  
  const gg = () => {
    router.push("/");
  };


  const ff = () => {
    router.push(`/search?query=`);
  };


  const ll = () => {
    router.push(`/favorit`);
  };
 
  const accontt = (e) => {
    e.preventDefault();
    const userId = Cookies.get("id");

    if (userId) {
      router.push("/UserPannle");
    } else {
      router.push("/login");
    }
  };

  
  return (
    <html lang="en">
      <body>
  
    <Suspense fallback={<Loading />}>
      {children}
    </Suspense>
 
    <div className="bg-white z-[100000000000] hidden w-full max-Wide-mobile-4xl:flex fixed h-14 items-center justify-around text-2xl bottom-0">

               <div onClick={gg} className="">
                 <IoHomeOutline />
               </div>

               <div onClick={accontt} className="">
                  <FaRegUser/>
               </div>

               <div onClick={ll} className="">
                  <GrFavorite />
               </div>
               
             
               <div onClick={ff} className="">
                  <AiOutlineShop />
               </div>
               
           </div>
        
      </body>
    </html>
  );
}
