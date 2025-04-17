"use client";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaWallet } from "react-icons/fa6";
import { FaShoppingBag } from "react-icons/fa";
import { MdOutlineDataThresholding } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import Link from "next/link";
import apiKey from "../API";
import axios from "axios";







export default function UserPannle() {
  const cookies = Cookies.get("id");
  const router = useRouter();
  if (!cookies) {
    router.push("/");
  }

  const [Codedavat, setCodedavat] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(apiKey.user);
        const user = response.data.data.find((element) => element._id === cookies);
        if (user) {
          setCodedavat(user.codeDavat);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to load wallet data");
      } finally {
        setIsLoading(false);
      }
    };

    if (cookies) fetchUserData();
  }, [cookies]);

  const logout = () => {
   
    router.push("/")
    Cookies.remove("id")
    window.location.reload()
  }
  return (
    <div className="w-full flex justify-center items-center h-[95vh]">
      <div className="w-[700px] max-tablet-l:w-[95%] font-dorna font-extrabold text-xl flex flex-col bg-white h-[90vh] justify-evenly items-center">
        {
          isLoading === false ? (
          <div className="text-black text-2xl">کد دعوت شما : {Codedavat}</div>
        ) : (
          <></>
        )
        }
        
        <Link href={"/UserPannle/Basket"} className="flex-col-reverse justify-evenly h-[18%] w-11/12 flex items-center bg-sky-600 text-white">
          <span className="">سفارش ها</span>
          <span className="text-4xl"><FaShoppingBag /></span>
        </Link>
        <Link href={"/UserPannle/wallet"} className="flex-col-reverse justify-evenly h-[18%] w-11/12 flex items-center bg-sky-600 text-white">
          <span className="">کیف پول</span>
          <span className="text-4xl"><FaWallet /></span>
        </Link>
       

        <Link href={"/UserPannle/stayincall"} className="flex-col-reverse justify-evenly h-[18%] w-11/12 flex items-center bg-sky-600 text-white">
          <span className="">پشتیبانی</span>
          <span className="text-4xl"><MdOutlineDataThresholding /></span>
        </Link>

        <div onClick={logout} className="cursor-pointer flex-col-reverse justify-evenly h-[18%] w-11/12 flex items-center text-white bg-sky-950">
          <span className="">خروج از حساب</span>
          <span className="text-4xl"><MdLogout /></span>
        </div>
      </div>
    </div>
  );
}
