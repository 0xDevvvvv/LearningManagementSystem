"use client"
import React from 'react'
import Button from '@/components/ui/button'
import { BellDot, Link, Search, User } from 'lucide-react'
import { UserButton, useUser } from '@clerk/nextjs'

function Header() {
  const {user,isLoaded}=useUser();

  return (
    <div className='p-4 bg-white flex justify-between'>
        <div className='flex gap-2 border p-2 rounded-md'>
            <Search className='w-5 h-5' />
            <input type="text" placeholder="Search" className='outline-none' />
        </div>
        <div className='flex items-center gap-4'>
            <BellDot className='text-gray-500'/>
            {isLoaded&&user?
            <UserButton/>
            :
            <Link href='/sign-in'> <Button>Get Started</Button></Link>
            }
        </div>
    </div>
  )
}

export default Header
