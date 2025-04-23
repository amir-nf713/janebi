"use client";
import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import apiKey from "@/app/API";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImage2, setSelectedImage2] = useState(null);
  const [selectedImage3, setSelectedImage3] = useState(null);
  const [selectedImage4, setSelectedImage4] = useState(null);
  const [formData, setFormData] = useState({
    onvan: "",
    selectCategori: "",
    berand: "",
    colors: [""],
    money: "",
    off: "",
    miniTozih: "",
    allDevise: [],
    allTagSearch: [],
    garanti: "",
    TagSearch: "",
    mojodi: [],
    device: ""
  });

  const { 
    onvan, 
    selectCategori, 
    berand, 
    colors, 
    money, 
    off, 
    miniTozih, 
    allDevise, 
    allTagSearch, 
    garanti, 
    TagSearch, 
    mojodi,
    device 
  } = formData;

  const [inputs, setInputs] = useState([]);
  const [Submitvalue, setSubmitvalue] = useState("اضافه کردن محصول");
  const [categori, setCategori] = useState([]);

  useEffect(() => {
    axios.get(apiKey.getCategori)
      .then(({ data }) => setCategori(data.data.map(item => item.onvan)))
      .catch(error => console.warn("خطا در دریافت دسته‌بندی‌ها", error));
  }, []);

  const handleFileChange = useCallback((event, setImage) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
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
    
    if (newColors.length !== colors.length) {
      setFormData(prev => ({
        ...prev,
        colors: newColors,
        allDevise: prev.allDevise.map(dev => ({
          ...dev,
          mojodi: newColors.map((_, i) => i < dev.mojodi.length ? dev.mojodi[i] : 0)
        }))
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        colors: newColors
      }));
    }
  };

  const plusColor = () => setFormData(prevData => ({
    ...prevData,
    colors: [...prevData.colors, ""],
    allDevise: prevData.allDevise.map(dev => ({
      ...dev,
      mojodi: [...dev.mojodi, 0]
    }))
  }));
  
  const dashColor = () => setFormData(prevData => ({
    ...prevData,
    colors: prevData.colors.length > 1 ? prevData.colors.slice(0, -1) : prevData.colors,
    allDevise: prevData.allDevise.map(dev => ({
      ...dev,
      mojodi: dev.mojodi.length > 1 ? dev.mojodi.slice(0, -1) : dev.mojodi
    }))
  }));

  const deviceClickHandler = () => {
    if (device) {
      setFormData((prevData) => ({
        ...prevData,
        allDevise: [...prevData.allDevise, {
          name: device,
          mojodi: colors.map(() => 0)
        }],
        device: ""
      }));
    }
  };

  const handleDeviceStockChange = (deviceIndex, colorIndex, value) => {
    const newAllDevise = [...allDevise];
    newAllDevise[deviceIndex].mojodi[colorIndex] = Number(value);
    
    setFormData(prev => ({
      ...prev,
      allDevise: newAllDevise
    }));
  };

  const removeDevice = (index) => {
    setFormData(prev => ({
      ...prev,
      allDevise: prev.allDevise.filter((_, i) => i !== index)
    }));
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
    if (!onvan || !selectCategori || !berand || !money || !miniTozih || !garanti) {
      setSubmitvalue("لطفا همه فیلدهای ضروری را پر کنید");
      return;
    }
  
    const formattedInputs = inputs.map(input => `title: ${input.title} description: ${input.description}`);
  
    axios.post(apiKey.postitem, {
      onvan,
      categori: selectCategori,
      berand,
      color: colors,
      money,
      offer: off,
      tozih: miniTozih,
      photo: `ph1:${selectedImage}ph2:${selectedImage2}ph3:${selectedImage3}ph4:${selectedImage4}`,
      smallTozih: formattedInputs,
      devaiceOK: allDevise,
      garanti,
      mojodi,
      tagSearch: allTagSearch,
    }).then((response) => {
      console.log(response.data);
      
      if (response.data.message === "ok") {
        router.back();
      } else {
        setSubmitvalue("خطا در ارسال داده‌ها");
      }
    }).catch((error) => {
      console.error("Error:");
      setSubmitvalue("خطا در ارسال داده‌ها");
    });
  };

  return (
    <div className="w-full flex flex-col items-center bg-sky-500 p-5">
      <div className="gap-4 justify-center items-center flex flex-wrap">
        {[setSelectedImage, setSelectedImage2, setSelectedImage3, setSelectedImage4].map((setImage, index) => (
          <div key={index} className="">
            <label htmlFor={`file-upload${index+1}`} className="cursor-pointer flex flex-col items-center justify-center w-64 h-40 border-2 border-dashed border-gray-400 rounded-lg bg-gray-50 hover:bg-gray-100 transition">
              {[selectedImage, selectedImage2, selectedImage3, selectedImage4][index] ? (
                <img src={[selectedImage, selectedImage2, selectedImage3, selectedImage4][index]} alt="Uploaded" className="w-full h-full object-cover rounded-lg" />
              ) : (
                <span className="text-gray-600">عکس {index+1}</span>
              )}
            </label>
            <input 
              id={`file-upload${index+1}`} 
              type="file" 
              accept="image/*" 
              onChange={(e) => handleFileChange(e, setImage)} 
              className="hidden" 
            />
          </div>
        ))}
      </div>

      <input 
        type="text" 
        placeholder="عنوان" 
        value={onvan} 
        onChange={handleInputChange("onvan")} 
        className="w-full text-xl h-11 mt-3 pr-3 bg-white" 
      />

      <select 
        value={selectCategori} 
        onChange={handleInputChange("selectCategori")} 
        className="w-full text-xl h-11 mt-3 pr-3 bg-white"
      >
        <option value="">یک دسته‌بندی انتخاب کنید...</option>
        {categori.map((cat, index) => (
          <option key={index} value={cat}>{cat}</option>
        ))}
      </select>

      <input 
        type="text" 
        placeholder="برند" 
        value={berand} 
        onChange={handleInputChange("berand")} 
        className="w-full text-xl h-11 mt-3 pr-3 bg-white" 
      />

      <div className="flex flex-wrap justify-center mt-3">
        {colors.map((color, index) => (
          <input 
            key={index} 
            type="text" 
            value={color} 
            onChange={(e) => handleColorChange(index, e.target.value)} 
            className="m-2 w-28 pr-3 h-14 cursor-pointer" 
          />
        ))}
      </div>
      <div className="flex">
        <button onClick={plusColor} className="bg-black text-white p-2 m-2">کد  کالا +</button>
        <button onClick={dashColor} className="bg-red-600 text-white p-2 m-2">کد  کالا -</button>
      </div>

      <input 
        type="text" 
        placeholder="قیمت" 
        value={money} 
        onChange={handleInputChange("money")} 
        className="w-full text-xl h-11 mt-3 pr-3 bg-white" 
      />
      <input 
        type="text" 
        placeholder="تخفیف" 
        value={off} 
        onChange={handleInputChange("off")} 
        className="w-full text-xl h-11 mt-3 pr-3 bg-white" 
      />

      {inputs.map((input, index) => (
        <div key={index} className="flex w-full mt-3">
          <input 
            type="text" 
            placeholder="عنوان" 
            value={input.title} 
            onChange={(e) => handleChange(index, "title", e.target.value)} 
            className="border p-2 w-1/3" 
          />
          <input 
            type="text" 
            placeholder="توضیحات" 
            value={input.description} 
            onChange={(e) => handleChange(index, "description", e.target.value)} 
            className="border p-2 w-2/3" 
          />
        </div>
      ))}

      <div className="flex">
        <button onClick={addInput} className="bg-black text-white p-2 m-2">+ ویژگی</button>
        <button 
          onClick={removeInput} 
          disabled={inputs.length === 1} 
          className="bg-red-600 text-white p-2 m-2"
        >
          - ویژگی
        </button>
      </div>

      <input 
        type="text" 
        placeholder="معرفی محصول" 
        value={miniTozih} 
        onChange={handleInputChange("miniTozih")} 
        className="w-full text-xl h-11 mt-3 pr-3 bg-white" 
      />

      <div className="w-full mt-3">
        <div className="flex gap-2 flex-wrap">
          <input 
            type="text" 
            placeholder="دیوایس مناسب" 
            value={device} 
            onChange={handleInputChange("device")} 
            className="flex-1 text-xl h-11 pr-3 bg-white" 
          />
          <button 
            onClick={deviceClickHandler} 
            className="bg-black text-white p-2 px-4"
          >
            اضافه کردن
          </button>
        </div>

        {allDevise.map((device, deviceIndex) => (
          <div key={deviceIndex} className="mt-3 p-3 border rounded-lg bg-white">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-lg">{device.name}</h3>
              <button 
                onClick={() => removeDevice(deviceIndex)} 
                className="bg-red-500 text-white p-1 px-2 rounded text-sm"
              >
                حذف
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {colors.map((color, colorIndex) => (
                <div key={colorIndex} className="flex items-center gap-2">
                  <div 
                    className="w-16 h-6 flex justify-center items-center rounded border border-gray-300"
                    
                  >{color} </div>
                  <span className="text-sm">موجودی:</span>
                  <input
                    type="number"
                    value={device.mojodi[colorIndex] || 0}
                    onChange={(e) => handleDeviceStockChange(deviceIndex, colorIndex, e.target.value)}
                    className="w-20 p-1 border rounded"
                    min="0"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <input 
        type="text" 
        placeholder="درباره گارانتی" 
        value={garanti} 
        onChange={handleInputChange("garanti")} 
        className="w-full text-xl h-11 mt-3 pr-3 bg-white" 
      />

      <div className="w-full mt-3">
        <div className="flex gap-2 flex-wrap">
          <input 
            type="text" 
            placeholder="تگ سرچ (ضروری)" 
            value={TagSearch} 
            onChange={handleInputChange("TagSearch")} 
            className="flex-1 text-xl h-11 pr-3 bg-white" 
          />
          <button 
            onClick={TagsearchClickHandler} 
            className="bg-black text-white p-2 px-4"
          >
            اضافه کردن
          </button>
        </div>
        {allTagSearch.length > 0 && (
          <div className="mt-2 p-2 bg-white rounded">
            {allTagSearch.join(", ")}
          </div>
        )}
      </div>

      <button 
        onClick={submitHandler} 
        className="bg-sky-800 text-white text-2xl font-extrabold w-1/2 h-16 rounded-full mt-5"
      >
        {Submitvalue}
      </button>
    </div>
  );
}