import React from 'react'

export default function HomeBanner() {
  return (
    <div className='w-full max-Wide-mobile-4xl:h-60 max-tablet-l:h-96 max-laptop-l:h-[400px] h-[608px] max-laptop-xl:h-[450px] bg-blue-800  flex flex-row-reverse items-center justify-between'>
        <div className="ml-20 max-Wide-mobile-4xl:ml-2 max-Wide-mobile-s:mr-6">
            <img className='h-[470px] max-Wide-mobile-4xl:h-56 max-Wide-mobile-4xl:w-56 max-laptop-l:h-72 max-laptop-l:w-72 w-[470px] max-laptop-xl:h-96 max-laptop-xl:w-96' src="/photoBanner.png" alt="photo banner"/>
        </div>
        <div className="flex flex-col max-Wide-mobile-s:h-36 justify-evenly items-center h-72 mr-48 max-desktop-xl:mr-20 max-Wide-mobile-4xl:mr-4 max-desktop-l:mr-8">
             <div className="text-8xl max-Wide-mobile-s:text-base max-Wide-mobile-4xl:text-2xl max-tablet-l:text-3xl max-laptop-l:text-5xl max-desktop-s:text-6xl flex justify-center items-center flex-col text-white">
              <h1 className="font-dorna font-extrabold">SPEED JANEBI</h1>
              <p className="font-dorna font-medium">تا 70% تخفیف</p>

              <a href='#' className='h-24 max-Wide-mobile-s:h-10 max-Wide-mobile-s:w-32 max-Wide-mobile-4xl:mt-2 flex justify-center max-Wide-mobile-4xl:text-sm max-Wide-mobile-4xl:h-12 max-Wide-mobile-4xl:w-40 items-center mt-6 max-tablet-l:w-56 max-tablet-l:h-16 w-[440px] max-desktop-s:text-2xl max-desktop-s:w-[270px] max-desktop-s:h-20 text-4xl bg-blue-950 rounded-full border-2 border-white'>مشاهده تخفیف ها</a>
            </div>
            <div className="text-2xl max-Wide-mobile-s:text-[9px] max-Wide-mobile-4xl:text-sm font-dorna max-tablet-l:text-lg font-extrabold text-slate-300">
                امور مشتریان : 09966820923
            </div>
        </div>
      
    </div>
  )
}
