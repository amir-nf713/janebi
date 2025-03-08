'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import axios from 'axios';
import React, { useEffect, useState, Suspense } from 'react';
import apiKey from '../API';
import Items from '../line-item/Item';

function SearchComponent() {
    const [tagSearchResults, setTagSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState(""); 
    const searchParams = useSearchParams();
    const router = useRouter();
    const query = searchParams.get("query");

    useEffect(() => {
        if (!query) return;
        setSearchQuery(query);

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

    const handleSearch = (e) => { 
        setSearchQuery(e.target.value);
        router.push(`/search?query=${e.target.value}`); 
    };

    return (
        <div className="p-4">
            <div className="flex justify-center mb-6">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearch}
                    placeholder="جستجو کنید..."
                    className="w-full max-w-2xl p-3 border border-gray-300 rounded-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
                />
            </div>

            <div className="w-full flex flex-row justify-center flex-wrap">
                {tagSearchResults.map((item, index) => (
                    <div key={index} className="flex justify-center mt-4 items-center">
                         <Items
                            key={index}
                            img={item.photo?.split("ph1:")[1]?.split("ph2:")[0] || ""}
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

// ⬇️ اینجا `<Suspense>` اضافه شده
export default function Page() {
    return (
        <Suspense fallback={<div>در حال بارگذاری...</div>}>
            <SearchComponent />
        </Suspense>
    );
}
