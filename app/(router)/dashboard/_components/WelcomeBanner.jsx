import React from 'react'
import Image from 'next/image'
export default function WelcomeBannerDashboard({user}) {
  return (
    <div className='bg-purple-100 rounded-sm p-5 flex gap-5 items-center'>
      <Image src={'/panda.webp'} alt='dashboard'
      width={150}
      height={150}
      />
      <div>
        <h2 className='text-[32px] font-light' >welcome Back,
            <span className='font-bold text-primary'>{user?.fullName}</span></h2>
            <h2 className='text-[16px] font-light text-slate-500'>Lets Begin
            Keep it up and improve your progress.</h2>
      </div>
    </div>
  )
}
