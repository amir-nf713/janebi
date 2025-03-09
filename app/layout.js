'use client'
import "./globals.css";
import React from "react";
import { GrBasket } from "react-icons/gr";
import { FaRegUser } from "react-icons/fa6";
import { GrFavorite } from "react-icons/gr";
import { AiOutlineShop } from "react-icons/ai";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";


export default function RootLayout({ children }) {

  const router = useRouter()
  const gg = () => {
    router.push("/bascket");
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
  
        {children}
 
           <div className="bg-white hidden w-full max-Wide-mobile-4xl:flex sticky h-14 items-center justify-around text-2xl bottom-0">
               <div onClick={gg} className="">
                  <GrBasket />
               </div>

               <div onClick={accontt} className="">
                  <FaRegUser/>
               </div>

               <div className="">
                  <GrFavorite />
               </div>
               
             
               <div className="">
                  <AiOutlineShop />
               </div>
               
           </div>
        
      </body>
    </html>
  );
}
