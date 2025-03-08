"use client";
import apiKey from '@/app/API';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { GoPlus } from "react-icons/go";
import { FaTrashAlt } from "react-icons/fa";

export default function Page() {
    const [Kala, setKala] = useState([]);
    const [Categori, setCategori] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        axios.get(apiKey.getitem)
            .then(data => setKala(data.data.data))
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    useEffect(() => {
        axios.get(apiKey.getCategori)
            .then(data => setCategori(data.data.data))
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    function deleteItem(e) {
        axios.delete(`${apiKey.deleteItem}/${e}`)
            .then(() => window.location.reload())
            .catch(error => console.error("Error deleting item:", error));
    }

    function deleteCategori(e) {
        axios.delete(`${apiKey.deleteCategori}/${e}`)
            .then(() => window.location.reload())
            .catch(error => console.error("Error deleting category:", error));
    }

    const filteredKala = Kala.filter(item => 
        item.onvan.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='flex font-dorna flex-wrap justify-evenly'>
            {/* بخش دسته‌بندی‌ها */}
            <div className="h-[90vh] mt-3 flex flex-col items-center w-[594px] bg-white">
                <Link href={'/adminPannle/item/addcategor'} className="w-[90%] h-9 top-3 bg-sky-600 text-white mt-3 rounded-full text-2xl font-extrabold flex justify-center items-center">
                    <GoPlus />
                </Link>
                <div className="w-full flex flex-col items-center">
                    <div className="w-full my-2">
                        {Categori.length === 0 ? (
                            <p>در حال بارگذاری...</p>
                        ) : (
                            <div className='w-full flex flex-row justify-evenly items-center flex-wrap'>
                                {Categori.map((item, index) => (
                                    <div key={index} className="flex flex-col justify-between items-center my-1 w-[30%] bg-slate-200 p-3">
                                        <img className='h-[90%] rounded-lg w-full' src={item.picture} alt="img" />
                                        <div className="h-[90%] w-full mt-3 flex justify-center items-center">{item.onvan}</div>
                                        <button onClick={() => deleteCategori(item._id)} className="text-3xl">
                                            <FaTrashAlt />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* بخش کالاها */}
            <div className="h-[90vh] flex flex-col mt-3 items-center w-[1287px] bg-white">
                <Link href={'/adminPannle/item/additem'} className="w-[90%] h-9 top-3 bg-sky-600 text-white mt-3 rounded-full text-2xl font-extrabold flex justify-center items-center">
                    <GoPlus />
                </Link>
                <div className="w-full flex flex-col items-center">
                    {/* جعبه جستجو */}
                    <input 
                        type="text" 
                        placeholder='جستوجو کنید' 
                        className='p-4 w-11/12 rounded-full h-12 mt-3 bg-slate-200' 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    {/* نمایش کالاها */}
                    <div className="w-full h-[700px] overflow-y-auto my-2">
                        {filteredKala.length === 0 ? (
                            <p className="text-center text-gray-500">موردی یافت نشد.</p>
                        ) : (
                            <div className=''>
                                {filteredKala.map((item, index) => (
                                    <div key={index} className="flex max-tablet-l:flex-col justify-between my-1 w-full">
                                        <div className="flex flex-col">
                                            <div className="flex max-mobile-xl:flex-col justify-center items-center">
                                            <img className='size-52 ml-4' src={item.photo?.split("ph1:")[1]?.split("ph2:")[0] || ""} alt="image" />

                                                <div className="flex flex-col">
                                                    <p className="text-4xl font-extrabold">{item.onvan}</p>
                                                    <p className="text-slate-500 text-2xl font-extrabold">{item.categori}</p>
                                                    <p className="text-slate-500 font-extrabold text-lg">{item.tozih[0]}</p>
                                                </div>
                                            </div>
                                            <div className="flex flex-row mr-7">
                                                {item.color.map((color, index) => (
                                                    <div key={index} className="m-1 size-10 rounded-full border-4 border-black" style={{ backgroundColor: color }}>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="ml-10 flex flex-col mt-11">
                                            <div className="flex max-mobile-xl:flex-col">
                                                <p className="font-extrabold mr-4 text-2xl text-slate-500 line-through">
                                                    {item.money}<span className="">تومان</span>
                                                </p>   
                                                <p className="font-extrabold text-4xl">
                                                    {Math.floor((item.money / 100) * (100 - item.offer) / 1000) * 1000} <span className="">تومان</span>
                                                </p>   
                                            </div>
                                            <div className="flex flex-row-reverse mt-11">
                                                <button onClick={() => deleteItem(item._id)} className="mr-4 text-3xl">
                                                    <FaTrashAlt />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
