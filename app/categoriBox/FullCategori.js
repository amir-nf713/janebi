"use client"
import React, { useEffect, useState } from 'react'
import Itemcategori from './Itemcategori'
import CategoriBox from './CategoriBox'
import Items from '../line-item/Item'
import axios from 'axios'
import apiKey from '../API'

export default function FullCategori() {
  //  const categorii=[

  const [categorii, setcategorii] = useState([]);

  useEffect(() => {
    
      axios.get(apiKey.getCategori) // اضافه کردن `/` برای درستی URL
        .then(response => {
          if (response.data.data) {
            setcategorii(response.data.data); // تبدیل شیء به آرایه برای جلوگیری از خطا
          }
        })
        .catch(error => console.error("Error fetching data:"));
    
  }, []); // وابستگی به `id`

  // console.log(categorii);
  

  return (
    <div className='' >
       {
         categorii.map((Items, index) => ( 
            
            
            <CategoriBox categori={Items.onvan} key={index} >

            </CategoriBox>
        ))
      }
      
    </div>
  )
}
