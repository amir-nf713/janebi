"use client";
import React, { Suspense, useEffect, useState } from "react";
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
import { GrFavorite } from "react-icons/gr";
import { MdOutlineFavorite } from "react-icons/md";



function SearchComponen() {
  
  const [ico, setico] = useState(<GrFavorite />);
  const [selectedColor, setselectedColor] = useState("");
  const [selectedIndexColor, setselectedIndexColor] = useState("");
  const [mojodiColor, setmojodiColor] = useState("");
  const [selectedQuantity, setselectedQuantity] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const [ee, setee] = useState("");
  const colorHandler = (e, index) => {
    setselectedColor(e);
    setselectedIndexColor(index)
  };

  
  const carts = Cookies.get("cart");
  const eee = (e) => {
    setee(e.target.value);
  };
  useEffect(() => {
    const getCartItems = () => {
      const items = Cookies.get("cart");
      console.log("Cart Items:", items); // بررسی ساختار داده‌ها
      setCartItems(items ? JSON.parse(items) : []);
    }; 
    getCartItems();
    window.addEventListener("storage", getCartItems);
    return () => window.removeEventListener("storage", getCartItems);
  }, []);

  const addToCart = (item) => {
    let cart = Cookies.get("cart");
    cart = cart ? JSON.parse(cart) : [];

    // بررسی اینکه آیا محصول قبلاً اضافه شده
    const existingItemIndex = cart.findIndex(
      (p) =>
        p.id === item.id && p.color === item.color && p.model === item.model && p.k === item.k
    );

    if (existingItemIndex !== -1) {
      // افزایش تعداد محصول موجود
      cart[existingItemIndex].quantity += item.quantity;
    } else {
      // افزودن محصول جدید
      cart.push(item);
    }

    // ذخیره دوباره در کوکی
    Cookies.set("cart", JSON.stringify(cart), { expires: 1 }); // داده‌ها ۷ روز حفظ می‌شوند

    router.push("/")
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

  // useEffect(() => {
  //   if (!id) {
  //     router.push("/");
  //     window.open("./login", "_blank");
  //   }
  // }, [id, router]);

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

  const [Ph1, setPh1] = useState({f:"ph1:" ,t:"ph2:"})
  const [Ph2, setPh2] = useState({f:"ph2:" ,t:"ph3:"})
  const [Ph3, setPh3] = useState({f:"ph3:" ,t:"ph4:"})
  const [Ph4, setPh4] = useState({f:"ph4:" ,t:"'"})

  const [style1, setstyle1] = useState("hidden")
  const [style2, setstyle2] = useState("hidden")
  const [style3, setstyle3] = useState("hidden")
  const ok1 = Item.photo?.split("ph2:")[1]?.split("ph3:")[0]
  const ok2 = Item.photo?.split("ph3:")[1]?.split("ph4:")[0]
  const ok3 = Item.photo?.split("ph4:")[1]?.split("'")[0]
  
useEffect(() => {
  
 if (/^data:image\/[a-z]+;base64,[A-Za-z0-9+/=]+$/.test(ok1)) {
     setstyle1("")
  }else{
    setstyle1("hidden")
  }
 
 
  if (/^data:image\/[a-z]+;base64,[A-Za-z0-9+/=]+$/.test(ok2)) {
     setstyle2("")
  }else{
    setstyle2("hidden")
  }
 
 
  if (/^data:image\/[a-z]+;base64,[A-Za-z0-9+/=]+$/.test(ok3)) {
     setstyle3("")
  }else{
    setstyle3("hidden")
  }
}, [ok1 ,ok2 ,ok3])




const changePH1 = () => {
 
    setPh1(Ph2)
    setPh2(Ph1)
}



const changePH2 = () => {
  setPh1(Ph3)
  setPh3(Ph1)
}



const changePH3 = () => {
  setPh1(Ph4)
  setPh4(Ph1)
}
  function jf(params) {


    
    const Favorit = Cookies.get("favorit");
      const favoriteItems = Favorit ? JSON.parse(Favorit) : [];
      
      favoriteItems.map((element) => {
        if (element.id === Item._id) {
          setico(<MdOutlineFavorite />); // Set the filled heart icon
        } else {
          setico(<GrFavorite />); // Set the outline heart icon
        }
      });




  }


const addTofavorit = (item) => {
  let cart = Cookies.get("favorit");
  cart = cart ? JSON.parse(cart) : [];

  // Check if the item is already in the favorites list
  const existingItemIndex = cart.findIndex((p) => p.id === item.id);

  if (existingItemIndex !== -1) {
    // Optionally update the item (e.g., increment quantity or other properties)
    // Example: cart[existingItemIndex].quantity += 1;
  } else {
    // Add the item to the favorites list
    cart.push(item);
  }

  // Save back to the cookie
  Cookies.set("favorit", JSON.stringify(cart), { expires: 7 }); // Data persists for 7 days
   jf()
};
useEffect(() => {
  if (ee && selectedIndexColor !== "" && Item.devaiceOK) {
    const foundDevice = Item.devaiceOK.find(data => data.name === ee);
    
    if (foundDevice?.mojodi?.[selectedIndexColor] !== undefined) {
      setmojodiColor(foundDevice.mojodi[selectedIndexColor]);
    } else {
      setmojodiColor(""); // یا مقدار پیش‌فرض مناسب
    }
  }
}, [ee, selectedColor, selectedIndexColor, Item.devaiceOK]);
  

  return (
    <div className="font-dorna flex flex-col justify-center items-center">
      <Nav />
      <div className="w-full h-1 bg-slate-500 my-2"></div>

      <div className="mt-16 w-full flex flex-col items-center">
        <div className="flex flex-col justify-center desktop-s:flex-row items-center desktop-s:items-start">
          <div className="flex flex-col justify-center items-center">
            <div className="w-full flex justify-center items-center">
             <img
               className="h-80 w-80 max-laptop-xl:h-auto max-laptop-xl:w-11/12 object-contain border-2 rounded-3xl mb-2"
               src={Item.photo?.split(`${Ph1.f}`)[1]?.split(`${Ph1.t}`)[0] || ""}
               alt="img"
             />
            </div>

            <div className="flex flex-row">
             <img
               onClick={changePH1}
               className={`max-Wide-mobile-s:h-20 max-Wide-mobile-s:w-20 rounded-3xl ${style1} max-Wide-mobile-s:rounded-lg h-32 mx-1 w-32 object-contain border-2 p-1`}
               src={Item.photo?.split(`${Ph2.f}`)[1]?.split(`${Ph2.t}`)[0] || ""}
               alt="img"
             />
             <img
               onClick={changePH2}
               className={`max-Wide-mobile-s:h-20 max-Wide-mobile-s:w-20 rounded-3xl ${style2} max-Wide-mobile-s:rounded-lg h-32 mx-1 w-32 object-contain border-2 p-1`}
               src={Item.photo?.split(`${Ph3.f}`)[1]?.split(`${Ph3.t}`)[0] || ""}
               alt="img"
             />
             <img
               onClick={changePH3}
               className={`max-Wide-mobile-s:h-20 max-Wide-mobile-s:w-20 rounded-3xl ${style3} max-Wide-mobile-s:rounded-lg h-32 mx-1 w-32 object-contain border-2 p-1`}
               src={Item.photo?.split(`${Ph4.f}`)[1]?.split(`${Ph4.t}`)[0] || ""}
               alt="img"
             />

            </div>
          </div>
   

          <div className="flex flex-col w-full desktop-s:w-[74%] px-4 mt-4 desktop-s:mt-0">
            <div className="text font-extrabold text-4xl max-laptop-xl:text-3xl max-Wide-mobile-xl:text-xl">
              {Item.onvan}
            </div>

            <div className="flex flex-wrap justify-between items-center mt-5">
              <div className="flex ml-3 flex-row items-center">
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
                <div className="text-lg max-Wide-mobile-s:hidden desktop-s:text-3xl bg-slate-400 px-6 py-3 rounded-full">{`${Item.offer}% تخفیف`}</div>
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

                <div
                 onClick={() =>
                  addTofavorit({
                    id: Item._id,


                  
                  })
                }
                className="mt-9 w-full flex items-center justify-center text-3xl">
                    {ico}
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

              {mojodiColor > 0 && mojodiColor < 2 ? (
  <p className="text-red-600 text-xl">فقط {mojodiColor} عدد مانده است</p>
) : (<></>)
}  
            </div>
          </div>
        </div>
        {
  Array.isArray(Item.devaiceOK) && Item.devaiceOK.length > 1 && (
    <div className="w-full flex justify-center items-center mt-8">
      <select
        value={ee}
        onChange={eee}
        className="w-11/12 p-3 text-lg desktop-s:text-2xl bg-white border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        <option value="">مدل مورد نظر را انتخاب کنید</option>
        {Item.devaiceOK
          .filter(item => {
            // بررسی وجود mojodi و اینکه آرایه است
            if (!Array.isArray(item.mojodi)) return false;
            
            // بررسی اینکه حداقل یک آیتم با موجودی بیشتر از 0 وجود دارد
            return item.mojodi.some(mojod => {
              const quantity = Number(mojod);
              return !isNaN(quantity) && quantity > 0;
            });
          })
          .map((item, index) => (
            <option key={`${item.name}-${index}`} value={item.name}>
              {item.name}
            </option>
          ))}
      </select>
    </div>
  )
}

<div className="flex flex-wrap justify-center w-full laptop-xl:w-3/5 mt-4">
  {Array.isArray(Item.color) &&
    Item.color.map((color, index) => {
      // بررسی موجودی رنگ
      const isAvailable = Item.devaiceOK?.some(device => 
        device.name === ee && 
        device.mojodi?.[index] > 0
      );

      // اگر ee خالی است یا رنگ موجود است، نمایش بده
      if (ee !== "" && isAvailable) {
        return (
          <button
            key={index}
            className="m-2 w-10 h-10 rounded-full border-2 border-black color-circle"
            style={{ backgroundColor: color }}
            onClick={(e) => {
              document.querySelectorAll(".color-circle").forEach(el => 
                el.classList.remove("active")
              );
              e.currentTarget.classList.add("active");
              colorHandler(color, index);
            }}
          ></button>
        );
      }
      return null;
    })}
</div>
              
      </div>

      <div className="mt-14 w-[94%]">
        <div className="pb-2 font-extrabold text-3xl desktop-s:text-4xl border-b-4 border-sky-600 mb-6">
          مشخصات
        </div>
        <div className="grid grid-cols-1 laptop-xl:grid-cols-2 gap-4">
          {parsedItems.map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 shadow-xl rounded-lg flex justify-between p-4 border"
            >
              <div className="font-bold text-lg text-sky-500">
                {item.title}
              </div>
              <div className="text-gray-700">{item.description}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-32 w-[90%]">
        <div className="font-extrabold text-3xl desktop-s:text-4xl border-b-4 pb-2 border-sky-600 mb-6">
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

      <div className="w-full flex flex-row justify-between items-center px-8 bg-slate-200 sticky max-Wide-mobile-4xl:bottom-14 bottom-0 h-16 max-mobile-xl:px-3">

        {Item.devaiceOK.length > 1 ? (
          <button
          onClick={() =>
            addToCart({
              id: Item._id,
              indexcolor : selectedIndexColor, 
              k: cartItems.length, 
              color: selectedColor,
              quantity: selectedQuantity,
              model: ee,
            })
          }
          className="bg-blue-950 max-Wide-mobile-s:w-[55%] max-Wide-mobile-s:flex max-Wide-mobile-s:justify-center max-Wide-mobile-s:items-center max-Wide-mobile-s:text-xs max-Wide-mobile-s:h-[80%] text-white px-6 py-3 rounded-lg text-lg font-bold flex items-center disabled:bg-gray-400 disabled:cursor-not-allowed max-mobile-xl:w-[60%]"
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
        ) : (  
        <button
          onClick={() =>
            addToCart({
              id: Item._id,
              indexcolor : selectedIndexColor, 
              k: cartItems.length, 
              color: selectedColor,
              quantity: selectedQuantity,
              model: Item.berand,
            })
          }
          className="bg-blue-950 max-Wide-mobile-s:w-[55%] max-Wide-mobile-s:flex max-Wide-mobile-s:justify-center max-Wide-mobile-s:items-center max-Wide-mobile-s:text-xs max-Wide-mobile-s:h-[80%] text-white px-6 py-3 rounded-lg text-lg font-bold flex items-center disabled:bg-gray-400 disabled:cursor-not-allowed max-mobile-xl:w-[60%]"
          disabled={!selectedColor || !selectedQuantity }
        >
          <BsBasket2Fill className="ml-2" />
          {selectedColor === "" ? (
            <> یک رنگ انتخواب کن </>
          ) : (
            <>افزودن به سبد خرید</>
          )}
        </button>
      )}
        
        <div className="text-xl max-Wide-mobile-s:text-sm font-extrabold">
          {(
            Math.floor(((Item.money / 100) * (100 - Item.offer)) / 1000) * 1000
          ).toLocaleString()}{" "}
          تومان
        </div>
      </div>
    </div>
  );

}

export default function Page() {
  return (
      <Suspense fallback={<div>در حال بارگذاری...</div>}>
          <SearchComponen />
      </Suspense>
  );
}
