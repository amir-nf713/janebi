"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import apiKey from "@/app/API";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(null);
  const [onvan, setOnvan] = useState("");
  const [Submitvalue, setSubmitvalue] = useState("اضافه کردن دسته بندی");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setSelectedImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (event) => {
    setOnvan(event.target.value);
  };

  const submitHandler = () => {
    if (!onvan || !selectedImage) {
      setSubmitvalue("لطفاً عنوان و عکس را وارد کنید");
      return;
    }

    // ارسال داده‌ها به API
    axios.post(apiKey.postCategori, {
      onvan,
      picture: selectedImage,
    })
    .then((response) => {
      console.log("Response:", response);
      if (response.data.massage === "data cant empty") {
        setSubmitvalue("همه قسمت هارا پر کنید");
      } else {
        router.back();
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  };

  return (
    <div className="w-full flex flex-col items-center bg-sky-500 p-5">
      <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center justify-center w-64 h-40 border-2 border-dashed border-gray-400 rounded-lg bg-gray-50 hover:bg-gray-100 transition">
        {selectedImage ? (
          <img src={selectedImage} alt="Uploaded" className="w-full h-full object-cover rounded-lg" />
        ) : (
          <span className="text-gray-600">یک عکس انتخاب کنید</span>
        )}
      </label>
      <input id="file-upload" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />

      <input
        type="text"
        placeholder="عنوان"
        value={onvan}
        onChange={handleInputChange}
        className="w-full text-xl h-11 mt-3 pr-3 bg-white"
      />

      <button onClick={submitHandler} className="bg-sky-800 text-white text-2xl font-extrabold w-1/2 h-16 rounded-full mt-5">
        {Submitvalue}
      </button>
    </div>
  );
}
