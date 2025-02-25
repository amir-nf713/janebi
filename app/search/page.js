'use client'
import { useSearchParams, useRouter } from 'next/navigation';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import apiKey from '../API';
import Items from '../line-item/Item';

export default function Page() {
    const [tagSearchResults, setTagSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState(""); // مقدار ورودی کاربر
    const searchParams = useSearchParams();
    const router = useRouter();
    const query = searchParams.get("query"); // مقدار `query` از URL دریافت می‌شود

    useEffect(() => {
        if (!query) return;
        setSearchQuery(query); // مقدار اولیه را تنظیم کن

        axios.get(apiKey.getitem)
            .then(response => {
                if (response.data.data) {
                    const filteredTags = response.data.data.filter(item =>
                        item.tagSearch.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
                    );
                    setTagSearchResults(filteredTags);
                }
            })
            .catch(error => console.error("Error fetching data:", error));
    }, [query]);

    // تابع برای مدیریت جستجو
    const handleSearch = (e) => { // 🔹 اینجا TypeScript را حذف کردم
        setSearchQuery(e.target.value);
        router.push(`/search?query=${e.target.value}`); // مقدار جدید را در URL تنظیم کن
    };

    return (
        <div className="p-4">
            {/* 🔍 اینپوت جستجو */}
            <div className="flex justify-center mb-6">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearch}
                    placeholder="جستجو کنید..."
                    className="w-full max-w-2xl p-3 border border-gray-300 rounded-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
                />
            </div>

            {/* 📝 نمایش نتایج جستجو */}
            <div className="w-full flex flex-row justify-center flex-wrap">
                {tagSearchResults.map((item, index) => (
                    <div key={index} className="flex justify-center mt-4 items-center">
                         <Items
                            key={index}
                            img={item.photo}
                            categori={item.categori}
                            onvan={item.onvan}
                            off={item.offer}
                            money={item.money}
                            id={item._id}
                          />
                    </div>
                ))}
            </div>
        </div>
    );
}
