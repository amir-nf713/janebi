'use client'
import React, { useState } from 'react'
import apiKey from '../API'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Cookies from "js-cookie";

export default function Singup() {
  const router = useRouter();

  const [isDisabled, setIsDisabled] = useState(false); // وضعیت دکمه ارسال کد
  const [timeLeft, setTimeLeft] = useState(60); // زمان باقی‌مانده برای تایمر
  const [code, setCode] = useState("");
  const [Number, setNumber] = useState("");
  const [TrueCode, setTrueCode] = useState("");
  const [errCode, seterrCode] = useState("");
  const [errNumber, seterrNumber] = useState("");
  const [errTrueCode, seterrTrueCode] = useState("");
  const [SmsCode, setSmsCode] = useState("");
  const [SmsNumber, setSmsNumber] = useState("");

  const changeCode = (e) => setCode(e.target.value);
  const changeNumber = (e) => setNumber(e.target.value);
  const changeTrueCode = (e) => setTrueCode(e.target.value);

  const sendCode = (e) => {
    if (Number.length > 10) {
      seterrNumber("");
      const api = apiKey.sendSms;
      axios.post(api, {
        number: Number
      })
      .then((data) => {
        
        setSmsCode(data.data.data.code);
        setSmsNumber(data.data.data.number);
        
        setIsDisabled(true); // غیرفعال کردن دکمه ارسال کد

        // شروع تایمر برای فعال کردن دوباره دکمه
        let countdown = 60;
        const timer = setInterval(() => {
          setTimeLeft(prevTime => {
            if (prevTime <= 1) {
              clearInterval(timer);
              setIsDisabled(false); // فعال کردن دکمه پس از 1 دقیقه
            }
            return prevTime - 1;
          });
        }, 1000);
      });
    } else {
      seterrNumber("شماره را درست وارد کنید");
    }
  }

  const setUserCookie = (value) => {
    Cookies.set("id", value, { expires: 3 }); // کوکی ۳ روز معتبر
  };

  const submit = (e) => {
    if (SmsCode === TrueCode && SmsNumber === Number) {
      const apigetuser = apiKey.getOneUser;
      const apigetadmin = apiKey.getOneAdmin;
      axios.get(`${apigetadmin}/${Number}`)
      .then((data) => {
        if (data.data.massage === "cant find admins") {
          axios.get(`${apigetuser}/${Number}`)
          .then((data) => {
            if (data.data.massage === "cant find user") {
              seterrTrueCode("");
              const api = apiKey.postUser;
              axios.post(api, {
                number: Number,
                code: TrueCode,
                codeDavat: code
              })
              .then((data) => {
                console.log(data);
                
                setUserCookie(data.data.data._id);
                router.push("/UserPannle");
              });
            } else {
              seterrNumber("شماره در سیستم وجود دارد");
            }
          });
        } else {
          seterrNumber("شماره در سیستم وجود دارد");
        }
      });
    } else {
      seterrTrueCode("کد یا شماره اشتباه");
    }
  }

  return (
    <div className='loginbg font-dorna flex justify-center items-center'>
      <div className="max-tablet-l:w-[500px] max-Wide-mobile-xl:w-11/12 bg-white rounded-xl flex flex-col items-center justify-between max-Wide-mobile-xl:py-5 max-Wide-mobile-xl:px-1 p-8 max-Wide-mobile-xl:h-[380px] h-[480px] w-[700px]">
        <h1 className=" text-black text-4xl font-extrabold">ثبت نام</h1>
        <input onChange={changeCode} value={code} placeholder='اگر کد دعوت دارید وارد کنید ...' className='pr-6 max-Wide-mobile-xl:w-[98%] font-semibold text-2xl rounded-2xl max-tablet-l:w-[450px] w-[600px] h-16 max-Wide-mobile-xl:h-12 bg-gray-300 shadow-sm max-Wide-mobile-xl:rounded-sm shadow-black/25' type="text" />
        <p className="font-extrabold">{errCode}</p>
        <input onChange={changeNumber} value={Number} placeholder='شماره را وارد کنید ...' className='pr-6 max-Wide-mobile-xl:w-[98%] font-semibold text-2xl rounded-2xl max-tablet-l:w-[450px] w-[600px] h-16 max-Wide-mobile-xl:h-12 bg-gray-300 shadow-sm max-Wide-mobile-xl:rounded-sm shadow-black/25' type="text" />
        <p className="font-extrabold">{errNumber}</p>
        <div className="flex flex-row w-full justify-center items-center">
          <input onChange={changeTrueCode} value={TrueCode} placeholder='کد را وارد کنید ...' className='max-Wide-mobile-xl:rounded-r-sm max-Wide-mobile-xl:h-12 pr-6 max-Wide-mobile-xl:w-[76%] max-tablet-l:w-[360px] font-semibold text-2xl rounded-r-2xl w-[450px] h-16 bg-gray-300 shadow-sm shadow-black/25' type="text" />
          <button disabled={isDisabled} onClick={sendCode} className="max-mobile-l:text-xs max-tablet-l:text-xl max-Wide-mobile-xl:rounded-sm max-Wide-mobile-xl:h-12 max-Wide-mobile-xl:rounded-l-sm max-Wide-mobile-xl:w-[23%] rounded-l-2xl text-3xl max-tablet-l:w-[130px] active:bg-blue-900 text-white font-bold w-[150px] h-16 bg-blue-800 shadow-lg shadow-black/25">
            {isDisabled ? `${timeLeft}` : "ارسال کد"}
          </button>
        </div>
        <p className="font-extrabold">{errTrueCode}</p>
        <button onClick={submit} className='rounded-2xl max-Wide-mobile-xl:rounded-sm max-Wide-mobile-xl:h-12 max-tablet-l:w-[450px] max-Wide-mobile-xl:w-[98%] active:bg-blue-900 w-[600px] h-16 bg-blue-800  shadow-lg text-3xl font-bold text-white shadow-black/25'>
          ورود
        </button>
        <a href="login" className='text-2xl font-semibold max-Wide-mobile-l:text-xl'>
          آیا حساب دارید؟ <span className='text-blue-800'>وارد شدن</span>
        </a>
      </div>
    </div>
  )
}
