"use client"
import React, { useEffect } from 'react'
import { BadgeIcon, BookOpen,MenuIcon,NewspaperIcon, GraduationCap, LayoutGrid} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useUser } from '@clerk/nextjs'

function Sidenav() {
  const {user} = useUser()
  const menu = [
    {
        id: 1,
        name: "Dashboard",
        icon:LayoutGrid,
        path:"/dashboard",
        auth:user
    },
    {
        id: 1,
        name: "All Courses",
        icon:BookOpen,
        path:"/courses",
        auth:true
    },
    {
        id: 2,
        name:"Store",
        icon:MenuIcon,
        path:"/store",
        auth:true
    },
    {
        id: 3,
        name:"Membership",
        icon:BadgeIcon,
        path:"/membership",
        auth:true
    },
    {
        id: 4,
        name:"Be Instructor",
        icon:GraduationCap,
        path:"/careers",
        auth:true
    },
    {
      id: 5,
      name:"NewsLetter",
      icon:NewspaperIcon,
      path:"/newsletter",
      auth:true
  }
]
const path = usePathname()
useEffect(()=>{
},[])


  return (
    <div className='p-5 bg-white shadow-sm border h-screen '>
      <Image src="/logo.webp" alt="logo" width={170} height={40}/>

      <hr className='mt-7'></hr>
      <div className='mt-8'>
        {menu.map((item, index) => item.auth&&(
          <Link key = {index} href={item.path}>
          <div className={`group flex gap-3 mt-2 p-3 text-[20px] items-center 
          text-gray-500 cursor-pointer 
          hover:bg-primary hover:text-white
          rounded-md transition ease-in-out duration-200
          ${path.includes(item.path)&&'bg-primary text-white'} 
          `}>
            <item.icon className='group-hover:animate-bounce'/>
            <h2>{item.name}</h2>
          </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Sidenav
