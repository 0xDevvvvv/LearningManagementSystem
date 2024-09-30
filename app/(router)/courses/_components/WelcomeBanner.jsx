import React from 'react'
import Image from 'next/image'
function WelcomeBanner() {
  return (
    <div className='flex gap-5 items-center bg-white rounded-xl p-5'>
      <Image src='/panda.webp' height={100}  width={100} alt="Image of panda"/>
      <div>
        <h2 className='font-bold text-[27px]'>Welcome to <span className='text-primary'>Academy</span> </h2>
        <h2 className='text-gray-500'>Learn and Build</h2>
      </div>
    </div>
  )
}

export default WelcomeBanner
