'use client'
import React, { useState, useRef, useEffect } from 'react';
import { BsSearch } from "react-icons/bs";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import apiKey from '@/app/API';

export default function SearchInput() {
    const [query, setQuery] = useState("");
    const [allTags, setAllTags] = useState(new Set());
    const [suggestions, setSuggestions] = useState([]);
    const inputRef = useRef(null);
    const router = useRouter();

    useEffect(() => {
        axios.get(apiKey.getitem)
            .then(response => {
                const apiData = response.data.data;
                const uniqueTags = new Set();

                apiData.forEach(item => {
                    item.tagSearch.forEach(tag => uniqueTags.add(tag));
                });

                setAllTags(uniqueTags);
            })
            .catch(error => console.error("Error fetching search results:", error));
    }, []);

    useEffect(() => {
        if (query.length > 1) {
            const filteredTags = [...allTags].filter(tag => 
                tag.toLowerCase().includes(query.toLowerCase())
            );
            setSuggestions(filteredTags);
        } else {
            setSuggestions([]);
        }
    }, [query, allTags]);

    function handleSearch(e) {
        setQuery(e.target.value);
    }

    function handleSelect(tag) {
        setQuery(tag);
        setSuggestions([]);
        router.push(`/search?query=${tag}`);
    }

    return (
        <div className="relative w-full my-6 flex justify-center flex-row">
            {/* ✅ اینپوت با طراحی ریسپانسیو */}
            <input
                ref={inputRef}
                value={query}
                onChange={handleSearch}
                placeholder="جست و جو کنید..."
                className="text-xl tablet-l:text-lg laptop-l:text-xl desktop-xl:text-2xl
                           font-dorna font-semibold pr-5 text-gray-600 bg-gray-300 
                           w-[90%] tablet-l:w-[400px] laptop-l:w-[600px] desktop-xl:w-[700px] 
                           h-12 laptop-l:h-14 desktop-xl:h-16 rounded-r-full"
                type="text"
            />

            {/* ✅ دکمه سرچ با سایز متناسب */}
            <span
                onClick={() => handleSelect(query)}
                className="bg-black text-white cursor-pointer flex justify-center items-center
                           text-3xl laptop-l:text-4xl desktop-xl:text-5xl
                           w-16 tablet-l:w-20 laptop-l:w-24 desktop-xl:w-28 
                           h-12 laptop-l:h-14 desktop-xl:h-16 rounded-l-full"
            >
                <BsSearch />
            </span>

            {/* ✅ لیست پیشنهادات */}
            {suggestions.length > 0 && (
                <ul className="absolute top-14 laptop-l:top-16 desktop-xl:top-20
                               bg-white w-[90%] tablet-l:w-[400px] laptop-l:w-[600px] desktop-xl:w-[700px]
                               border border-gray-300 rounded shadow-lg">
                    {suggestions.map((tag, index) => (
                        <li
                            key={index}
                            className="p-2 cursor-pointer hover:bg-gray-200 text-lg laptop-l:text-xl desktop-xl:text-2xl"
                            onClick={() => handleSelect(tag)}
                        >
                            {tag}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
