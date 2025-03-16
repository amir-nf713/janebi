/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {

    screens:{

      'desktop-3xl' : '1920px', // h-1080 
      'offer-wrap' : '1890px', 
      'desktop-2xl' : '1610px', // h-900
      'desktop-xl' : '1450px', // h-900 //////////////
      'desktop-l' : '1376px', // h-786
      'desktop-s' : '1290px', // h-800
      'laptop-xl' : '1034px', // h-600 , 
      'laptop-l' : '965px', // h-540
      'tablet-xl' : '810px', // h-1280 , h-480
      'tablet-l' : '774px', // h-1024
      'Wide-mobile-4xl' : '645px', // h-360
      'Wide-mobile-3xl' : '605px', // h-880 
      'Wide-mobile-2xl' : '573px', // h-320 
      'Wide-mobile-xl' : '545px', // h-960 
      'Wide-mobile-l' : '539px', // h-320
      'Wide-mobile-s' : '485px', // h-800 , h-320 
      'mobile-xl' : '365px', // h-640
      'mobile-xlk' : '381px', // h-640
      'mobile-l' : '325px', // h-568 , h-533 , h-480 , h-240 
      'mobile-s' : '245px', // h-320
      },

    extend: {
      fontFamily: {
        dorna : ['Dorna'], // استفاده از فونت سفارشی
      },
    },
  },
  plugins: [],
};
