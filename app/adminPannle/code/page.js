"use client"
import apiKey from "@/app/API";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ResponsiveForm() {
  const [formOne, setFormOne] = useState({ code: "", time: "", amount: "" });
  const [formTwo, setFormTwo] = useState({
    code: "",
    cartAmount: "",
    discount: "",
    time: "",
  });

  const handleChange = (e, formSetter) => {
    const { name, value, type } = e.target;
    let newValue = value.replace(/[^0-9]/g, ""); // فقط اعداد مجاز هستند

    // محدودیت برای مقدار "time" که نباید بیشتر از 10 باشد
    if (name === "time" && newValue !== "" && parseInt(newValue) > 10) {
      newValue = "10"; // مقدار را روی 10 تنظیم می‌کند
      alert("حداکثر مقدار مجاز برای زمان 10 است!");
    }

    formSetter((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const router = useRouter();

  const one = () => {
    axios.post(apiKey.gif, {
      code: formOne.code,
      time: formOne.time,
      money: formOne.amount,
    }).then(data => {
      router.push("/adminPannle")
    })
  };

  const tow = () => {
    axios.post(apiKey.Offer, {
      code: formTwo.code,
      time: formTwo.time,
      money: formTwo.discount,
      maxShope: formTwo.cartAmount,
    }).then(data => {
      router.push("/adminPannle")
    })
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center min-h-screen p-4 gap-6">
      {/* بخش اول */}
      <div className="bg-white p-6 shadow-md rounded-xl w-full md:w-1/2">
        <h2 className="text-xl font-bold mb-4">کد هدیه</h2>
        <input
          type="text"
          name="code"
          value={formOne.code}
          onChange={(e) => handleChange(e, setFormOne)}
          placeholder="کد"
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="number"
          name="time"
          value={formOne.time}
          onChange={(e) => handleChange(e, setFormOne)}
          placeholder="زمان (حداکثر 10)"
          className="w-full p-2 border rounded mb-2"
          min="1"
          max="10"
        />
        <input
          type="number"
          name="amount"
          value={formOne.amount}
          onChange={(e) => handleChange(e, setFormOne)}
          placeholder="مقدار پول"
          className="w-full p-2 border rounded mb-2"
        />
        <button onClick={one} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          تایید
        </button>
      </div>

      {/* بخش دوم */}
      <div className="bg-white p-6 shadow-md rounded-xl w-full md:w-1/2">
        <h2 className="text-xl font-bold mb-4">کد تخفیف</h2>
        <input
          type="text"
          name="code"
          value={formTwo.code}
          onChange={(e) => handleChange(e, setFormTwo)}
          placeholder="کد"
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="number"
          name="cartAmount"
          value={formTwo.cartAmount}
          onChange={(e) => handleChange(e, setFormTwo)}
          placeholder="مقدار سبد خرید"
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="number"
          name="discount"
          value={formTwo.discount}
          onChange={(e) => handleChange(e, setFormTwo)}
          placeholder="مبلغ تخفیف"
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="number"
          name="time"
          value={formTwo.time}
          onChange={(e) => handleChange(e, setFormTwo)}
          placeholder="زمان (حداکثر 10)"
          className="w-full p-2 border rounded mb-2"
          min="1"
          max="10"
        />
        <button onClick={tow} className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
          تایید
        </button>
      </div>
    </div>
  );
}
