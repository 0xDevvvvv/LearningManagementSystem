"use client"
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import CourseVideoDescription from './_components/CourseVideoDescription'

import CourseEnrollSection from './_components/CourseEnrollSection'
import CourseContentSection from './_components/CourseContentSection'
import globalApi from '../../../_utils/globalApi'
import { useUser } from '@clerk/nextjs'

function CoursePreview({params}) {
    const {user} = useUser()
    const [courseInfo , setCourseInfo] = useState()
    const [isUserAlreadyEnrolled, setIsUserAlreadyEnrolled] = useState('')
    const path = usePathname()
     
    useEffect(()=>{
        params&&getCourseInfoByID();
    },[params])
    
    useEffect(()=>{
        user&&courseInfo&&checkUserEnrolledToCourse();
    },[courseInfo,user])

    const getCourseInfoByID = () =>{
        globalApi.getCourseByID(params?.courseId).then(resp=>{
            setCourseInfo(resp?.courseList)
        })
    }
    

    // check user enrolled course
    const checkUserEnrolledToCourse = () =>{
        globalApi.checkUserEnrollCourse(courseInfo?.slug,user?.primaryEmailAddress.emailAddress)
        .then(resp=>{
            if(resp?.userEnrollCourses[0]?.id){
                setIsUserAlreadyEnrolled(resp?.userEnrollCourses[0]?.id)
                console.log(isUserAlreadyEnrolled,resp?.userEnrollCourses[0]?.id)
            }
        })
    }
  return courseInfo&&(
    <div className='grid grid-cols-1 md:grid-cols-3 p-5 gap-3'>
        {/*Video Description And Title */}
        <div className='col-span-2 bg-white p-3'>
            <CourseVideoDescription courseInfo = {courseInfo}/>
        </div>

        {/*Course Content*/}
        <div>
            <CourseEnrollSection courseInfo={courseInfo} 
            isUserAlreadyEnrolled = {isUserAlreadyEnrolled}/>
            <CourseContentSection  isUserAlreadyEnrolled = {isUserAlreadyEnrolled}
             courseInfo = {courseInfo}/>
        </div>
    </div>
  )
}

export default CoursePreview
