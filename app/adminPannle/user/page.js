"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import apiKey from "../../API"

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = apiKey; // اینجا URL ای پی ای خودت رو وارد کن

  useEffect(() => {
    axios.get(apiKey.user)
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("خطا در دریافت کاربران:", error);
        setLoading(false);
      });
  }, []);

  const deleteUser = (id) => {
    axios.delete(`${apiKey.user}/${id}`)
      .then(() => {
        setUsers(users.filter(user => user.id !== id));
      })
      .catch((error) => {
        console.error("خطا در حذف کاربر:", error);
      });
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl md:text-4xl font-bold mb-6">لیست کاربران</h1>
      
      {loading ? (
        <p className="text-gray-600">در حال بارگذاری...</p>
      ) : (
        <div className="w-full max-w-3xl bg-white shadow-md rounded-lg overflow-hidden">
          {users.length > 0 ? (
            <ul className="divide-y divide-gray-300">
              {users.map((user) => (
                <li key={user.id} className="p-4 flex justify-between items-center hover:bg-gray-50 transition-all">
                  <span className="text-lg font-medium">{user.name}</span>
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
                  >
                    حذف
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500 p-4">هیچ کاربری یافت نشد.</p>
          )}
        </div>
      )}
    </div>
  );
}
