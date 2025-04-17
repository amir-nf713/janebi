"use client"
import apiKey from "@/app/API";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";

const Wallet = () => {
  const [money, setMoney] = useState(0);
  const [giftCode, setGiftCode] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState("");
  const [shebaNumber, setShebaNumber] = useState("");
  const [error, setError] = useState("");
  const [giftMessage, setGiftMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const id = Cookies.get("id");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(apiKey.user);
        const user = response.data.data.find((element) => element._id === id);
        if (user) {
          setMoney(user.cash);
        }
      } catch (error) {
        console.error("Error fetching user data:", );
        setError("Failed to load wallet data");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchUserData();
  }, [id]);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setError("");
    setAmount("");
    setShebaNumber("");
  };

  const validateSheba = (sheba) => {
    const shebaRegex = /^IR[0-9]{24}$/;
    return shebaRegex.test(sheba);
  };

  const handleRefund = () => {
    const requestedAmount = parseFloat(amount);

    if (isNaN(requestedAmount) || requestedAmount <= 0) {
      setError("لطفاً یک مقدار معتبر وارد کنید.");
      return;
    }

    if (requestedAmount > money) {
      setError("مبلغ درخواستی بیشتر از موجودی کیف پول است.");
      return;
    }

    if (!validateSheba(shebaNumber)) {
      setError("شماره شبا نامعتبر است. لطفاً شماره شبا را به درستی وارد کنید.");
      return;
    }

    setMoney(prev => prev - requestedAmount);
    closeModal();
    alert(`مبلغ ${requestedAmount.toLocaleString()} تومان به شماره شبا ${shebaNumber} واریز شد.`);
  };

  if (isLoading) {
    return <div className="min-h-screen bg-white flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-sky-500 mb-4">کیف پول شما</h1>
        <div className="bg-sky-50 p-6 rounded-lg mb-6">
          <p className="text-gray-700 text-lg">موجودی فعلی:</p>
          <p className="text-sky-500 text-3xl font-bold mt-2">{money.toLocaleString()} تومان</p>
        </div>

        <button
          onClick={openModal}
          className="w-full bg-sky-500 text-white py-2 rounded-lg hover:bg-sky-600 transition duration-300 disabled:opacity-50"
          disabled={money <= 0}
        >
          درخواست برگشت پول
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold text-sky-500 mb-4">درخواست برگشت پول</h2>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm mb-2">شماره شبا:</label>
              <input
                type="text"
                value={shebaNumber}
                onChange={(e) => setShebaNumber(e.target.value)}
                placeholder="IRXXXXXXXXXXXXXXX"
                className="w-full px-4 py-2 border border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm mb-2">مبلغ درخواستی:</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="مبلغ به تومان"
                className="w-full px-4 py-2 border border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                min="0"
                max={money}
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
                disabled={!amount || !shebaNumber}
              >
                تأیید
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wallet;