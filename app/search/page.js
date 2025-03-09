'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import axios from 'axios';
import React, { useEffect, useState, Suspense } from 'react';
import apiKey from '../API';
import ItemSerrc from '../Itemserach/ItemSearch';

function SearchComponent() {
    const [tagSearchResults, setTagSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState(""); 
    const searchParams = useSearchParams();
    const router = useRouter();
    
    // مقدار اولیه query را `null` بگذاریم
    const [query, setQuery] = useState(null);

    useEffect(() => {
        // فقط در کلاینت مقدار query را از URL بگیر
        setQuery(searchParams.get("query") || "");

    }, [searchParams]);

    useEffect(() => {
        if (query === null) return;

        if (query === "") {
            axios.get(apiKey.getitem)
                .then(response => {
                    if (response.data.data) {
                        setTagSearchResults(response.data.data); // اصلاح این بخش
                    }
                })
                .catch(error => console.error("Error fetching data:", error));
            return;
        }

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
        <div className="p-4 h-[79.6vh] w-full">
            <div className="flex justify-center">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearch}
                    placeholder="جستجو کنید..."
                    className="w-full max-w-2xl p-3 border border-gray-300 rounded-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
                />
            </div>

            <div className="w-full h-[98%] mt-3 overflow-y-auto max-Wide-mobile-s:justify-evenly flex flex-row justify-center flex-wrap">
                {tagSearchResults.map((item, index) => (
                    <ItemSerrc
                        key={index}
                        img={item.photo?.split("ph1:")[1]?.split("ph2:")[0] || ""}
                        categori={item.categori}
                        onvan={item.onvan}
                        off={item.offer}
                        money={item.money}
                        id={item._id}
                    />
                ))}
            </div>
        </div>
    );
}

// ⬇️ اینجا `<Suspense>` دیگر لازم نیست
export default SearchComponent;
