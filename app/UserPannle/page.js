"use client";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaWallet, FaShoppingBag } from "react-icons/fa";
import { MdOutlineDataThresholding, MdLogout } from "react-icons/md";
import Link from "next/link";
import apiKey from "../API";
import axios from "axios";

export default function UserPanel() {
  const router = useRouter();
  const userId = Cookies.get("id");
  
  // Redirect if no user ID
  useEffect(() => {
    if (!userId) {
      router.push("/");
    }
  }, [userId, router]);

  const [invitationCode, setInvitationCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) return;
      
      try {
        const response = await axios.get(apiKey.user);
        const user = response.data.data.find(element => element._id === userId);
        if (user) {
          setInvitationCode(user.codeDavat);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to load user data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleLogout = () => {
    Cookies.remove("id");
    router.push("/");
    // Note: window.location.reload() will happen automatically after push
  };

  // Loading state
  if (!userId || isLoading) {
    return (
      <div className="w-full flex justify-center items-center h-[95vh]">
        <div className="w-[700px] max-tablet-l:w-[95%] font-dorna font-extrabold text-xl flex flex-col bg-white h-[90vh] justify-evenly items-center">
          <div className="text-black text-2xl">Loading...</div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="w-full flex justify-center items-center h-[95vh]">
        <div className="w-[700px] max-tablet-l:w-[95%] font-dorna font-extrabold text-xl flex flex-col bg-white h-[90vh] justify-evenly items-center">
          <div className="text-red-500 text-2xl">{error}</div>
        </div>
      </div>
    );
  }

  // Panel buttons data
  const panelButtons = [
    { 
      href: "/UserPannle/Basket", 
      text: "سفارش ها", 
      icon: <FaShoppingBag className="text-4xl" /> 
    },
    { 
      href: "/UserPannle/wallet", 
      text: "کیف پول", 
      icon: <FaWallet className="text-4xl" /> 
    },
    { 
      href: "/UserPannle/stayincall", 
      text: "پشتیبانی", 
      icon: <MdOutlineDataThresholding className="text-4xl" /> 
    },
  ];

  return (
    <div className="w-full flex justify-center items-center h-[95vh]">
      <div className="w-[700px] max-tablet-l:w-[95%] font-dorna font-extrabold text-xl flex flex-col bg-white h-[90vh] justify-evenly items-center rounded-lg shadow-lg">
        {invitationCode && (
          <div className="text-black text-2xl p-4 bg-gray-100 rounded-lg">
            کد دعوت شما: {invitationCode}
          </div>
        )}
        
        {panelButtons.map((button, index) => (
          <Link 
            key={index}
            href={button.href}
            className="flex flex-col-reverse justify-evenly items-center h-[18%] w-11/12 bg-sky-600 hover:bg-sky-700 text-white rounded-lg transition-colors duration-300"
          >
            <span>{button.text}</span>
            {button.icon}
          </Link>
        ))}

        <button
          onClick={handleLogout}
          className="cursor-pointer flex flex-col-reverse justify-evenly items-center h-[18%] w-11/12 text-white bg-sky-950 hover:bg-red-700 rounded-lg transition-colors duration-300"
        >
          <span>خروج از حساب</span>
          <MdLogout className="text-4xl" />
        </button>
      </div>
    </div>
  );
}