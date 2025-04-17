"use client"
import apiKey from '@/app/API';
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'

export default function Page() {
  const cookies = Cookies.get("id");
  const [user, setUser] = useState(null);
  const [basket, setBasket] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(apiKey.user);
        const userData = response.data.data.find((element) => element._id === cookies);
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
        const userBasket = response.data.data.find((element) => element.userId === cookies);
        
        if (userBasket) {
          setBasket(userBasket);
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

  if (isLoading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
      
      {user && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold">User Information</h2>
          <p>User ID: {user._id}</p>
          {/* نمایش سایر اطلاعات کاربر */}
        </div>
      )}

      <div className="mb-6">
        <h2 className="text-xl font-semibold">Basket Items</h2>
        {basket.length > 0 ? (
          <ul className="space-y-2">
            {basket.map((item, index) => (
              <li key={index} className="p-2 border-b">
                {item.name || `Item ${index + 1}`}
              </li>
            ))}
          </ul>
        ) : (
          <p>Your basket is empty</p>
        )}
      </div>
    </div>
  );
}