"use client"
import React, { useEffect, useState } from 'react'
import {useUser} from '@clerk/nextjs'
import WelcomeBannerDashboard from './_components/WelcomeBanner'
import InProgressCourseList from './_components/InProgressCourseLIst'
import globalApi from '@/app/_utils/globalApi'


export default function Dashboard() {
  const {user} = useUser()

  const [userEnrolledCourses,setUserEnrolledCourses] = useState([])

  useEffect(()=>{
    user&&getAllUserEnrolledCourses();
  },[user])

  /**
   * Get all user enrolled course list
   */
  
  const getAllUserEnrolledCourses = () =>{
    globalApi.getUserAllEnrolledCourseList(user.primaryEmailAddress.emailAddress)
    .then(
      resp=>setUserEnrolledCourses(resp?.userEnrollCourses)
    );
  }



  return (
    <div className='grid grid-cols-1 md:grid-cols-4 p-5 gap-5'>
      <div className='col-span-3'>
        <WelcomeBannerDashboard user={user}/>

        {/* In Progress Course List */}
        <InProgressCourseList userEnrolledCourses={userEnrolledCourses} />
      </div>
      <div className='p-5 bg-white rounded-xl'>
        {/* <SideBanners/> */}
      </div>
    </div>
  )
}
