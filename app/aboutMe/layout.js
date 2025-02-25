"use client"
import React from "react";
import { useRouter } from "next/navigation";
import { GoArrowLeft } from "react-icons/go";





export default function AdminLayout({ children }) {

    const router = useRouter()

 
  
  return (
    <html lang="en">
      <body>
        <div  className="w-full flex flex-row justify-end p-2 text-2xl font-extrabold text-sky-700 items-center">
          <button  className="w-16 flex items-center justify-center" onClick={() => router.back()}><GoArrowLeft /></button>
        </div>
        
        {children}
 
        
      </body>
    </html>
  );
}
