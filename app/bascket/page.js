"use client";
import React, { useEffect, useState, useCallback } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import apiKey from "../API";
import { FaPlus, FaTrashAlt } from "react-icons/fa";
import { GoDash } from "react-icons/go";
import { useRouter } from "next/navigation";
import { HiFire } from "react-icons/hi";

export default function Page() {
  const [cartItems, setCartItems] = useState([]);
  const [productDetails, setProductDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalMoney, setTotalMoney] = useState(0);
  const [postMoney, setPostMoney] = useState(0);
  const router = useRouter();

  // Fetch cart items from cookies on component mount
  useEffect(() => {
    const getCartItems = () => {
      const items = Cookies.get("cart");
      setCartItems(items ? JSON.parse(items) : []);
    };

    getCartItems();
    window.addEventListener("storage", getCartItems);
    return () => window.removeEventListener("storage", getCartItems);
  }, []);

  // Fetch product details based on cart items
  useEffect(() => {
    if (cartItems.length === 0) {
      setProductDetails([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    Promise.all(cartItems.map(item => axios.get(`${apiKey.getoneitem}/${item.id}`)))
      .then(responses => {
        const fetchedProducts = responses.map(res => res.data.data);
        setProductDetails(fetchedProducts);
      })
      .catch(error => console.error("Error fetching data:", error))
      .finally(() => setLoading(false));
  }, [cartItems]);

  // Calculate total money and post money
  useEffect(() => {
    if (productDetails.length === 0) return;

    const total = cartItems.reduce((sum, item) => {
      const product = productDetails.find(p => p._id === item.id);
      if (!product) return sum;
      const itemPrice = Math.floor((product.money / 100) * (100 - product.offer) / 1000) * 1000;
      return sum + itemPrice * item.quantity;
    }, 0);

    setTotalMoney(total);

    // Fetch post money (assuming it's a fixed value or fetched from an API)
    axios.get(apiKey.Web)
      .then(data => {
        const dataWeb = data.data.data[0];
        setPostMoney(dataWeb.postMoney);
      })
      .catch(error => console.error("Error fetching post money:", error));
  }, [cartItems, productDetails]);

  // Update cart in cookies and state
  const updateCart = useCallback((updatedCart) => {
    setCartItems(updatedCart);
    Cookies.set("cart", JSON.stringify(updatedCart), { expires: 7 });
  }, []);

  // Increase quantity of an item
  const increaseQuantity = useCallback((id) => {
    const updatedCart = cartItems.map(item =>
      item.id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
    );
    updateCart(updatedCart);
  }, [cartItems, updateCart]);

  // Decrease quantity of an item
  const decreaseQuantity = useCallback((id) => {
    const updatedCart = cartItems
      .map(item =>
        item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter(item => item.quantity > 0);
    updateCart(updatedCart);
  }, [cartItems, updateCart]);

  // Remove an item from the cart
  const removeItem = useCallback((id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    updateCart(updatedCart);
  }, [cartItems, updateCart]);

  // Return to home page
  const returnToHome = () => {
    router.push("/");
  };

  if (loading) {
    return <div className="text-center text-2xl">در حال بارگذاری...</div>;
  }

  const kk = (e) => {
     router.push(`/sell?amount=${e}`)
  }

  return (
    <div className="text-2xl p-5 font-dorna w-full items-center justify-center">
      {cartItems.length > 0 ? (
        cartItems.map((cartItem, index) => {
          const product = productDetails.find(p => p._id === cartItem.id);
          if (!product) return null;

          return (
            <div key={index} className="border p-4 mb-4 max-laptop-l:flex-col flex items-center w-full justify-around border-sky-400">
              <div className="max-Wide-mobile-s:mb-3 max-laptop-l:w-full max-laptop-l:justify-start flex flex-row items-center justify-between">
                <img src={product.photo} alt="img" className="w-20 h-20 object-cover" />
                <div className="max-laptop-l:mr-3 max-laptop-l:text-2xl font-bold w-[25%] max-desktop-l:text-lg">{product.onvan}</div>
              </div>
              <div className="flex-wrap flex w-[50%] max-laptop-l:w-full flex-row justify-around items-center">
                <div className="mx-3 text-sm w-[10%] text-gray-500">{cartItem.model}</div>
                <div className="mx-3 flex items-center gap-2">
                  <span className="text-sm">رنگ:</span>
                  <div className="w-6 h-6 rounded-full border border-black" style={{ background: cartItem.color }}></div>
                </div>
                <div className="mx-3 text-lg font-semibold w-[10%] flex flex-row">
                  {Math.floor((product.money / 100) * (100 - product.offer) / 1000) * 1000} تومان
                </div>
                <div className="flex flex-row justify-center items-center">
                  <div className="mx-3 flex items-center gap-2">
                    <button onClick={() => increaseQuantity(cartItem.id)} className="p-2 bg-sky-500 text-white rounded">
                      <FaPlus />
                    </button>
                    <span className="text-xl">{cartItem.quantity}</span>
                    <button
                      onClick={() => decreaseQuantity(cartItem.id)}
                      className="p-2 bg-sky-500 text-white rounded"
                      disabled={cartItem.quantity === 1}
                    >
                      <GoDash />
                    </button>
                  </div>
                  <button onClick={() => removeItem(cartItem.id)} className="ml-auto p-2 bg-black text-white rounded">
                    <FaTrashAlt />
                  </button>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p className="font-extrabold text-2xl w-full flex justify-center items-center">سبد خرید خالی است</p>
      )}

      <button onClick={returnToHome} className="mb-3 cursor-pointer text-2xl font-bold bg-sky-700 text-white h-16 active:bg-sky-900 w-60">ادامه خرید</button>
      <div className="w-full flex justify-between items-center flex-row text-slate-400">
        <span className="bg-slate-400 h-1 w-[48%]"></span>
        <span className="text-4xl"><HiFire /></span>
        <span className="bg-slate-400 h-1 w-[48%]"></span>
      </div>

      <div className="w-full max-Wide-mobile-xl:text-lg flex flex-row-reverse max-desktop-l:flex-col justify-around items-center mt-24">
        <div className="bg-white p-8 w-[700px] shadow-xl flex flex-col justify-between items-center max-tablet-xl:w-11/12">
          <h1 className="mt-3 font-extrabold text-black">جمع سبد خرید</h1>
          <div className="mt-3 flex px-4 justify-between items-center w-11/12 bg-white h-24 shadow-md border border-black">
            <span>جمع خرید</span>
            <span className="font-extrabold">{totalMoney} تومان</span>
          </div>
          <div className="mt-3 flex px-4 justify-between items-center w-11/12 bg-white h-24 shadow-md border border-black">
            <span>هزینه پست</span>
            <span className=" font-extrabold">{postMoney} تومان</span>
          </div>
          <div className="mt-3 flex px-4 justify-between items-center w-11/12 bg-white h-24 shadow-md border border-black">
            <span>جمع کل</span>
            <span className="text-sky-600 font-extrabold">{totalMoney + postMoney} تومان</span>
          </div>
          <button onClick={() => kk(totalMoney + postMoney)} className="max-Wide-mobile-xl:w-11/12 mt-6 flex px-4 justify-center items-center w-1/3 bg-sky-600 h-16 shadow-md font-extrabold text-white">تکمیل خرید</button>
        </div>
        <div className="flex flex-col justify-center items-center max-desktop-l:mt-6">
          <span className="max-Wide-mobile-2xl:text-6xl text-9xl font-extrabold text-black">SPEED</span>
          <span className="max-Wide-mobile-2xl:text-6xl text-9xl font-extrabold text-sky-600">JANEBI</span>
        </div>
      </div>
    </div>
  );
}