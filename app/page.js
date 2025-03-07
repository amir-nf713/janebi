"use client"
export const dynamic = 'force-dynamic'; // تضمین رندر سمت کلاینت
import Image from "next/image";
import HomeBanner from "./component/Home/Banner/HomeBanner";
import SearchInput from "./component/Home/main/searchInput";
import Tag from "./component/Home/main/Tag";
import Nav from "./component/Home/nav/Nav";
import Footer from "./component/Home/footer/Footer";
import Categoris from "./component/Home/catecoris/Catecoris";
import BoxOffersDay from "./BoxOffersDay/BoxOffersDay";
import OfferDay from "./offersDAY/OffreDay";
import ThreeOffer from "./offersDAY/threeOffer";
import FullItem from "./line-item/FullItem";
import MainBanner from "./mainbanner/MainBanner";
import FullCategori from "./categoriBox/FullCategori";
import CategoriBox from "./categoriBox/CategoriBox";
import TamasBaMa from "./tamasBaMa/TamasBaMa";
import Soshal from "./component/Home/soshal/soshal";
import { useRef } from "react";




export default function Home() {
  const targetRef = useRef(null);
  return (
    <div className="">
      <header>
        <Nav targetRef={targetRef} />
        <HomeBanner></HomeBanner>
      </header>

      <main>
      
        
        {/* -------------------- */}
        
        <Categoris ref={targetRef} />

        
        
        

        <div className="w-full my-24">
          <Soshal></Soshal>
        </div>
            

        <div className="mt-4">
          <FullItem></FullItem>
        </div>
        

        <MainBanner></MainBanner>
        {/* <Tag></Tag> */}
        <FullCategori />
        
        

        
        <div className="flex justify-center items-center">

        <TamasBaMa></TamasBaMa>
        </div>
      </main>

      <Footer></Footer>
    </div>
  );
}
