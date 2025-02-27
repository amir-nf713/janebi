'use client'
import axios from 'axios';
import React, { Suspense, useEffect, useState } from 'react'
import apiKey from '../API';
import { useSearchParams } from 'next/navigation';
import { FaShoppingBasket } from "react-icons/fa";
import { FaFilter } from "react-icons/fa";
import { TbFilterOff } from "react-icons/tb";
import { useRouter } from 'next/navigation';



function SearchCompone() {
     const router = useRouter()
    const jh = (e) => {
        router.push(`/sellItem?id=${e}`)
    }
    const sParams = useSearchParams();
    const onvan = sParams.get("onvan");

    const [Categori, setCategori] = useState([]);
    const [devaice, setDevaice] = useState([]);
    const [searchDivice, setsearchDivice] = useState("");
    const [selectedDevices, setSelectedDevices] = useState([]); // ✅ ذخیره موارد انتخاب‌شده

    // 📌 گرفتن داده‌های دسته‌بندی
    useEffect(() => {
        axios.get(apiKey.getitem)
            .then(response => {
                if (response.data.data) {
                    setCategori(response.data.data);
                }
            })
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    // 📌 فیلتر کردن و ذخیره دستگاه‌ها
    useEffect(() => {
        const newDevaice = [];

        Categori.forEach((item) => {
            if (item.categori === onvan) {
                item.devaiceOK.forEach((device) => {
                    if (!newDevaice.includes(device)) {
                        newDevaice.push(device);
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
        setSelectedDevices(prev =>
            prev.includes(device)
                ? prev.filter(d => d !== device) // حذف اگر قبلاً انتخاب شده بود
                : [...prev, device] // اضافه کردن اگر جدید است
        );
    };

    const [openSlider, setopenSlider] = useState("max-laptop-xl:-right-64")
    const clickhanler = () => {
        if (openSlider === "max-laptop-xl:-right-64") {
            setopenSlider("max-laptop-xl:right-0")
        }else {
            setopenSlider( "max-laptop-xl:-right-64")
        }
        
    }

    return (
        <div className='flex justify-around overflow-y-auto items-center font-dorna '>
            {/* ✅ پنل فیلتر */}
            <div className={`bg-white shadow-lg max-laptop-xl:w-60 h-[97vh] flex items-center flex-col max-laptop-xl:absolute w-[25%] ${openSlider} transition-all`}>
                <button onClick={clickhanler} className='m-4 text-3xl flex w-full items-end justify-end '><TbFilterOff /></button>
                <h1 className="p-6 text-2xl font-extrabold w-full border-b-2 border-sky-500">فیلتر بر اساس مدل</h1>
                <input
                    onChange={SplitDevice}
                    value={searchDivice}
                    type="text"
                    className='h-16 mt-3 bg-slate-100 rounded-full text-xl w-11/12 px-3'
                    placeholder='جست و جو کنید...'
                />
                {
                    devaice
                        .filter(item => item.includes(searchDivice)) // ✅ فیلتر بر اساس جستجو
                        .map((item, index) => (
                            <div key={index} className='flex flex-row-reverse w-full justify-between px-3 items-center py-4 border-b-2 border-gray-300'>
                                <div className="font-extrabold text-xl">{item}</div>
                                <input
                                    type="checkbox"
                                    className='size-5'
                                    checked={selectedDevices.includes(item)}
                                    onChange={() => toggleDevice(item)}
                                />
                            </div>
                        ))
                }
            </div>

            {/* ✅ محتوای اصلی */}

             

            <div className="w-[70%] max-laptop-xl:w-full overflow-y-auto bg-white shadow-lg h-[97vh] p-5">
            <button onClick={clickhanler} className='max-laptop-xl:flex hidden text-sky-500 text-4xl  w-full justif items'><FaFilter /></button>
                {Categori.filter(item =>
                    selectedDevices.length === 0 || // ✅ اگر هیچ فیلتری انتخاب نشده باشد، همه را نمایش بده
                    item.devaiceOK.some(device => selectedDevices.includes(device)) // ✅ بررسی اینکه حداقل یک دستگاه انتخاب شده باشد
                ).map((item, index) => (
                    <div key={index} className="p-4 max-Wide-mobile-s:flex-col border-b flex flex-row border-gray-300">
                        <img src={item.photo} alt="img" className="size-60 max-Wide-mobile-3xl:size-36 max-Wide-mobile-s:size-52 object-cover" />
                        <div className="flex flex-col w-full mr-2">
                            <div className="text-3xl max-Wide-mobile-3xl:text-xl text-black font-extrabold mb-2">{item.onvan}</div>
                            <div className="text-2xl mb-1 max-Wide-mobile-3xl:text-lg font-bold text-neutral-400">{item.categori}</div>
                            <div className="h-[2px] bg-slate-300 w-11/12"></div>
                            

                                {
                                    item.offer > 0 ? (
                                        <div className='flex items-center flex-row max-Wide-mobile-3xl:flex-col text-2xl font-extrabold text-neutral-700'>
                                          <div className=" line-through">
                                            {(item.money).toLocaleString()}
                                            <span className='text-xl mx-1'>تومان</span>
                                            </div>
                                          <div className="text-sky-700">
                                            {(Math.floor((item.money/100) * (100 - item.offer) / 1000) * 1000).toLocaleString()}
                                                <span className='text-xl mx-1 text-sky-700'>تومان</span>
                                            </div>
                                        </div>
                                    ):(
                                        <div className="text-sky-700 font-bold text-2xl">
                                            {(item.money).toLocaleString()}
                                           <span className='text-xl mx-1 text-sky-700'>تومان</span>
                                        </div>
                                    )
                                }
                                
                            
                            <div className="text-neutral-600 max-Wide-mobile-3xl:text-sm max-Wide-mobile-s:hidden mt-6 font-bold text-xl">{item.tozih[0]}</div>
                            <button onClick={() => jh(item._id)} className="flex bg-sky-600 max-Wide-mobile-s:w-11/12 text-white py-3 mt-5 w-[200px] flex-row-reverse justify-center items-center">
                                <span className="mx-3">افزودن به سبد خرید</span>
                                <span className=""><FaShoppingBasket /></span>
                            </button>
                        </div>
                    </div>
                ))}
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
