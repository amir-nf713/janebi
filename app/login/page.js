'use client'
import React, { useState } from 'react'
import apiKey from '../API'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Cookies from "js-cookie";

export default function Login() {
  const [isDisabled, setIsDisabled] = useState(false); // دکمه غیرفعال/فعال
  const [timeLeft, setTimeLeft] = useState(60); // زمان باقی‌مانده برای تایمر
  const router = useRouter();

  const [errTrueCode, seterrTrueCode] = useState("");
  const [Number, setNumber] = useState("");
  const [TrueCode, setTrueCode] = useState("");
  const [errNumber, seterrNumber] = useState("");
  const [SmsCode, setSmsCode] = useState("");
  const [SmsNumber, setSmsNumber] = useState("");

  const changeNumber = (e) => setNumber(e.target.value);
  const changeTrueCode = (e) => setTrueCode(e.target.value);

  const setUserCookie = (value) => {
    Cookies.set("id", value, { expires: 3 }); // کوکی ۳ روز معتبره
  };

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
              clearInterval(timer); // توقف تایمر
              setIsDisabled(false); // فعال کردن دکمه
            }
            return prevTime - 1;
          });
        }, 1000);
      });
    } else {
      seterrNumber("شماره را درست وارد کنید");
    }
  };

  const submit = (e) => {
    if (SmsCode === TrueCode && SmsNumber === Number) {
      const getOneUser = apiKey.getOneUser;
      const getOneAdmin = apiKey.getOneAdmin;
      axios.get(`${getOneAdmin}/${Number}`)
      .then((data) => {
        if (data.data.login === "true") {
          router.push("/adminPannle");
        } else {
          axios.get(`${getOneUser}/${Number}`)
          .then((data) => {
            if (data.data.login === "true") {
              setUserCookie(data.data.data._id);
              router.push("/UserPannle");
            } else {
              seterrNumber("شماره در سیستم وجود ندارد");
              seterrTrueCode("");
            }
          });
        }
      });
    } else {
      seterrTrueCode("کد یا شماره اشتباه");
    }
  };

  return (
    <div className='loginbg font-dorna flex justify-center items-center'>
      <div className="max-tablet-l:w-[500px] max-Wide-mobile-xl:w-11/12 bg-white rounded-xl flex flex-col items-center justify-between max-Wide-mobile-xl:py-5 max-Wide-mobile-xl:px-1 p-8 max-Wide-mobile-xl:h-[300px] h-[400px] w-[700px]">
        <h1 className=" text-black text-4xl font-extrabold">ورود به حساب</h1>
        <input onChange={changeNumber} value={Number} placeholder='شماره را وارد کنید ...' className='pr-6 max-Wide-mobile-xl:w-[98%] font-semibold text-2xl rounded-2xl max-tablet-l:w-[450px] w-[600px] h-16 max-Wide-mobile-xl:h-12 bg-gray-300 shadow-sm max-Wide-mobile-xl:rounded-sm shadow-black/25'  type="text" />
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
        <a href="singup" className='text-2xl  font-semibold max-Wide-mobile-l:text-xl'>ایا حساب ندارید؟ <span className='text-blue-800'>ساخت حساب</span></a>
      </div>
    </div>
  )
}
