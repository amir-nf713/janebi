'use client'
import { useState } from 'react';

export default function FAQ() {
    const faqs = [
        { question: "چگونه می‌توانم محصولی را خریداری کنم؟", answer: "برای خرید محصول، کافیست روی آیکون سبد خرید کلیک کرده و سپس مراحل پرداخت را تکمیل کنید." },
        { question: "روش‌های پرداخت چگونه است؟", answer: "شما می‌توانید از پرداخت آنلاین و سایر روش‌های امن پرداخت استفاده کنید." },
        { question: "چگونه می‌توانم سفارشم را پیگیری کنم؟", answer: "در تلگرام به پشتیبانی پیام دهید" },
        { question: "آیا امکان بازگشت کالا وجود دارد؟", answer: "بله، در صورت وجود مشکل، شما می‌توانید طبق شرایط بازگشت کالا، آن را مرجوع کنید." }
    ];
    
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="max-w-3xl mx-auto p-5">
            <h1 className="text-3xl font-bold text-center mb-6">سوالات متداول</h1>
            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <div key={index} className="border border-gray-300 rounded-lg overflow-hidden">
                        <button
                            className="w-full text-right px-4 py-3 font-medium bg-gray-100 hover:bg-gray-200"
                            onClick={() => toggleFAQ(index)}
                        >
                            {faq.question}
                        </button>
                        {openIndex === index && (
                            <div className="px-4 py-3 bg-white text-gray-700">{faq.answer}</div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
