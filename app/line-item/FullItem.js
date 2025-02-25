"use client";
import axios from 'axios';
import LineItem from './LineItem'
import dynamic from "next/dynamic";


// بارگذاری کامپوننت BoxOffersDay بدون استفاده از ssr: false
const Items = dynamic(() => import("../line-item/Item"), {});

import React, { useState, useEffect } from "react";
import apiKey from '../API';

export default function FullItem() {

    // const allOffers = [
    //     { img: "item/5830cb7c2f93ee48d2687b077da09248c31e83e1_1721982283.webp", categori: "گارد گوشی", onvan: "گارد آبی سیلیکنی", off: "10", money: "300000" },
    //     { img: "item/5830cb7c2f93ee48d2687b077da09248c31e83e1_1721982283.webp", categori: "گارد گوشی", onvan: "گارد قرمز سیلیکنی", off: "15", money: "250000" },
    //     { img: "item/5830cb7c2f93ee48d2687b077da09248c31e83e1_1721982283.webp", categori: "گارد گوشی", onvan: "گارد مشکی سیلیکنی", off: "20", money: "350000" },
    //     { img: "item/5830cb7c2f93ee48d2687b077da09248c31e83e1_1721982283.webp", categori: "گارد گوشی", onvan: "گارد سفید سیلیکنی", off: "5", money: "200000" },
    //     { img: "item/5830cb7c2f93ee48d2687b077da09248c31e83e1_1721982283.webp", categori: "گارد گوشی", onvan: "گارد سبز سیلیکنی", off: "12", money: "320000" },
    //     { img: "item/5830cb7c2f93ee48d2687b077da09248c31e83e1_1721982283.webp", categori: "گارد گوشی", onvan: "گارد سبز سیلیکنی", off: "12", money: "320000" },
    //     { img: "item/5830cb7c2f93ee48d2687b077da09248c31e83e1_1721982283.webp", categori: "گارد گوشی", onvan: "گارد سبز سیلیکنی", off: "12", money: "320000" },
    //     { img: "item/5830cb7c2f93ee48d2687b077da09248c31e83e1_1721982283.webp", categori: "گارد گوشی", onvan: "گارد سبز سیلیکنی", off: "12", money: "320000" },
    //     { img: "item/5830cb7c2f93ee48d2687b077da09248c31e83e1_1721982283.webp", categori: "گارد گوشی", onvan: "گارد سبز سیلیکنی", off: "12", money: "320000" },
    //     { img: "item/5830cb7c2f93ee48d2687b077da09248c31e83e1_1721982283.webp", categori: "گارد گوشی", onvan: "گارد سبز سیلیکنی", off: "12", money: "320000" },
    //     { img: "item/5830cb7c2f93ee48d2687b077da09248c31e83e1_1721982283.webp", categori: "گارد گوشی", onvan: "گارد سبز سیلیکنی", off: "12", money: "320000" },
    //     { img: "item/5830cb7c2f93ee48d2687b077da09248c31e83e1_1721982283.webp", categori: "گارد گوشی", onvan: "گارد سبز سیلیکنی", off: "12", money: "320000" },
    //     { img: "item/5830cb7c2f93ee48d2687b077da09248c31e83e1_1721982283.webp", categori: "گارد گوشی", onvan: "گارد سبز سیلیکنی", off: "12", money: "320000" },
    //     { img: "item/5830cb7c2f93ee48d2687b077da09248c31e83e1_1721982283.webp", categori: "گارد گوشی", onvan: "گارد سبز سیلیکنی", off: "12", money: "320000" },
    //     { img: "item/5830cb7c2f93ee48d2687b077da09248c31e83e1_1721982283.webp", categori: "گارد گوشی", onvan: "گارد سبز سیلیکنی", off: "12", money: "320000" },
    //     { img: "item/5830cb7c2f93ee48d2687b077da09248c31e83e1_1721982283.webp", categori: "گارد گوشی", onvan: "گارد سبز سیلیکنی", off: "12", money: "320000" },
    //     { img: "item/5830cb7c2f93ee48d2687b077da09248c31e83e1_1721982283.webp", categori: "گارد گوشی", onvan: "گارد سبز سیلیکنی", off: "12", money: "320000" },
    //     { img: "item/5830cb7c2f93ee48d2687b077da09248c31e83e1_1721982283.webp", categori: "گارد گوشی", onvan: "گارد سبز سیلیکنی", off: "12", money: "320000" },
    //     { img: "item/5830cb7c2f93ee48d2687b077da09248c31e83e1_1721982283.webp", categori: "گارد گوشی", onvan: "گارد سبز سیلیکنی", off: "12", money: "320000" },
    //     { img: "item/5830cb7c2f93ee48d2687b077da09248c31e83e1_1721982283.webp", categori: "گارد گوشی", onvan: "گارد سبز سیلیکنی", off: "12", money: "320000" },
    //     { img: "item/5830cb7c2f93ee48d2687b077da09248c31e83e1_1721982283.webp", categori: "گارد گوشی", onvan: "گارد سبز سیلیکنی", off: "12", money: "320000" },
    //     { img: "item/5830cb7c2f93ee48d2687b077da09248c31e83e1_1721982283.webp", categori: "گارد گوشی", onvan: "گارد سبز سیلیکنی", off: "12", money: "320000" },
    //     { img: "item/5830cb7c2f93ee48d2687b077da09248c31e83e1_1721982283.webp", categori: "گارد گوشی", onvan: "گارد سبز سیلیکنی", off: "12", money: "320000" },
    //     { img: "item/5830cb7c2f93ee48d2687b077da09248c31e83e1_1721982283.webp", categori: "گارد گوشی", onvan: "گارد سبز سیلیکنی", off: "12", money: "320000" },
    //     { img: "item/5830cb7c2f93ee48d2687b077da09248c31e83e1_1721982283.webp", categori: "گارد گوشی", onvan: "گارد سبز سیلیکنی", off: "12", money: "320000" },
    //     { img: "item/5830cb7c2f93ee48d2687b077da09248c31e83e1_1721982283.webp", categori: "گارد گوشی", onvan: "گارد سبز سیلیکنی", off: "12", money: "320000" },
    //     { img: "item/5830cb7c2f93ee48d2687b077da09248c31e83e1_1721982283.webp", categori: "گارد گوشی", onvan: "گارد سبز سیلیکنی", off: "12", money: "320000" },
    //     { img: "item/5830cb7c2f93ee48d2687b077da09248c31e83e1_1721982283.webp", categori: "گارد گوشی", onvan: "گارد زرد سیلیکنی", off: "8", money: "280000" },
    //   ];

    const [allOffers, setallOffers] = useState([]);
    const [allNew, setallNew] = useState([]);

  useEffect(() => {
    axios.get(apiKey.getOffitem)
      .then(response => {
        if (response.data.data) {
          setallOffers(response.data.data);
        }
      })
      .catch(error => console.error("Error fetching data:"));

  }, []);

  useEffect(() => {
    axios.get(apiKey.getNewitem)
      .then(response => {
        if (response.data.data) {
          setallNew(response.data.data);
        }
      })
      .catch(error => console.error("Error fetching data:"));

  }, []);


  return (
    <div>

       <div className="flex justify-center font-dorna font-semibold  mb-3">
        <h1 className="text-4xl max-Wide-mobile-l:text-xl">تخفیف دار ها</h1>
       </div>
        <div className="flex flex-row ">
        <LineItem item={
            allOffers.map((offer, index) => (
          <Items
            key={index}
            img={offer.photo}
            categori={offer.categori}
            onvan={offer.onvan}
            off={offer.offer}
            money={offer.money}
            id={offer._id}
          />
        ))} >
        </LineItem>  
        </div>
        

        <div className="flex justify-center font-dorna font-semibold mb-3">
          <h1 className="text-4xl max-Wide-mobile-l:text-xl">جدید ترین ها</h1>
        </div>
        <div className="flex flex-row">
        <LineItem item={
           allNew.map((offer, index) => (
          <Items
            key={index}
            img={offer.photo}
            categori={offer.categori}
            onvan={offer.onvan}
            off={offer.offer}
            money={offer.money}
            id={offer._id}
          />
        ))} >
        </LineItem> 
        </div>

    </div>
  )
}
