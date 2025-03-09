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
        <div className="p-4 h-[90vh] w-full">
            <div className="flex justify-center">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearch}
                    placeholder="جستجو کنید..."
                    className="w-full max-w-2xl p-3 border border-gray-300 rounded-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
                />
            </div>

            <div className="w-full mt-6 overflow-y-auto max-Wide-mobile-s:justify-evenly flex flex-row justify-center flex-wrap">
                {tagSearchResults.map((item, index) => (
                    <div key={index} className="flex flex-wrap justify-center items-center">
                         <ItemSerrc
                            key={index}
                            img={item.photo?.split("ph1:")[1]?.split("ph2:")[0] || ""}
                            categori={item.categori}
                            onvan={item.onvan}
                            off={item.offer}
                            money={item.money}
                            id={item._id}
                          />
                     
                         <ItemSerrc
                            key={index}
                            img={item.photo?.split("ph1:")[1]?.split("ph2:")[0] || ""}
                            categori={item.categori}
                            onvan={item.onvan}
                            off={item.offer}
                            money={item.money}
                            id={item._id}
                          />
                     
                         <ItemSerrc
                            key={index}
                            img={item.photo?.split("ph1:")[1]?.split("ph2:")[0] || ""}
                            categori={item.categori}
                            onvan={item.onvan}
                            off={item.offer}
                            money={item.money}
                            id={item._id}
                          />
                     
                         <ItemSerrc
                            key={index}
                            img={item.photo?.split("ph1:")[1]?.split("ph2:")[0] || ""}
                            categori={item.categori}
                            onvan={item.onvan}
                            off={item.offer}
                            money={item.money}
                            id={item._id}
                          />
                     
                         <ItemSerrc
                            key={index}
                            img={item.photo?.split("ph1:")[1]?.split("ph2:")[0] || ""}
                            categori={item.categori}
                            onvan={item.onvan}
                            off={item.offer}
                            money={item.money}
                            id={item._id}
                          />
                     
                         <ItemSerrc
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
