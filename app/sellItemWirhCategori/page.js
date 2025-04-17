"use client";
import axios from "axios";
import React, { Suspense, useEffect, useState } from "react";
import apiKey from "../API";
import { useSearchParams } from "next/navigation";
import { FaShoppingBasket } from "react-icons/fa";
import { FaFilter } from "react-icons/fa";
import { TbFilterOff } from "react-icons/tb";
import { useRouter } from "next/navigation";
import { TbCategoryPlus } from "react-icons/tb";
import { TbXboxX } from "react-icons/tb";
import { BiArrowToLeft } from "react-icons/bi";
import { BsList } from "react-icons/bs";
import { BsXLg } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";





function SearchCompone() {
  const router = useRouter();
  const jh = (e) => {
    router.push(`/sellItem?id=${e}`);
  };
  const sParams = useSearchParams();
  const onvan = sParams.get("onvan");

  const [devaice, setDevaice] = useState([]);
  const [searchDivice, setsearchDivice] = useState("");
  const [selectedDevices, setSelectedDevices] = useState([]); // ✅ ذخیره موارد انتخاب‌شده
  const [Categori, setCategori] = useState([]);

  // 📌 گرفتن داده‌های دسته‌بندی
  useEffect(() => {
    axios
      .get(apiKey.getitem)
      .then((response) => {
        const filteredData = response.data.data.filter(
          (res) => res.categori === onvan
        );
        setCategori(filteredData); // مقدار جدید را مستقیماً تنظیم کنید
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []); // وابستگی `onvan` اضافه شد

  // 📌 فیلتر کردن و ذخیره دستگاه‌ها
  useEffect(() => {
    const newDevaice = [];

    Categori.map((item, index) => {
      
       
      if (item.categori === onvan) {
        item.devaiceOK.forEach((device) => {
          if (!newDevaice.includes(device.name)) {
            // console.log(device.name);
            newDevaice.push(device.name);
          }
        });
      }
    });

    setDevaice(newDevaice);
  }, [Categori, onvan]);

  // 📌 جستجوی دستگاه‌ها
  const SplitDevice = (e) => {
    setsearchDivice(e.target.value);
  };

  // 📌 انتخاب چک‌باکس‌ها
  const toggleDevice = (device) => {
    setSelectedDevices(
      (prev) =>
        prev.includes(device)
          ? prev.filter((d) => d !== device) // حذف اگر قبلاً انتخاب شده بود
          : [...prev, device] // اضافه کردن اگر جدید است
    );
  };

  const [openSlider, setopenSlider] = useState("max-laptop-xl:-right-64");
  const clickhanler = () => {
    if (openSlider === "max-laptop-xl:-right-64") {
      setopenSlider("max-laptop-xl:right-0");
    } else {
      setopenSlider("max-laptop-xl:-right-64");
    }
  };

  return (
    <div className="flex justify-around overflow-y-auto  items-center font-dorna ">
      {/* ✅ پنل فیلتر */}
      <div
        className={`bg-white shadow-lg  max-laptop-xl:w-60 h-[95vh] flex items-center flex-col max-laptop-xl:absolute w-[25%] ${openSlider} transition-all`}
      >
        <button
          onClick={clickhanler}
          className="p-4 hidden max-laptop-xl:flex text-3xl w-full items-center flex-row-reverse justify-start "
        >
          <span className="font-black text-xl mx-1">بستن</span><IoMdClose />
        </button>
        <h1 className="p-6 text-2xl font-extrabold w-full border-b-2 border-sky-500">
          فیلتر بر اساس مدل
        </h1>
        <input
          onChange={SplitDevice}
          value={searchDivice}
          type="text"
          className="min-h-10 m-3 bg-slate-100 rounded-full text-xl w-11/12 px-3"
          placeholder="جست و جو کنید..."
        />
        <div className="w-full overflow-y-auto">
          {devaice
            .filter((item) => item.includes(searchDivice)) // ✅ فیلتر بر اساس جستجو
            .map((item, index) => (
              <div
                key={index}
                className="flex text-neutral-500 flex-row w-full justify-between px-3 items-center py-3 border-b-2 border-gray-300"
                onClick={(e) => {
                  if (e.target.type !== "checkbox") {
                    // بررسی که روی checkbox کلیک نشده باشد
                    toggleDevice(item);
                  }
                }}
              >
               <div className="focus:bg-slate-300 w-[95%] h-[97%] rounded-full flex items-center justify-between p-2">
                <div className="flex items-center justify-center flex-row-reverse">
                  <div className="font-bold text-sm mx-2">{item}</div>
                  <input
                    type="checkbox"
                    className="size-4"
                    checked={selectedDevices.includes(item)}
                    onChange={() => toggleDevice(item)}
                    onClick={(e) => e.stopPropagation()} // جلوگیری از اجرای onClick والد هنگام کلیک روی checkbox
                  />
                </div>
                <div className="text-xl"><BiArrowToLeft /></div>
              
               </div>
              </div>
            ))}
        </div>
      </div>

      {/* ✅ محتوای اصلی */}

      <div className="w-[70%] max-laptop-xl:w-full overflow-y-auto bg-white shadow-lg h-[95vh] p-5">
        <button
          onClick={clickhanler}
          className="max-laptop-xl:flex hidden text-sky-700 text-4xl justify-end flex-row-reverse items-center  w-full justif items mb-3"
        >
          <span className="text-lg font-black mx-2">مشاهده فیلتر ها</span><BsList />
        </button>
        <div className="max-Wide-mobile-s:flex max-Wide-mobile-s:flex-wrap max-Wide-mobile-s:gap-2  max-Wide-mobile-s:flex-row max-Wide-mobile-s:justify-end ">
          {Categori.filter(
            (item) =>
              selectedDevices.length === 0 || // ✅ اگر هیچ فیلتری انتخاب نشده باشد، همه را نمایش بده
              item.devaiceOK.some((device) => selectedDevices.includes(device.name)) // ✅ بررسی اینکه حداقل یک دستگاه انتخاب شده باشد
          ).map((item, index) => (
            <div
              onClick={() => jh(item._id)}
              key={index}
              className="p-4 max-Wide-mobile-s:border-none max-Wide-mobile-s:mt-2 max-Wide-mobile-s:w-[48%] max-Wide-mobile-s:border-2 max-Wide-mobile-s:border-neutral-300 max-Wide-mobile-s:flex-col max-Wide-mobile-s:items-center max-Wide-mobile-s:justify-center border-b flex flex-row border-gray-300"
            >
              <img
                src={item.photo?.split("ph1:")[1]?.split("ph2:")[0] || ""}
                alt="img"
                className="max-Wide-mobile-s:w-[98%] max-Wide-mobile-s:h-[80%] size-60 max-Wide-mobile-s:rounded-3xl max-Wide-mobile-3xl:size-36 max-Wide-mobile-s:size-52 object-cover"
              />
              <div className="flex max-Wide-mobile-s:justify-center max-Wide-mobile-s:items-center flex-col w-full mr-2 max-Wide-mobile-s:mr-0">
                <div className="max-Wide-mobile-s:text-xs max-Wide-mobile-s:w-full max-Wide-mobile-s:flex max-Wide-mobile-s:items-center max-Wide-mobile-s:justify-center max-Wide-mobile-s:m-0 max-Wide-mobile-s:my-3 text-3xl max-Wide-mobile-3xl:text-xl text-black font-extrabold mb-2">
                  {item.onvan}
                </div>
                <div className="text-2xl max-Wide-mobile-s:hidden mb-1 max-Wide-mobile-3xl:text-lg font-bold text-neutral-400">
                  {item.categori}
                </div>
                <div className="h-[2px] max-Wide-mobile-s:hidden bg-slate-300 w-11/12"></div>

                {item.offer > 0 ? (
                  <div className="flex max-Wide-mobile-s:mt-1 max-Wide-mobile-s:items-center flex-row max-Wide-mobile-3xl:flex-col text-2xl font-extrabold text-neutral-700">
                    <div className="max-Wide-mobile-s:hidden line-through max-Wide-mobile-s:text-sm  max-Wide-mobile-s:text-neutral-400">
                      {item.money.toLocaleString()}
                      <span className="text-xl mx-1 max-Wide-mobile-s:text-sm">
                        تومان
                      </span>
                    </div>
                    <div className="text-sky-700 max-Wide-mobile-s:text-sm">
                      {(
                        Math.floor(
                          ((item.money / 100) * (100 - item.offer)) / 1000
                        ) * 1000
                      ).toLocaleString()}
                      <span className="text-xl mx-1 max-Wide-mobile-s:text-sm text-sky-700">
                        تومان
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="max-Wide-mobile-s:text-sm max-Wide-mobile-s:mt-3 flex max-Wide-mobile-s:items-center max-Wide-mobile-s:justify-center text-sky-700 font-bold text-2xl">
                    {item.money.toLocaleString()}
                    <span className="text-xl mx-1 text-sky-700 max-Wide-mobile-s:text-sm">
                      تومان
                    </span>
                  </div>
                )}

                <div className="text-neutral-600 max-Wide-mobile-3xl:text-sm max-Wide-mobile-s:hidden mt-6 font-bold text-xl">
                  {item.tozih[0]}
                </div>
                <button className="flex max-Wide-mobile-s:hidden bg-sky-600 max-Wide-mobile-s:w-11/12 text-white py-3 mt-5 w-[200px] flex-row-reverse justify-center items-center">
                  <span className="mx-3">افزودن به سبد خرید</span>
                  <span className="">
                    <FaShoppingBasket />
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>در حال بارگذاری...</div>}>
      <SearchCompone />
    </Suspense>
  );
}
