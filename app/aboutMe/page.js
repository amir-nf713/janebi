"use client";
import Image from "next/image";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center text-gray-900 font-dorna">
      {/* ✅ هدر صفحه */}
      <header className="w-full bg-blue-600 py-12 text-white text-center">
        <h1 className="text-4xl font-extrabold">درباره ما</h1>
        <p className="text-lg mt-2">ما چه کسی هستیم و چه کاری انجام می‌دهیم؟</p>
      </header>

      {/* ✅ بخش معرفی */}
      <section className="max-w-4xl px-6 text-center my-10">
        <h2 className="text-3xl font-bold text-blue-700">ماموریت ما</h2>
        <p className="mt-4 text-lg leading-relaxed">
          ما در تلاشیم تا بهترین خدمات و محصولات را برای مشتریان خود فراهم کنیم. با سال‌ها تجربه در صنعت، ما متعهد به کیفیت، نوآوری و رضایت مشتریان هستیم.
        </p>
      </section>

      {/* ✅ تیم ما */}
      <section className="w-full max-w-5xl px-6 py-10">
        <h2 className="text-3xl font-bold text-center text-blue-700">تیم ما</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
          {/* 📌 اعضای تیم */}
          {[
            { name: "علیرضا محمودی", role: "مدیر عامل", image: "/team1.jpg" },
           
          ].map((member, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-6 text-center">
             
              <h3 className="text-xl font-semibold mt-4">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
