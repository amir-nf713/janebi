"use client";
import dynamic from "next/dynamic";
import OfferDay from "./OffreDay";

// بارگذاری کامپوننت BoxOffersDay بدون استفاده از ssr: false
const BoxOffersDay = dynamic(() => import("../BoxOffersDay/BoxOffersDay"), {});

import React, { useState, useEffect } from "react";
// import OfferDay from "./OfferDay";

export default function ThreeOffer() {
  const allOffers = [
    { img: "item/5830cb7c2f93ee48d2687b077da09248c31e83e1_1721982283.webp", categori: "گارد گوشی", onvan: "گارد آبی سیلیکنی", off: "10", money: "300000" },
    { img: "item/5830cb7c2f93ee48d2687b077da09248c31e83e1_1721982283.webp", categori: "گارد گوشی", onvan: "گارد قرمز سیلیکنی", off: "15", money: "250000" },
    { img: "item/5830cb7c2f93ee48d2687b077da09248c31e83e1_1721982283.webp", categori: "گارد گوشی", onvan: "گارد مشکی سیلیکنی", off: "20", money: "350000" },
    { img: "item/5830cb7c2f93ee48d2687b077da09248c31e83e1_1721982283.webp", categori: "گارد گوشی", onvan: "گارد سفید سیلیکنی", off: "5", money: "200000" },
    { img: "item/5830cb7c2f93ee48d2687b077da09248c31e83e1_1721982283.webp", categori: "گارد گوشی", onvan: "گارد سبز سیلیکنی", off: "12", money: "320000" },
    { img: "item/5830cb7c2f93ee48d2687b077da09248c31e83e1_1721982283.webp", categori: "گارد گوشی", onvan: "گارد زرد سیلیکنی", off: "8", money: "280000" },
  ];

  const [visibleOffers, setVisibleOffers] = useState([]);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (window.innerWidth > 1354) {
        setVisibleOffers(allOffers.slice(index, index + 3));
        
      }else if(window.innerWidth < 1354 && window.innerWidth > 908){
        setVisibleOffers(allOffers.slice(index, index + 2));
      }
      else if (window.innerWidth < 907) {
        setVisibleOffers(allOffers.slice(index, index + 1));
      }
      
      index = (index + 3) % allOffers.length; 
      
    }, 3000); // هر 3 ثانیه یکبار

    
    return () => clearInterval(interval); // پاک کردن تایمر هنگام خارج شدن کامپوننت
  }, []); // این useEffect فقط یکبار هنگام mount شدن کامپوننت اجرا می‌شود
  return (
    <div className="w-full flex justify-center items-center mt-40">
      <OfferDay
        d="01"
        h="23"
        m="45"
        s="08"
        item={visibleOffers.map((offer, index) => (
          <BoxOffersDay
            key={index}
            img={offer.img}
            categori={offer.categori}
            onvan={offer.onvan}
            off={offer.off}
            money={offer.money}
          />
        ))}
      ></OfferDay>
    </div>
  );
}