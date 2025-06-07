"use client";
import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import apiKey from "@/app/API";
import axios from "axios";

function BasketPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [basket, setBasket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [postcode, setpostcode] = useState(null);

  const postcodee = (e) => {
    setpostcode(e.target.value);
  };

  useEffect(() => {
    if (id) {
      setLoading(true);
      axios
        .get(`${apiKey.bascket}/${id}`)
        .then((response) => {
          if (response.data.data) {
            setBasket(response.data.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setError("خطا در دریافت اطلاعات");
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleConfirm = async (num, pcode) => {
    if (!basket) return;
    setUpdating(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.put(`${apiKey.bascket}/${basket.shenase}`, {
        vazeiat: "در حال ارسال",
        postCode: postcode,
      });
      if (response.status === 200 || response.status === 201) {
        setBasket((prev) => ({ ...prev, vazeiat: "در حال ارسال" }));
        setSuccess("وضعیت سفارش با موفقیت به 'در حال ارسال' تغییر کرد.");
      }
    } catch (err) {
      console.error(err);
      setError("خطا در بروزرسانی وضعیت سفارش");
    } finally {

      axios.post(`https://janebi-speed.ir/api/register/sms/smsSendc`, {
        number : `${num}`,
        code : `${pcode}`
      })
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center text-xl font-semibold p-5">
        در حال بارگذاری...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 font-semibold p-5">{error}</div>
    );
  }

  if (!basket) {
    return (
      <div className="text-center text-gray-600 font-semibold p-5">
        اطلاعاتی یافت نشد
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-gray-50 rounded-md shadow-md mt-8">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
        جزئیات سبد خرید
      </h1>

      <div className="mb-6 bg-white rounded-md shadow p-4">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">
          کالاهای خریداری شده
        </h2>
        {basket.value && basket.value.length > 0 ? (
          <ul className="space-y-3">
            {basket.value.map((item, idx) => (
              <li
                key={idx}
                className="flex justify-between items-center bg-gray-100 p-3 rounded-md"
              >
                <div>
                  <p>
                    <span className="font-semibold">مدل:</span> {item.model}
                  </p>
                  <p>
                    <span className="font-semibold">رنگ:</span> {item.color}
                  </p>
                </div>
                <div className="text-blue-700 font-semibold text-lg">
                  تعداد: {item.quantity}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">هیچ کالایی در این سبد وجود ندارد.</p>
        )}
      </div>

      <div className="mb-6 bg-white rounded-md shadow p-4">
        {[
          { label: "وضعیت", value: basket.vazeiat },
          { label: "اسم", value: basket.name },
          { label: "شهر", value: basket.shahr },
          { label: "استان", value: basket.ostan },
          { label: "شماره", value: basket.phoneNumber },
          { label: "آدرس", value: basket.address },
          { label: "کد پستی", value: basket.postCode },
          { label: "شناسه سفارش", value: basket.shenase },
          { label: "تاریخ", value: new Date(basket.date).toLocaleString() },
          { label: "آیدی کاربر", value: basket.userId },
          {
            label: "مبلغ سفارش",
            value: basket.money?.toLocaleString() + " تومان",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="flex justify-between py-2 border-b last:border-b-0 border-gray-200"
          >
            <span className="font-semibold text-gray-700">{item.label}:</span>
            <span className="text-gray-900">{item.value || "-"}</span>
          </div>
        ))}
      </div>

      {success && (
        <div className="mb-4 text-green-600 font-semibold text-center">
          {success}
        </div>
      )}
      <div className="w-full flex justify-center items-center">
        <input
          type="text"
          className="w-11/12 px-3 h-12 mb-3 border-2"
          placeholder="کد رهگیری را وارد کنید"
          value={postcode}
          onChange={postcodee}
        />
      </div>

      <button
        onClick={() => handleConfirm(basket.phoneNumber, postcode)}
        disabled={
          updating || basket.vazeiat === "در حال ارسال" || !postcode?.trim()
        }
        className={`w-full py-3 rounded-md text-white font-bold transition
    ${
      basket.vazeiat === "در حال ارسال" || !postcode?.trim()
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-green-600 hover:bg-green-700"
    }
  `}
      >
        {updating
          ? "در حال بروزرسانی..."
          : basket.vazeiat === "در حال ارسال"
          ? "سفارش در حال ارسال است"
          : "تایید و ارسال سفارش"}
      </button>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense
      fallback={<div className="text-center p-5">در حال بارگذاری...</div>}
    >
      <BasketPage />
    </Suspense>
  );
}
