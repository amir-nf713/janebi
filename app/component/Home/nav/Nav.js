"use client";
import "../../../globals.css";
import React, { useState } from "react";
import { BsCartFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa6";
import { IoHome } from "react-icons/io5";
import { AiFillDatabase } from "react-icons/ai";
import { AiFillMessage } from "react-icons/ai";
import { AiFillAlert } from "react-icons/ai";
import { BsTextIndentRight } from "react-icons/bs";
import { FaInstagram } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io5";
import { RiTelegramLine } from "react-icons/ri";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useRef } from "react";
import { MdOutlineFilterListOff } from "react-icons/md";


export default function Nav({ targetRef }) {
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
    router.push("/bascket");
  };

  const scrollToSection = () => {
    targetRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const [w, stw] = useState("-right-96");
  const hh = () => {
        if (w === "-right-96") {
          stw("right-0")
        } else {
          stw("-right-96")
        }
  }

  return (
    <nav className="h-28 max-tablet-xl:h-20 max-Wide-mobile-l:h-14 w-full flex flex-row-reverse items-center justify-between">
      <div className="flex flex-row-reverse items-center justify-between">
        <div
          onClick={gg}
          className="mr-2 max-Wide-mobile-l:mr-1 max-tablet-xl:mr-1 ml-11 text-4xl max-tablet-xl:text-xl p-3  max-tablet-xl:ml-3 max-Wide-mobile-l:text-xl cursor-pointer max-Wide-mobile-l:border-none  "
        >
          <BsCartFill />
        </div>

        <div
          onClick={accontt}
          className="flex cursor-pointer max-Wide-mobile-l:bg-white/0 flex-row justify-evenly p-2 items-center h-16 w-20 max-Wide-mobile-l:w-10 max-Wide-mobile-l:h-8  max-tablet-xl:h-10 max-tablet-xl:w-11 text-white max-Wide-mobile-l:text-black rounded-full"
        >
          
          <span className="text-4xl text-black max-tablet-xl:text-xl max-Wide-mobile-l:text-lg">
            <FaUser />
          </span>
        </div>
      </div>

      <img className="h-full w-auto bg-transparent" src="/Frame_395-removebg-preview.png" alt="" />

      <div
        className={`absolute bg-white h-[100vh] text-3xl w-60 z-40 ${w} transition-all items-center justify-start top-0 max-desktop-xl:flex flex-col hidden z-[100]`}
      >
        <button onClick={hh} className="w-full flex items-center p-3 justify-end text-4xl border-b-2 border-e-slate-700"><MdOutlineFilterListOff /></button>
        <Link
          href={"/"}
          className="m-2 p-2 flex w-full max-Wide-mobile-l:text-xl  border-b-2 border-neutral-500 flex-row justify-between items-center active:text-blue-800 hover:text-blue-800 cursor-pointer"
        >
          <span className="mr-2  font-dorna">خانه</span>
          <span>
            <IoHome />
          </span>
        </Link>

        <p
          onClick={scrollToSection}
          className="m-2 p-2 w-full max-Wide-mobile-l:text-xl border-b-2 border-neutral-500 flex-row flex  justify-between items-center active:text-blue-800 hover:text-blue-800 cursor-pointer"
        >
          <span className="mr-2 font-dorna">دسته بندی</span>
          <span>
            <AiFillDatabase />
          </span>
        </p>

        <p className="m-2 p-2 max-Wide-mobile-l:text-xl flex w-full  border-b-2 border-neutral-500 flex-row justify-between items-center active:text-blue-800 hover:text-blue-800 cursor-pointer">
          <Link href={"/aboutMe"} className="mr-2 flex-row flex justify-between w-full items-center font-dorna">
            درباره ما
          
          <span>
            <AiFillMessage />
          </span>
          </Link>
        </p>

        <Link
          href={"/traking"}
          className="m-2 p-2 flex w-full  border-b-2 border-neutral-500 flex-row justify-between max-Wide-mobile-l:text-xl items-center active:text-blue-800 hover:text-blue-800 cursor-pointer"
        >
          <span className="font-dorna mr-2">پیگیری سفارش</span>
          <span>
            <AiFillAlert />
          </span>
        </Link>
      </div>

      <div className="flex text-3xl w-[40%] mr-11 flex-row items-center justify-between max-desktop-xl:hidden">
        <Link
          href={"/"}
          className="flex flex-row-reverse justify-between items-center active:text-blue-800 hover:text-blue-800 cursor-pointer"
        >
          <span className="mr-2 font-dorna">خانه</span>
          <span>
            <IoHome />
          </span>
        </Link>

        <p
          onClick={scrollToSection}
          className="flex flex-row-reverse justify-between items-center active:text-blue-800 hover:text-blue-800 cursor-pointer"
        >
          <span className="mr-2 font-dorna">دسته بندی</span>
          <span>
            <AiFillDatabase />
          </span>
        </p>

        <p className="flex flex-row-reverse justify-between items-center active:text-blue-800 hover:text-blue-800 cursor-pointer">
          <Link href={"/aboutMe"} className="mr-2 font-dorna">
            درباره ما
          </Link>
          <span>
            <AiFillMessage />
          </span>
        </p>

        <Link
          href={"/traking"}
          className="flex flex-row-reverse justify-between items-center active:text-blue-800 hover:text-blue-800 cursor-pointer"
        >
          <span className="font-dorna mr-2">پیگیری سفارش</span>
          <span>
            <AiFillAlert />
          </span>
        </Link>
      </div>

      <div
        onClick={hh}
        className="hidden max-tablet-xl:text-4xl mr-10 max-tablet-xl:mr-4 text-5xl max-desktop-xl:flex justify-center items-center active:text-blue-800 hover:text-blue-800 cursor-pointer"
      >
        <BsTextIndentRight />
      </div>
    </nav>
  );
}
