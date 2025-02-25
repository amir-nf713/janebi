'use client';
import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';

export default function BuyGuide() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100 font-dorna">
            <div className="max-w-3xl w-full bg-white shadow-lg rounded-2xl p-6">
                <h1 className="text-3xl font-bold text-center mb-6">راهنمای خرید از فروشگاه</h1>
                
                <p className="text-lg text-gray-700 mb-4">برای خرید محصول موردنظر خود، کافیست مراحل زیر را دنبال کنید:</p>
                
                <ol className="list-decimal list-inside text-lg text-gray-800 space-y-3">
                    <li>محصول موردنظر خود را در فروشگاه جستجو کنید.</li>
                    <li>روی <span className="font-bold">آیکون سبد خرید</span> <FaShoppingCart className="inline text-blue-600" /> کلیک کنید تا به سبد خرید اضافه شود.</li>
                    <li>پس از افزودن محصولات به سبد خرید، وارد صفحه سبد خرید شوید.</li>
                    <li>مشخصات سفارش خود را بررسی کرده و روی گزینه "تکمیل خرید" کلیک کنید.</li>
                    <li>اطلاعات پرداخت و ارسال را وارد کرده و سفارش خود را نهایی کنید.</li>
                </ol>
                
                <div className="mt-6 text-center">
                    <p className="text-lg">برای هرگونه سوال یا راهنمایی بیشتر، با پشتیبانی تماس بگیرید.</p>
                </div>
            </div>
        </div>
    );
}
