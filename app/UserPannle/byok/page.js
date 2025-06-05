"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle } from "lucide-react";

export default function PaymentSuccess() {
  const searchParams = useSearchParams();

  const refId = searchParams.get("refId");
  const amount = searchParams.get("amount");

  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = "/UserPannle/Basket";
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-white">
      <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full">
        <CheckCircle className="text-green-500 w-16 h-16 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-green-700 mb-2">پرداخت با موفقیت انجام شد!</h1>
        <p className="text-gray-700 mb-4">سبد خرید شما با موفقیت ثبت شد.</p>

        <div className="bg-gray-100 rounded-lg p-4 text-right text-sm text-gray-600 mb-4">
          {refId && (
            <p><span className="font-semibold text-gray-800">شناسه سفارش:</span> {refId}</p>
          )}
          {amount && (
            <p><span className="font-semibold text-gray-800">مبلغ پرداختی:</span> {parseInt(amount).toLocaleString()} ریال</p>
          )}
        </div>

        <p className="text-xs text-gray-400">تا چند لحظه دیگر به صفحه دیگر منتقل می‌شوید...</p>
      </div>
    </div>
  );
}
