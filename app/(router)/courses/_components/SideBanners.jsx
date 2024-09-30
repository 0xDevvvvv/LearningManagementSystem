"use client"

import globalApi from '/app/_utils/globalApi'
import React, { useState } from 'react'
import { useEffect } from 'react';
import Image from 'next/image';
function SideBanners() {

    const [sideBannerList, setSideBannerList ] = useState([]);
    useEffect(()=>{
        getSideBanner();
    },[])
    const getSideBanner = () =>{
        globalApi.getSideBanner().then(resp =>{
            setSideBannerList(resp?.sideBanners)
        })
    }

  return (
    <div>
      {sideBannerList.map((item,index) =>(
        <div key={index}>
            <Image src = {item.banner.url} alt ='banner' width={500} height={300}
            className='rounded-xl cursor-pointer' onClick={()=>{
                window.open(item?.url)
            }}/> 
        </div>
      ))}
    </div>
  )
}

export default SideBanners
