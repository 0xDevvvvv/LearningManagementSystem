import React from 'react'
import { BadgeIcon, BookOpen, GraduationCap } from 'lucide-react'
import Image from 'next/image'

function Sidenav() {
  
  const menu = [
    {
        id: 1,
        name: "All courses",
        icon:BookOpen
    },
    {
        id: 2,
        name:"Membership",
        icon:BadgeIcon
    },
    {
        id: 3,
        name:"Be Instructor",
        icon:GraduationCap
    }
]

  return (
    <div className='p-5 bg-white shadow-sm border h-screen'>
      <Image src="/logo.webp" alt="logo" width={170} height={40}/>

      <hr className='mt-7'></hr>
      <div className='mt-8'>
        {menu.map((item, index) => (
          <div className='group flex gap-3 mt-2 p-3 text-[20px] items-center 
          text-gray-500 cursor-pointer 
          hover:bg-primary hover:text-white
          rounded-md transition ease-in-out duration-200 
          '>
            <item.icon className='group-hover:animate-bounce'/>
            <h2>{item.name}</h2>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Sidenav
