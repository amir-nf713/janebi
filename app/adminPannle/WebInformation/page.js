'use client';
import apiKey from '@/app/API';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ContactForm() {
    const [formData, setFormData] = useState({
        telegram: '',
        whatsapp: '',
        instagram: '',
        amount: 0
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'amount' && isNaN(value)) return; // مقدار پول فقط عدد بگیرد
        setFormData({ ...formData, [name]: value });
    };

    const router = useRouter()

    const sub = () => {
        axios.put(apiKey.Web,{
            instagram : formData.instagram,
            telegram : formData.telegram,
            wahtsapp : formData.wahtsapp,
            monyDavat : formData.amount,
        }).then(data => {
             router.push("/adminPannle")
        })
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-5 bg-gray-100">
            <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">فرم اطلاعات</h2>
                <input 
                    type="text" 
                    name="telegram" 
                    value={formData.telegram} 
                    onChange={handleChange} 
                    placeholder="تلگرام"
                    className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input 
                    type="text" 
                    name="whatsapp" 
                    value={formData.whatsapp} 
                    onChange={handleChange} 
                    placeholder="واتساپ"
                    className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <input 
                    type="text" 
                    name="instagram" 
                    value={formData.instagram} 
                    onChange={handleChange} 
                    placeholder="اینستاگرام"
                    className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                <input 
                    type="text" 
                    name="amount" 
                    value={formData.amount} 
                    onChange={handleChange} 
                    placeholder="مقدار پول"
                    className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                <button onClick={sub} className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">ذخیره</button>
            </div>
        </div>
    );
}
