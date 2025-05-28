"use client";
import React, { useEffect, useState } from "react";
import apiKey from "@/app/API";
import axios from "axios";
import Link from "next/link";

export default function Page() {
  const [bascket, setBascket] = useState([]);
  const [loading, setLoading] = useState(true);

  // تابع فرمت تاریخ با فارسی سازی کامل
  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return "-";
  
    return date.toLocaleDateString("fa-IR", {
      // year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(apiKey.bascket);
        const newData = response.data.data;

        // مرتب‌سازی به نحوی که سفارشات "تمام شده" پایین‌تر باشند
        const sortedData = newData.sort((a, b) => {
          if (a.vazeiat === "تمام شده" && b.vazeiat !== "تمام شده")
            return 1;
          if (a.vazeiat !== "تمام شده" && b.vazeiat === "تمام شده")
            return -1;
          return 0;
        });

        setBascket(sortedData.reverse());
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 15000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-sky-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-8">
      <h1 className="text-3xl font-extrabold text-center mb-10 text-sky-700">
        لیست سفارشات کاربران
      </h1>

      {bascket.length === 0 && (
        <p className="text-center text-gray-600 text-xl mt-20">سبد خریدی موجود نیست.</p>
      )}

      <div className="max-w-6xl mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {bascket.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between hover:shadow-2xl transition-shadow duration-300"
          >
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-3">
                شناسه سفارش: <span className="text-sky-600">{item.shenase}</span>
              </h2>
              <p className="text-gray-600 mb-1">
                تاریخ: <span className="font-semibold">{formatDate(item.date)}</span>
              </p>
              <p className="text-gray-600 mb-1">
                وضعیت:{" "}
                <span
                  className={`font-bold ${
                    item.vazeiat === "تمام شده" ? "text-red-500" : "text-green-600"
                  }`}
                >
                  {item.vazeiat}
                </span>
              </p>
            </div>

            <Link
              href={`/adminPannle/sefaresh/informatio?id=${item._id}`}
              className="mt-6 bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 rounded-lg text-center transition-colors"
            >
              مشاهده جزئیات
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
