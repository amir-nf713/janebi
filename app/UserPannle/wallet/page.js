"use client"
import React, { useState } from "react";

const Wallet = () => {
  const [balance, setBalance] = useState(100000); // موجودی کیف پول
  const [giftCode, setGiftCode] = useState(""); // کد هدیه
  const [showModal, setShowModal] = useState(false); // نمایش یا پنهان کردن Modal
  const [amount, setAmount] = useState(""); // مقدار درخواستی
  const [shebaNumber, setShebaNumber] = useState(""); // شماره شبا
  const [error, setError] = useState(""); // پیام خطا
  const [giftMessage, setGiftMessage] = useState(""); // پیام مربوط به کد هدیه

  // تابع برای ثبت کد هدیه
  const handleGiftCode = () => {
    if (giftCode === "HAPPY2023") {
      setBalance(balance + 50); // افزودن ۵۰ واحد به موجودی
      setGiftMessage("🎉 کد هدیه با موفقیت اعمال شد!");
    } else {
      setGiftMessage("❌ کد هدیه نامعتبر است.");
    }
    setGiftCode(""); // پاک کردن فیلد کد
  };

  // تابع برای باز کردن Modal
  const openModal = () => {
    setShowModal(true);
  };

  // تابع برای بستن Modal
  const closeModal = () => {
    setShowModal(false);
    setError(""); // پاک کردن پیام خطا
    setAmount(""); // پاک کردن مقدار درخواستی
    setShebaNumber(""); // پاک کردن شماره شبا
  };

  // تابع برای اعتبارسنجی شماره شبا
  const validateSheba = (sheba) => {
    // شماره شبا باید ۲۴ کاراکتر باشد و با "IR" شروع شود
    const shebaRegex = /^IR[0-9]{24}$/;
    return shebaRegex.test(sheba);
  };

  // تابع برای درخواست برگشت پول
  const handleRefund = () => {
    const requestedAmount = parseFloat(amount);

    // بررسی اینکه مقدار درخواستی معتبر است
    if (isNaN(requestedAmount)) {
      setError("لطفاً یک مقدار معتبر وارد کنید.");
      return;
    }

    // بررسی اینکه مقدار درخواستی از موجودی بیشتر نباشد
    if (requestedAmount > balance) {
      setError("مبلغ درخواستی بیشتر از موجودی کیف پول است.");
      return;
    }

    // بررسی اینکه شماره شبا معتبر است
    if (!validateSheba(shebaNumber)) {
      setError("شماره شبا نامعتبر است. لطفاً شماره شبا را به درستی وارد کنید.");
      return;
    }

    // انجام عملیات برگشت پول
    setBalance(balance - requestedAmount);
    setError(""); // پاک کردن پیام خطا
    closeModal(); // بستن Modal
    alert(`مبلغ ${requestedAmount} تومان به شماره شبا ${shebaNumber} واریز شد.`);
  };

  // تابع برای وارد کردن اشتباه شماره شبا
  const handleWrongSheba = () => {
    setShebaNumber("IR123456789012345678901234"); // یک شماره شبا اشتباه
    setError("شماره شبا به‌طور خودکار وارد شد. لطفاً آن را بررسی کنید.");
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-sky-500 mb-4">کیف پول شما</h1>
        <div className="bg-sky-50 p-6 rounded-lg mb-6">
          <p className="text-gray-700 text-lg">موجودی فعلی:</p>
          <p className="text-sky-500 text-3xl font-bold mt-2">تومان{balance.toLocaleString()}</p>
        </div>

        {/* بخش کد هدیه */}
        <div className="mb-6">
          <input
            type="text"
            value={giftCode}
            onChange={(e) => setGiftCode(e.target.value)}
            placeholder="کد هدیه خود را وارد کنید"
            className="w-full px-4 py-2 border border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          <button
            onClick={handleGiftCode}
            className="w-full bg-sky-500 text-white py-2 rounded-lg hover:bg-sky-600 transition duration-300 mt-2"
          >
            ثبت کد هدیه
          </button>
          {giftMessage && (
            <p
              className={`mt-2 text-sm ${
                giftMessage.includes("❌") ? "text-red-500" : "text-green-500"
              }`}
            >
              {giftMessage}
            </p>
          )}
        </div>

        {/* دکمه درخواست برگشت پول */}
        <button
          onClick={openModal}
          className="w-full bg-sky-500 text-white py-2 rounded-lg hover:bg-sky-600 transition duration-300"
        >
          درخواست برگشت پول
        </button>
      </div>

      {/* Modal برای درخواست برگشت پول */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md transform transition-all duration-300 ease-in-out translate-y-0">
            <h2 className="text-xl font-bold text-sky-500 mb-4">
              درخواست برگشت پول
            </h2>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm mb-2">
                شماره شبا:
              </label>
              <input
                type="text"
                value={shebaNumber}
                onChange={(e) => setShebaNumber(e.target.value)}
                placeholder="IRXXXXXXXXXXXXXXX"
                className="w-full px-4 py-2 border border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm mb-2">
                مبلغ درخواستی:
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="مبلغ به تومان"
                className="w-full px-4 py-2 border border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <div className="flex justify-end gap-2">
              <button
                onClick={closeModal}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-300"
              >
                انصراف
              </button>
              <button
                onClick={handleRefund}
                className="bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-600 transition duration-300"
              >
                تأیید
              </button>
            </div>
            {/* دکمه وارد کردن اشتباه شماره شبا */}
           
          </div>
        </div>
      )}
    </div>
  );
};

export default Wallet;