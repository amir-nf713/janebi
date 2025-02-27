"use client";
import axios from "axios";
import React, { Suspense, useEffect, useState } from "react";
import apiKey from "../API";
import Cookies from "js-cookie";
import { useRouter, useSearchParams } from "next/navigation";

function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = Cookies.get("id");

  // اگر کاربر لاگین نباشد، به صفحه لاگین هدایت شود
  useEffect(() => {
    if (!id) {
      router.push("/login");
    }
  }, [id, router]);

  const [subt, setSubt] = useState("تکمیل خرید");
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    city: "",
    province: "",
    postalCode: "",
    address: "",
    paymentMethod: "wallet", // wallet or gateway
  });

  // دریافت اطلاعات کاربر
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${apiKey.getOneUser}/${id}`);
        setUser(response.data.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchUser();
    }
  }, [id]);

  // دریافت آیتم‌های سبد خرید
  useEffect(() => {
    const items = Cookies.get("cart");
    setCartItems(items ? JSON.parse(items) : []);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const amount = searchParams.get("amount");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubt("در حال پردازش...");

    try {
      const response = await axios.post(apiKey.bascket, {
        value: cartItems,
        name: `${formData.firstName} ${formData.lastName}`,
        shahr: formData.city,
        ostan: formData.province,
        phoneNumber: user?.phoneNumber,
        address: formData.address,
        postCode: formData.postalCode,
        userId: id,
        money: amount,
      });

      if (response.status === 200) {
        setSubt("پرداخت موفق");
        router.push("/success"); // هدایت به صفحه موفقیت
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      setSubt("خطا در پرداخت");
    }
  };

  if (loading) {
    return <div className="text-center text-2xl">در حال بارگذاری...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center p-5">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-blue-900 mb-8 text-center">
          تکمیل اطلاعات خرید
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* نام و نام خانوادگی */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                نام
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                نام خانوادگی
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          {/* شهر و استان */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                شهر
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                استان
              </label>
              <input
                type="text"
                name="province"
                value={formData.province}
                onChange={handleInputChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          {/* کد پستی و آدرس */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                کد پستی
              </label>
              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleInputChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                آدرس
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          {/* انتخاب روش پرداخت */}
          <div className="mt-8">
            <label className="block text-sm font-medium text-gray-700 mb-4">
              روش پرداخت
            </label>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({ ...prev, paymentMethod: "wallet" }))
                }
                className={`flex-1 py-3 px-6 rounded-lg shadow-sm text-center ${
                  formData.paymentMethod === "wallet"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-blue-600 border border-blue-600"
                }`}
              >
                پرداخت از کیف پول
              </button>
              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({ ...prev, paymentMethod: "gateway" }))
                }
                className={`flex-1 py-3 px-6 rounded-lg shadow-sm text-center ${
                  formData.paymentMethod === "gateway"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-blue-600 border border-blue-600"
                }`}
              >
                پرداخت از درگاه
              </button>
            </div>
          </div>

          {/* دکمه ارسال */}
          <div className="mt-10">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {subt}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>در حال بارگذاری...</div>}>
      <CheckoutPage />
    </Suspense>
  );
}