import axios from 'axios'
import React, { useState } from 'react'
import apiKey from '../API'

export default function TamasBaMa() {
 const [inp1 , setinp1] = useState("")
 const [inp2 , setinp2] = useState("")
 const [inp3 , setinp3] = useState("")

 const Inp1 = (e) => {
   setinp1(e.target.value)
 }
 const Inp2 = (e) => {
   setinp2(e.target.value)
 }
  const Inp3 = (e) => {
     setinp3(e.target.value)
  }


  const sub = () => {
    axios.post(apiKey.postStayincall, {
          number : inp2,
          onvan : inp1,
          tozih : inp3,
    }).then(data => {

      alert("فرستاده شد :)")
         setinp1("")
         setinp2("")
         setinp3("")

    })
  }



  return (
    <div className='w-11/12 max-desktop-2xl:w-[1200px] max-desktop-l:w-[800px] flex justify-center items-center font-dorna flex-col mb-8'>
      <h1 className="w-full flex items-start justify-start text-3xl font-extrabold mb-7 pr-8 ">تماس با ما</h1>
      <div className="bg-blue-900 w-11/12 flex-col justify-center flex max-Wide-mobile-4xl:p-3   p-10 max-laptop-l:w-[600px] max-Wide-mobile-4xl:w-[90%] items-center">
        <input  onChange={Inp1} value={inp1} type="text" placeholder='عنوان...' className="text-xl h-16 w-11/12 my-4 p-3 max-Wide-mobile-4xl:h-9 max-Wide-mobile-4xl:my-2" />
        <input onChange={Inp2} value={inp2}  type="text" placeholder='شماره...' className="text-xl h-16 w-11/12 my-4 p-3 max-Wide-mobile-4xl:h-9 max-Wide-mobile-4xl:my-2" />
        <textarea className='w-11/12 h-44 my-4 p-3 text-xl max-Wide-mobile-4xl:h-32 max-Wide-mobile-4xl:my-2'  onChange={Inp3} value={inp3} placeholder='توضیحات...'></textarea>
        <button onClick={sub}  className='h-16 w-52 max-Wide-mobile-4xl:h-10 max-Wide-mobile-4xl:w-32 max-Wide-mobile-4xl:text-xl max-Wide-mobile-4xl:mt-3 rounded-xl text-3xl font-semibold bg-white'>ارسال</button>
      </div>
    </div>
  )
}
