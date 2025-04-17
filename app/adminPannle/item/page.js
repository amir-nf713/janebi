"use client";
import apiKey from '@/app/API';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { GoPlus } from "react-icons/go";
import { FaTrashAlt } from "react-icons/fa";
import { GrClose } from "react-icons/gr";

export default function Page() {
    const [Kala, setKala] = useState([]);
    const [Categori, setCategori] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [formData, setFormData] = useState({
        money: 0,
        offer: 0,
        stock: {}
    });

    // Fetch items and categories on mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [itemsRes, categoriesRes] = await Promise.all([
                    axios.get(apiKey.getitem),
                    axios.get(apiKey.getCategori)
                ]);
                setKala(itemsRes.data.data);
                setCategori(categoriesRes.data.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const deleteItem = async (id) => {
        if (window.confirm("آیا از حذف این آیتم مطمئن هستید؟")) {
            try {
                await axios.delete(`${apiKey.deleteItem}/${id}`);
                setKala(prev => prev.filter(item => item._id !== id));
            } catch (error) {
                console.error("Error deleting item:", error);
            }
        }
    };

    const deleteCategori = async (id) => {
        if (window.confirm("آیا از حذف این دسته بندی مطمئن هستید؟")) {
            try {
                await axios.delete(`${apiKey.deleteCategori}/${id}`);
                setCategori(prev => prev.filter(cat => cat._id !== id));
            } catch (error) {
                console.error("Error deleting category:", error);
            }
        }
    };

    const openEditModal = async (id) => {
        setIsLoading(true);
        try {
            const { data } = await axios.get(`${apiKey.getoneitem}/${id}`);
            setSelectedItem(data.data);
            
            // Initialize stock data
            const stockData = {};
            
            data.data.devaiceOK?.forEach(device => {
                device.mojodi?.forEach(stock => {
                    stockData[`${device.name}_${stock.color}`] = stock.quantity;
                });
            });

            setFormData({
                money: data.data.money,
                offer: data.data.offer,
                stock: stockData
            });
            setIsModalOpen(true);
        } catch (error) {
            console.error("Error fetching item details:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: Number(value)
        }));
    };

    const handleStockChange = (key, value) => {
        setFormData(prev => ({
            ...prev,
            stock: {
                ...prev.stock,
                [key]: Number(value)
            }
        }));
    };
    console.log(formData.stock);

    const handleSubmit = async (e) => {
       
        
        e.preventDefault();
        if (!selectedItem) return;
        
        setIsLoading(true);
        try {
            // Prepare data for server
            const updatedData = {
                money: formData.money,
                offer: formData.offer,
                devaiceOK: selectedItem.devaiceOK.map(device => ({
                    name: device.name,
                    mojodi: selectedItem.color.map(color => (
                       
                         formData.stock[`${device.name}_${color}`] || 0
                    ))
                }))
            };

            await axios.put(`${apiKey.updateItem}/${selectedItem._id}`, updatedData);
            
            // Update local state
            setKala(prev => prev.map(item => 
                item._id === selectedItem._id ? { ...item, ...updatedData } : item
            ));
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error updating item:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const filteredKala = Kala.filter(item => 
        item.onvan?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const changeData = async (e) => {
        e.preventDefault();
        if (!selectedItem) return;
        
        setIsLoading(true);
        try {
            // آماده کردن داده برای ارسال به سرور
            const updatedData = {
                money: formData.money,
                offer: formData.offer,
                devaiceOK: selectedItem.devaiceOK.map(device => ({
                    name: device.name,
                    mojodi: selectedItem.color.map(color => (
                        
                         formData.stock[`${device.name}_${color}`] || 0
                    ))
                }))
            };
    
            // ارسال درخواست PUT به API
            const response = await axios.put(
                `${apiKey.getitem}/${selectedItem._id}`,
                updatedData,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
    
            // بررسی موفقیت آمیز بودن درخواست
            if (response.status === 200) {
                // به روزرسانی حالت محلی
                setKala(prev => prev.map(item => 
                    item._id === selectedItem._id ? { ...item, ...updatedData } : item
                ));
                setIsModalOpen(false);
                alert('تغییرات با موفقیت ذخیره شدند');
            } else {
                throw new Error('خطا در ذخیره تغییرات');
            }
        } catch (error) {
            console.error("Error updating item:", error);
            alert('خطا در ذخیره تغییرات: ' + error.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className='flex font-dorna flex-wrap justify-evenly'>
            {/* Categories Section */}
            <div className="h-[90vh] mt-3 flex flex-col items-center w-[594px] bg-white">
                <Link href={'/adminPannle/item/addcategor'} className="w-[90%] h-9 top-3 bg-sky-600 text-white mt-3 rounded-full text-2xl font-extrabold flex justify-center items-center">
                    <GoPlus />
                </Link>
                <div className="w-full flex flex-col items-center">
                    {Categori.length === 0 ? (
                        <p>در حال بارگذاری...</p>
                    ) : (
                        <div className='w-full flex flex-row justify-evenly items-center flex-wrap'>
                            {Categori.map((item) => (
                                <div key={item._id} className="flex flex-col justify-between items-center my-1 w-[30%] bg-slate-200 p-3">
                                    <img className='h-[90%] rounded-lg w-full' src={item.picture} alt={item.onvan} />
                                    <div className="h-[90%] w-full mt-3 flex justify-center items-center">{item.onvan}</div>
                                    <button onClick={() => deleteCategori(item._id)} className="text-3xl text-red-500 hover:text-red-700">
                                        <FaTrashAlt />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Items Section */}
            <div className="h-[90vh] flex flex-col mt-3 items-center w-[1287px] bg-white">
                <Link href={'/adminPannle/item/additem'} className="w-[90%] h-9 top-3 bg-sky-600 text-white mt-3 rounded-full text-2xl font-extrabold flex justify-center items-center">
                    <GoPlus />
                </Link>
                <div className="w-full flex flex-col items-center">
                    <input 
                        type="text" 
                        placeholder='جستوجو کنید' 
                        className='p-4 w-11/12 rounded-full h-12 mt-3 bg-slate-200' 
                        value={searchTerm}
                        onChange={handleSearch}
                    />

                    <div className="w-full h-[700px] overflow-y-auto my-2">
                        {filteredKala.length === 0 ? (
                            <p className="text-center text-gray-500">موردی یافت نشد.</p>
                        ) : (
                            <div className=''>
                                {filteredKala.map((item) => (
                                    <div key={item._id} className="flex max-tablet-l:flex-col justify-between my-1 w-full border-b pb-4">
                                        <div className="flex flex-col">
                                            <div className="flex max-mobile-xl:flex-col justify-center items-center">
                                                <img 
                                                    className='size-52 ml-4' 
                                                    src={item.photo?.split("ph1:")[1]?.split("ph2:")[0] || ""} 
                                                    alt={item.onvan} 
                                                />
                                                <div className="flex flex-col">
                                                    <p className="text-4xl font-extrabold">{item.onvan}</p>
                                                    <p className="text-slate-500 text-2xl font-extrabold">{item.categori}</p>
                                                    <p className="text-slate-500 font-extrabold text-lg">{item.tozih?.[0]}</p>
                                                </div>
                                            </div>
                                            <div className="flex flex-row mr-7">
                                                {item.color?.map((color, index) => (
                                                    <div key={index} className="m-1 size-10 rounded-full border-4 border-black" style={{ backgroundColor: color }} />
                                                ))}
                                            </div>
                                        </div>
                                        <div className="ml-10 flex flex-col mt-11">
                                            <div className="flex max-mobile-xl:flex-col">
                                                <p className="font-extrabold mr-4 text-2xl text-slate-500 line-through">
                                                    {item.money.toLocaleString()} تومان
                                                </p>   
                                                <p className="font-extrabold text-4xl">
                                                    {Math.floor(((item.money / 100) * (100 - item.offer) / 1000) * 1000).toLocaleString()} تومان
                                                </p>   
                                            </div>
                                            <div className="flex flex-row-reverse mt-11">
                                                <button 
                                                    onClick={() => deleteItem(item._id)} 
                                                    className="mr-4 text-3xl text-red-500 hover:text-red-700"
                                                >
                                                    <FaTrashAlt />
                                                </button>
                                                <button 
                                                    onClick={() => openEditModal(item._id)} 
                                                    className="mr-4 font-bold text-3xl bg-slate-300 px-3 py-1 rounded-full hover:bg-slate-400"
                                                >
                                                    تغیر موجودی
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

            {/* Edit Modal */}
            {isModalOpen && selectedItem && (
                <div className="fixed inset-0 flex justify-center items-center bg-black/40 backdrop-blur-lg z-50">
                    <div className="bg-white w-11/12 md:w-3/5 h-[70vh] rounded-lg p-4 overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold">ویرایش محصول: {selectedItem.onvan}</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-2xl">
                                <GrClose />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* قیمت و تخفیف */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xl mb-2">قیمت (تومان):</label>
                                    <input 
                                        type="number" 
                                        name="money"
                                        value={formData.money}
                                        onChange={handleFormChange}
                                        className='w-full p-3 bg-slate-200 rounded'
                                    />
                                </div>
                                <div>
                                    <label className="block text-xl mb-2">تخفیف (%):</label>
                                    <input 
                                        type="number" 
                                        name="offer"
                                        value={formData.offer}
                                        onChange={handleFormChange}
                                        min="0"
                                        max="100"
                                        className='w-full p-3 bg-slate-200 rounded'
                                    />
                                </div>
                            </div>

                            {/* موجودی دستگاه‌ها و رنگ‌ها */}
                            <div className="space-y-6">
                                <h3 className="text-xl font-bold">موجودی دستگاه‌ها و رنگ‌ها:</h3>
                                
                                {selectedItem.devaiceOK?.map((device, deviceIndex) => (
                                    <div key={deviceIndex} className="bg-gray-100 p-4 rounded-lg">
                                        <h4 className="font-semibold text-lg mb-3">{device.name}</h4>
                                        
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                            {selectedItem.color?.map((color, colorIndex) => {
                                                // پیدا کردن مقدار موجودی برای این رنگ و دستگاه
                                                const stockItem = device.mojodi?.find(item => item.color === color);
                                                const initialValue = stockItem?.quantity || 0;
                                                const inputKey = `${device.name}_${color}`;

                                                return (
                                                    <div key={colorIndex} className="flex items-center space-x-3 bg-white p-3 rounded">
                                                        <div 
                                                            className="size-8 rounded-full border-2 border-black flex-shrink-0"
                                                            style={{ backgroundColor: color }}
                                                        />
                                                        <input
                                                            type="number"
                                                            value={formData.stock[inputKey] ?? initialValue}
                                                            onChange={(e) => handleStockChange(inputKey, e.target.value)}
                                                            className="bg-slate-200 h-10 w-24 rounded px-2"
                                                            min="0"
                                                        />
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button 
                                type="submit" 
                                disabled={isLoading}
                                onClick={changeData}
                                className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                            >
                                {isLoading ? 'در حال ذخیره...' : 'ذخیره تغییرات'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}