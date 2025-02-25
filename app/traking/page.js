"use client";
import { FaTelegram } from "react-icons/fa";

export default function TrackingOrder() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900 font-dorna">
      {/* ✅ هدر صفحه */}
      <h1 className="text-4xl font-extrabold text-blue-700">پیگیری سفارش</h1>
      <p className="text-lg mt-2">برای پیگیری سفارش، لطفاً با پشتیبانی تلگرام در تماس باشید.</p>

      {/* ✅ دکمه هدایت به تلگرام */}
      <a
        href="" // ❗ لینک تلگرام خود را جایگزین کنید
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 flex items-center px-6 py-3 bg-blue-500 text-white rounded-full text-xl font-bold shadow-lg hover:bg-blue-600 transition-all"
      >
        <FaTelegram className="text-3xl ml-3" />
        پیگیری در تلگرام
      </a>
    </div>
  );
}
