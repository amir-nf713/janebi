'use client';

import React from 'react';
import Link from 'next/link';
import { FaPhone, FaTelegramPlane, FaWhatsapp } from 'react-icons/fa';

export default function ReturnPolicy() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100 font-dorna">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-2xl w-full text-center">
        <h1 className="text-3xl font-bold text-blue-800 mb-4">رویه بازگردانی کالا</h1>
        <p className="text-gray-700 mb-6 text-lg">
          اگر از خرید خود راضی نیستید یا محصول دریافتی دارای مشکل است، می‌توانید آن را بازگردانی کنید. لطفاً مراحل زیر را دنبال کنید:
        </p>

        <ul className="text-gray-700 text-right list-disc pr-6 space-y-2 mb-6">
          <li><strong>تماس با پشتیبانی:</strong> ابتدا مشکل خود را به تیم پشتیبانی اطلاع دهید.</li>
          <li><strong>هماهنگی برای ارسال پیک:</strong> پس از تایید پشتیبانی، پیک به آدرس شما ارسال می‌شود.</li>
          <li><strong>تحویل کالا به پیک:</strong> محصول را بدون آسیب‌دیدگی و در بسته‌بندی اصلی تحویل دهید.</li>
          <li><strong>بازگشت وجه یا تعویض کالا:</strong> پس از بررسی کالا، مبلغ شما بازگردانده می‌شود یا کالای جدید ارسال خواهد شد.</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-800 mb-3">ارتباط با پشتیبانی</h2>
        <div className="flex justify-center space-x-6">
          <Link href="tel:09140173808" className="text-blue-800 text-3xl hover:text-blue-600">
            <FaPhone />
          </Link>
        </div>
      </div>
    </div>
  );
}
