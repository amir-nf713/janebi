"use client";
import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import apiKey from "@/app/API";
import { useRouter } from "next/navigation";


export default function Page() {
    const router = useRouter()
  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState({
    onvan: "",
    selectCategori: "",
    berand: "",
    colors: ["#000000"],
    money: "",
    off: "",
    miniTozih: "",
    allDevise: [],
    allTagSearch: [],
    garanti: "",
    TagSearch: ""
  });

  const { onvan, selectCategori, berand, colors, money, off, miniTozih, allDevise, allTagSearch, garanti, TagSearch } = formData;

  const [inputs, setInputs] = useState([]);
  const [Submitvalue, setSubmitvalue] = useState("اضافه کردن محصول");
  const [categori, setCategori] = useState([]);

  useEffect(() => {
    axios.get(apiKey.getCategori)
      .then(({ data }) => setCategori(data.data.map(item => item.onvan)))
      .catch(error => console.warn("خطا در دریافت دسته‌بندی‌ها", error));
  }, []);

  const handleFileChange = useCallback((event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setSelectedImage(reader.result);
      reader.readAsDataURL(file);
    }
  }, []);

  const addInput = useCallback(() => setInputs([...inputs, { title: "", description: "" }]), [inputs]);

  const removeInput = useCallback(() => {
    if (inputs.length > 1) {
      setInputs(inputs.slice(0, -1));
    }
  }, [inputs]);

  const handleChange = useCallback((index, field, value) => {
    const newInputs = [...inputs];
    newInputs[index][field] = value;
    setInputs(newInputs);
  }, [inputs]);

  const handleInputChange = (field) => (event) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: event.target.value
    }));
  };

  const handleColorChange = (index, color) => {
    const newColors = [...colors];
    newColors[index] = color;
    setFormData((prevData) => ({
      ...prevData,
      colors: newColors
    }));
  };

  const plusColor = () => setFormData((prevData) => ({
    ...prevData,
    colors: [...prevData.colors, "#000000"]
  }));

  const dashColor = () => setFormData((prevData) => ({
    ...prevData,
    colors: prevData.colors.length > 1 ? prevData.colors.slice(0, -1) : prevData.colors
  }));

  const deviceClickHandler = () => {
    if (formData.device) {
      setFormData((prevData) => ({
        ...prevData,
        allDevise: [...prevData.allDevise, formData.device],
        device: ""
      }));
    }
  };

  const TagsearchClickHandler = () => {
    if (TagSearch) {
      setFormData((prevData) => ({
        ...prevData,
        allTagSearch: [...prevData.allTagSearch, TagSearch],
        TagSearch: ""
      }));
    }
  };

  const submitHandler = () => {
    const formattedInputs = inputs.map(input => `title: ${input.title} description: ${input.description}`);

  // ارسال داده‌ها به شکل صحیح
  axios.post(apiKey.postitem, {
    onvan,
    categori: selectCategori,
    berand,
    color: colors,
    money,
    offer: off,
    tozih: miniTozih,
    photo: selectedImage,
    smallTozih: formattedInputs, // ارسال آرایه از رشته‌ها
    devaiceOK: allDevise,
    garanti,
    tagSearch: allTagSearch,
  }).then((response) => {
    console.log("Response:", response);

    if (response.data.massage === "data cant empty") {
      setSubmitvalue("همه قسمت هارا پر کنید");
    } if (response.data.message === "ok"){
       router.back()
    }
  }).catch((error) => {
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

      <input type="text" placeholder="عنوان" value={onvan} onChange={handleInputChange("onvan")} className="w-full text-xl h-11 mt-3 pr-3 bg-white" />

      <select value={selectCategori} onChange={handleInputChange("selectCategori")} className="w-full text-xl h-11 mt-3 pr-3 bg-white">
        <option value="">یک دسته‌بندی انتخاب کنید...</option>
        {categori.map((cat, index) => (
          <option key={index} value={cat}>{cat}</option>
        ))}
      </select>

      <input type="text" placeholder="برند" value={berand} onChange={handleInputChange("berand")} className="w-full text-xl h-11 mt-3 pr-3 bg-white" />

      <div className="flex flex-wrap justify-center mt-3">
        {colors.map((color, index) => (
          <input key={index} type="color" value={color} onChange={(e) => handleColorChange(index, e.target.value)} className="m-2 w-14 h-14 cursor-pointer" />
        ))}
      </div>
      <div className="flex">
        <button onClick={plusColor} className="bg-black text-white p-2 m-2">+</button>
        <button onClick={dashColor} className="bg-red-600 text-white p-2 m-2">-</button>
      </div>

      <input type="text" placeholder="قیمت" value={money} onChange={handleInputChange("money")} className="w-full text-xl h-11 mt-3 pr-3 bg-white" />
      <input type="text" placeholder="تخفیف" value={off} onChange={handleInputChange("off")} className="w-full text-xl h-11 mt-3 pr-3 bg-white" />

      {inputs.map((input, index) => (
        <div key={index} className="flex w-full mt-3">
          <input type="text" placeholder="عنوان" value={input.title} onChange={(e) => handleChange(index, "title", e.target.value)} className="border p-2 w-1/3" />
          <input type="text" placeholder="توضیحات" value={input.description} onChange={(e) => handleChange(index, "description", e.target.value)} className="border p-2 w-2/3" />
        </div>
      ))}

      <div className="flex">
        <button onClick={addInput} className="bg-black text-white p-2 m-2">+</button>
        <button onClick={removeInput} disabled={inputs.length === 1} className="bg-red-600 text-white p-2 m-2">-</button>
      </div>

      <input type="text" placeholder="معرفی محصول" value={miniTozih} onChange={handleInputChange("miniTozih")} className="w-full text-xl h-11 mt-3 pr-3 bg-white" />
      <input type="text" placeholder="دیوایس‌های مناسب" value={formData.device} onChange={handleInputChange("device")} className="w-full text-xl h-11 mt-3 pr-3 bg-white" />
      <button onClick={deviceClickHandler} className="bg-black text-white p-2 mt-3">اضافه کردن</button>
      <p className="font-extrabold text-xl text-black">{allDevise.join(", ")}</p>

      <input type="text" placeholder="درباره گارانتی" value={garanti} onChange={handleInputChange("garanti")} className="w-full text-xl h-11 mt-3 pr-3 bg-white" />

      <input type="text" placeholder="تگ سرچ(حتما پر بشه)" value={TagSearch} onChange={handleInputChange("TagSearch")} className="w-full text-xl h-11 mt-3 pr-3 bg-white" />
      <button onClick={TagsearchClickHandler} className="bg-black text-white p-2 mt-3">اضافه کردن</button>
      <p className="font-extrabold text-xl text-black">{allTagSearch.join(", ")}</p>

      <button onClick={submitHandler} className="bg-sky-800 text-white text-2xl font-extrabold w-1/2 h-16 rounded-full mt-5">{Submitvalue}</button>
    </div>
  );
}
