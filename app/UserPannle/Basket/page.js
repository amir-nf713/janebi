"use client";
import apiKey from "@/app/API";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";



export default function Page() {



  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("success") === "true") {
      const pendingOrder = JSON.parse(localStorage.getItem("pendingOrder"));
      if (pendingOrder) {
        axios.post(apiKey.bascket, {
          value: pendingOrder.cartItems,
          vazeiat: "درحال بررسی",
          name: pendingOrder.formData.firstName + " " + pendingOrder.formData.lastName,
          shahr: pendingOrder.formData.city,
          ostan: pendingOrder.formData.province,
          phoneNumber: pendingOrder.formData.mobile,
          address: pendingOrder.formData.address,
          postCode: pendingOrder.formData.postalCode,
          shenase: pendingOrder.cookies,
          date: Date.now(),
          userId: pendingOrder.cookies,
          money: pendingOrder.finalPrice,
        }).then(() => {
          localStorage.removeItem("pendingOrder");
          Cookies.remove("cart");
        });
      }
    }
  }, []);
  


  const cookies = Cookies.get("id");
  const [user, setUser] = useState(null);
  const [basket, setBasket] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [openIndexes, setOpenIndexes] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(apiKey.user);
        const userData = response.data.data.find(
          (element) => element._id === cookies
        );
        if (userData) {
          setUser(userData);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to load user data");
      }
    };

    const fetchBasketData = async () => {
      try {
        const response = await axios.get(apiKey.bascket);
        const userBaskets = response.data.data.filter(
          (element) => element.userId === cookies
        );
        if (userBaskets.length > 0) {
          setBasket(userBaskets);
        }
      } catch (error) {
        console.error("Error fetching basket data:", error);
        setError("Failed to load basket data");
      } finally {
        setIsLoading(false);
      }
    };

    if (cookies) {
      fetchUserData();
      fetchBasketData();
    }
  }, [cookies]);

  if (isLoading) return <div className="p-4 text-center text-gray-600">در حال بارگذاری...</div>;
  if (error) return <div className="p-4 text-center text-red-500">{error}</div>;

  const toggleOpen = (index) => {
    setOpenIndexes((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">سبد خریدهای شما</h1>

      {basket.length > 0 ? (
        <ul className="w-full max-w-3xl space-y-6">
          {basket.map((item, index) => (
            <li key={index} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <button
                onClick={() => toggleOpen(index)}
                className={`w-full text-lg font-semibold py-3 rounded-md transition 
                  ${
                    openIndexes[index]
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                  }`}
              >
                {openIndexes[index]
                  ? `بستن سبد خرید شماره ${index + 1}`
                  : `مشاهده سبد خرید شماره ${index + 1}`}
              </button>

              {openIndexes[index] && (
                <div className="mt-6 text-gray-700">
                  <h3 className="text-xl font-bold mb-4">کالاهای خریداری شده:</h3>

                  {item.value && item.value.length > 0 ? (
                    <div className="space-y-3">
                      {item.value.map((product, i) => (
                        <div
                          key={i}
                          className="p-3 border rounded-md bg-gray-50 flex justify-between items-center"
                        >
                          <div>
                            <p>📱 <span className="font-medium">مدل:</span> {product.model}</p>
                            <p>🎨 <span className="font-medium">رنگ:</span> {product.color}</p>
                          </div>
                          <p className="text-sm font-semibold bg-blue-100 text-blue-800 px-3 py-1 rounded">
                            تعداد: {product.quantity}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>هیچ کالایی در این سبد وجود ندارد.</p>
                  )}

                  <div className="mt-6 border-t pt-4 space-y-2 text-gray-600">
                    <p><span className="font-semibold">نام خریدار:</span> {item.name}</p>
                    <p><span className="font-semibold">شماره تماس:</span> {item.phoneNumber}</p>
                    <p><span className="font-semibold">مبلغ کل:</span> {item.money?.toLocaleString()} تومان</p>
                    <p><span className="font-semibold">تاریخ ثبت:</span> {new Date(item.date).toLocaleString()}</p>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-lg">سبد خرید شما خالی است</p>
      )}
    </div>
  );
}
