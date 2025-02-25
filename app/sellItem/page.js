"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Nav from "../component/Home/nav/Nav";
import axios from "axios";
import { useRef } from "react";
import { GoChevronLeft, GoChevronRight } from "react-icons/go"; // برای استفاده از آیکن‌ها
import apiKey from "../API";
import { useSearchParams } from "next/navigation";
import { FaStar } from "react-icons/fa";
import { PiKeyReturnLight } from "react-icons/pi";
import { SlCreditCard } from "react-icons/sl";
import { BiBookmarkHeart } from "react-icons/bi";
import { BsBasket2Fill } from "react-icons/bs";
import Soshal from "../component/Home/soshal/soshal";
import Footer from "../component/Home/footer/Footer";

export default function Pagee() {
  const [selectedColor, setselectedColor] = useState("");
  const [selectedQuantity, setselectedQuantity] = useState(1);
  const [ee, setee] = useState("");
  const colorHandler = (e) => {
    setselectedColor(e);
  };

  const eee = (e) => {
    setee(e.target.value);
  };

  const addToCart = (item) => {
    let cart = Cookies.get("cart");
    cart = cart ? JSON.parse(cart) : [];

    // بررسی اینکه آیا محصول قبلاً اضافه شده
    const existingItemIndex = cart.findIndex(
      (p) =>
        p.id === item.id && p.color === item.color && p.model === item.model
    );

    if (existingItemIndex !== -1) {
      // افزایش تعداد محصول موجود
      cart[existingItemIndex].quantity += item.quantity;
    } else {
      // افزودن محصول جدید
      cart.push(item);
    }

    // ذخیره دوباره در کوکی
    Cookies.set("cart", JSON.stringify(cart), { expires: 7 }); // داده‌ها ۷ روز حفظ می‌شوند

    router.push("/bascket")
  };

  const contentRef = useRef(null); // استفاده از useRef برای دسترسی به دیو

  // اسکرول به راست با انیمیشن نرم
  const scrollRight = () => {
    if (contentRef.current) {
      contentRef.current.scrollTo({
        left: contentRef.current.scrollLeft + 500, // اسکرول 3 واحد به سمت راست
        behavior: "smooth", // انیمیشن نرم
      });
    }
  };

  // اسکرول به چپ با انیمیشن نرم
  const scrollLeft = () => {
    if (contentRef.current) {
      contentRef.current.scrollTo({
        left: contentRef.current.scrollLeft - 500, // اسکرول 3 واحد به سمت چپ
        behavior: "smooth", // انیمیشن نرم
      });
    }
  };
  const [range, setrange] = useState(5);
  const rangeHandler = (e) => {
    setrange(e.target.value);
  };

  const [NazarOnvan, setnazarOnvan] = useState("");
  const nazarOnvan = (e) => {
    setnazarOnvan(e.target.value);
  };

  const [NazarTo, setnazarTo] = useState("");
  const nazarTo = (e) => {
    setnazarTo(e.target.value);
  };

  const searchUrl = useSearchParams();
  const _id = searchUrl.get("id");

  function SubmitEventHandler() {
    const newComment = `title:${NazarOnvan} description:${NazarTo}`;

    axios
      .put(`${apiKey.updateItem}/${_id}`, {
        nazarat: [...(Item.nazarat || []), newComment], // حفظ نظرات قبلی و اضافه کردن جدید
      })
      .then((response) => {
        console.log(response.data);
        setItem((prev) => ({
          ...prev,
          nazarat: [...prev.nazarat, newComment], // آپدیت `Item` در State
        }));
      })
      .catch((err) => console.log(err));
  }

  const id = Cookies.get("id");
  const router = useRouter();

  useEffect(() => {
    if (!id) {
      router.push("/");
      window.open("./login", "_blank");
    }
  }, [id, router]);

  const [Item, setItem] = useState({
    onvan: "",
    categori: "",
    berand: "",
    color: "",
    money: "",
    offer: "",
    tozih: "",
    photo: "",
    smallTozih: "",
    devaiceOK: "",
    garanti: "",
    star: "",
    nazarat: "",
    _id: "",
  });

  useEffect(() => {
    if (_id) {
      axios
        .get(`${apiKey.getoneitem}/${_id}`)
        .then((response) => {
          const data = response.data.data; // بررسی مقدار `data`

          const element = data; // استفاده از اولین آیتم در آرایه

          setItem({
            onvan: element.onvan,
            berand: element.berand,
            money: element.money,
            offer: element.offer,
            photo: element.photo,
            garanti: element.garanti,
            star: element.star,
            nazarat: element.nazarat,
            _id: element._id,
            categori: element.categori,
            color: element.color,
            tozih: element.tozih,
            smallTozih: element.smallTozih,
            devaiceOK: element.devaiceOK,
            nazarat: element.nazarat,
          });
        })
        .catch((error) => console.error("Error fetching data:"));
    }
  }, [_id]);

  const parseItem = (str) => {
    const obj = {};
    str.split(" ").forEach((part, index, arr) => {
      if (part.endsWith(":")) {
        const key = part.slice(0, -1); // حذف :
        obj[key] = arr[index + 1] || ""; // مقدار را از ایندکس بعدی بگیر
      }
    });
    return obj;
  };

  // تبدیل تمام آیتم‌های داخل آرایه
  const parsedItems = Array.isArray(Item.smallTozih)
    ? Item.smallTozih.map(parseItem)
    : [];

  const [user, setuser] = useState([]);

  useEffect(() => {
    axios
      .get(`${apiKey.getOneUserid}/${id}`)
      .then((response) => {
        // console.log(response.data.data);

        if (response.data && response.data.data) {
          setuser(response.data.data);
        }
      })
      .catch((error) => console.error("Error fetching user data:"));
  }, [id]); // حالا `useEffect` به `id` وابسته است و هر بار `id` تغییر کند اجرا می‌شود

  // console.log(user.Name);

  return (
    <div className="font-dorna flex flex-col justify-center items-center">
      <Nav />
      <div className="w-full h-1 bg-slate-500 my-2"></div>

      <div className="mt-16 w-full flex flex-col items-center">
        <div className="flex flex-col desktop-s:flex-row items-center desktop-s:items-start">
          <img
            className="h-80 w-80 max-laptop-xl:h-64 max-laptop-xl:w-64 object-contain"
            src={Item.photo}
            alt="img"
          />

          <div className="flex flex-col w-full desktop-s:w-[74%] px-4 mt-4 desktop-s:mt-0">
            <div className="text font-extrabold text-4xl max-laptop-xl:text-3xl">
              {Item.onvan}
            </div>

            <div className="flex flex-wrap justify-between items-center mt-5">
              <div className="flex flex-row items-center">
                <span className="text-lg desktop-s:text-2xl font-bold text-slate-600">
                  برند:
                </span>
                <span className="text-lg desktop-s:text-2xl font-bold text-sky-900">
                  {Item.berand}
                </span>
              </div>

              <div className="flex flex-row-reverse">
                {[...Array(5)].map((_, index) => (
                  <div
                    key={index}
                    className={`${
                      index < Item.star ? "text-yellow-500" : "text-slate-600"
                    } text-xl h-8 w-8`}
                  >
                    <FaStar />
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full h-1 bg-slate-300 my-2"></div>

            {Item.offer > 0 ? (
              <div className="flex flex-col laptop-xl:flex-row justify-between items-center my-2">
                <div className="flex flex-row items-center">
                  <div className="text-lg desktop-s:text-2xl text-slate-400 line-through">
                    {Item.money.toLocaleString()} تومان
                  </div>
                  <div className="text-2xl desktop-s:text-4xl text-sky-700 mx-3">
                    {(
                      Math.floor(
                        ((Item.money / 100) * (100 - Item.offer)) / 1000
                      ) * 1000
                    ).toLocaleString()}{" "}
                    <span className="text-lg desktop-s:text-2xl mx-2">
                      تومان
                    </span>
                  </div>
                </div>
                <div className="text-lg desktop-s:text-3xl bg-slate-400 px-6 py-3 rounded-full">{`${Item.offer}% تخفیف`}</div>
              </div>
            ) : (
              <div className="text-2xl desktop-s:text-4xl font-extrabold text-sky-700">
                {Item.money.toLocaleString()} تومان
              </div>
            )}

            <div className="w-full h-1 bg-slate-300 my-2"></div>

            <div className="text-lg desktop-s:text-2xl font-extrabold w-[1440px] max-offer-wrap:w-[1000px] max-desktop-l:w-[900px] max-laptop-l:w-11/12 text-wrap  text-slate-600">
              {Item.tozih[0]}
            </div>

            <div className="flex flex-col laptop-xl:flex-row justify-between items-center mt-5">
              <div className="text-sky-600 text-lg desktop-s:text-3xl font-extrabold">
                <div className="flex flex-row items-center mt-3">
                  <PiKeyReturnLight className="text-2xl desktop-s:text-4xl ml-3" />
                  <span>بازگشت تا ۷ روز</span>
                </div>
                <div className="flex flex-row items-center mt-3">
                  <BiBookmarkHeart className="text-2xl desktop-s:text-4xl ml-3" />
                  <span>{Item.garanti}</span>
                </div>
                <div className="flex flex-row items-center mt-3">
                  <SlCreditCard className="text-2xl desktop-s:text-4xl ml-3" />
                  <span>پرداخت آنلاین</span>
                </div>
              </div>

              <div className="flex flex-wrap justify-center w-full laptop-xl:w-3/5 mt-4">
                {Array.isArray(Item.color) &&
                  Item.color.map((color, index) => (
                    <div
                      key={index}
                      className="m-2 w-10 h-10 rounded-full border-2 border-black color-circle"
                      style={{ backgroundColor: color }}
                      onClick={(e) => {
                        document
                          .querySelectorAll(".color-circle")
                          .forEach((el) => el.classList.remove("active"));
                        e.currentTarget.classList.add("active");
                        colorHandler(color);
                      }}
                    ></div>
                  ))}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex justify-center items-center mt-8">
          <select
            value={ee}
            onChange={eee}
            className="w-11/12 p-3 text-lg desktop-s:text-2xl bg-white border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">مدل مورد نظر را انتخاب کنید</option>
            {Array.isArray(Item.devaiceOK) &&
              Item.devaiceOK.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
          </select>
        </div>
      </div>

      <div className="mt-14 w-[94%]">
        <div className="font-extrabold text-3xl desktop-s:text-4xl border-b-4 border-sky-600 mb-6">
          مشخصات
        </div>
        <div className="grid grid-cols-1 laptop-xl:grid-cols-2 gap-4">
          {parsedItems.map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 shadow-xl rounded-lg flex justify-between p-4 border"
            >
              <div className="font-bold text-lg text-blue-600">
                {item.title}
              </div>
              <div className="text-gray-700">{item.description}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-32 w-[90%]">
        <div className="font-extrabold text-3xl desktop-s:text-4xl border-b-4 border-sky-600 mb-6">
          ثبت نظر
        </div>
        <div className="w-full flex flex-col items-center">
          <input
            className="w-11/12 h-12 p-2 shadow-lg rounded-lg"
            value={NazarOnvan}
            onChange={nazarOnvan}
            placeholder="عنوان"
            type="text"
          />
          <textarea
            className="w-11/12 h-40 p-2 shadow-lg rounded-lg mt-4"
            value={NazarTo}
            onChange={nazarTo}
            placeholder="نظر دهید"
          ></textarea>
          <button
            onClick={SubmitEventHandler}
            className="mt-4 bg-blue-950 text-white px-6 py-3 rounded-lg text-lg font-bold"
          >
            ثبت نظر
          </button>
        </div>
      </div>
      <div className="w-full mt-20">
        <Soshal />
      </div>

      <div className="w-full my-24 flex flex-row overflow-x-auto">
        <div className="overflow-x-auto font-dorna font-bold mb-5 flex flex-col max-laptop-xl:mb-20 ">
          <div
            ref={contentRef}
            className="flex flex-row overflow-x-auto h-full "
          >
            {Array.isArray(Item.nazarat) && Item.nazarat.length > 0 ? (
              Item.nazarat.map((item, index) => {
                const parts = item.match(/title:(.*?) description:(.*)/);
                return parts ? (
                  <div
                    key={index}
                    className=" bg-gray-100 p-4 my-2 rounded-lg min-h-64 mx-3 min-w-64 shadow-md flex flex-col"
                  >
                    <div className="w-full h-[30%] flex flex-col">
                      <div className="w-full flex flex-row justify-between items-center">
                        {user.Name === "" ? (
                          <div className="text-lg font-extrabold text-sky-800">
                            Unknown
                          </div>
                        ) : (
                          <div className="text-lg font-extrabold text-sky-800">
                            {user.Name}
                          </div>
                        )}
                      </div>
                      <div className="">{parts[1]}</div>
                      <div className="w-full h-1 bg-slate-300 my-2">.</div>
                    </div>
                    <div className="font-extrabold text-slate-600">
                      {parts[2]}
                    </div>
                  </div>
                ) : null;
              })
            ) : (
              <div className="text-black text-2xl font-bold justify-center items-center">
                اولین نظر را شما بدهید...
              </div>
            )}
          </div>
          <div className="flex flex-row-reverse w-full justify-center items-center mt-4 mb-32 max-tablet-xl:hidden max-laptop-xl:mb-14 text-5xl">
            <div
              onClick={scrollLeft}
              className="text-white  size-16 flex bg-blue-900 justify-center items-center font-extrabold m-4 cursor-pointer rounded-full"
            >
              <GoChevronLeft />
            </div>
            <div
              onClick={scrollRight}
              className="text-white bg-blue-900 size-16 flex justify-center items-center font-extrabold m-4 cursor-pointer rounded-full"
            >
              <GoChevronRight />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full">
        <Footer />
      </div>

      <div className="w-full flex flex-row justify-between items-center px-8 bg-slate-200 sticky bottom-0 h-16">
        <button
          onClick={() =>
            addToCart({
              id: Item._id,
              color: selectedColor,
              quantity: selectedQuantity,
              model: ee,
            })
          }
          className="bg-blue-950 text-white px-6 py-3 rounded-lg text-lg font-bold flex items-center disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={!selectedColor || !selectedQuantity || !ee}
        >
          <BsBasket2Fill className="ml-2" />
          {selectedColor === "" ? (
            <> یک رنگ انتخواب کن </>
          ) : ee === "" ? (
            <>یک مدل انتخاب کن</>
          ) : (
            <>افزودن به سبد خرید</>
          )}
        </button>
        <div className="text-xl font-extrabold">
          {(
            Math.floor(((Item.money / 100) * (100 - Item.offer)) / 1000) * 1000
          ).toLocaleString()}{" "}
          تومان
        </div>
      </div>
    </div>
  );
}
