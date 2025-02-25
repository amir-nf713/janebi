"use client"
import { useRef } from 'react';
import { GoChevronLeft, GoChevronRight } from 'react-icons/go'; // برای استفاده از آیکن‌ها

const HorizontalScrollComponent = (props) => {
  const contentRef = useRef(null); // استفاده از useRef برای دسترسی به دیو

  // اسکرول به راست با انیمیشن نرم
  const scrollRight = () => {
    if (contentRef.current) {
      contentRef.current.scrollTo({
        left: contentRef.current.scrollLeft + 1000, // اسکرول 3 واحد به سمت راست
        behavior: 'smooth', // انیمیشن نرم
      });
    }
  };

  // اسکرول به چپ با انیمیشن نرم
  const scrollLeft = () => {
    if (contentRef.current) {
      contentRef.current.scrollTo({
        left: contentRef.current.scrollLeft - 1000, // اسکرول 3 واحد به سمت چپ
        behavior: "smooth", // انیمیشن نرم
      });
    }
  };

  return (
    <div className="overflow-x-auto font-dorna font-bold mb-5 flex flex-col max-laptop-xl:mb-20 mr-5">
      <div ref={contentRef} className="flex flex-row overflow-x-auto h-full w-full  sc">
        {props.item} {/* اینجا محتوای props.item به صورت افقی اسکرول خواهد شد */}
      </div>
      <div className="flex flex-row-reverse w-full justify-center items-center mt-4 mb-32 max-tablet-xl:hidden max-laptop-xl:mb-14 text-5xl">
        <div 
          onClick={scrollLeft} 
          className="text-white  size-16 flex bg-blue-900 justify-center items-center font-extrabold m-4 cursor-pointer rounded-full">
          <GoChevronLeft />
        </div>
        <div 
          onClick={scrollRight} 
          className="text-white bg-blue-900 size-16 flex justify-center items-center font-extrabold m-4 cursor-pointer rounded-full">
          <GoChevronRight />
        </div>
      </div>
    </div>
  );
};

export default HorizontalScrollComponent;