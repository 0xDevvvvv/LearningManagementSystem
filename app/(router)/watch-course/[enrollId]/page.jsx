"use client"


import globalApi from '@/app/_utils/globalApi'
import { useUser } from '@clerk/nextjs'
import React, { useEffect,useState } from 'react'
import CourseVideoDescription from '../../course-preview/[courseId]/_components/CourseVideoDescription'
import CourseContentSection from '../../course-preview/[courseId]/_components/CourseContentSection'
import { toast } from 'sonner'

export default function WatchCourse({params}) {
  const {user} = useUser()
  const [courseInfo , setCourseInfo] = useState([])
  const [activeChapterIndex, setActiveChapterIndex] = useState(0)
  const [completedChapter,setCompletedChapter] = useState([])

  useEffect(()=>{
    params&&user&&getUserEnrolledCourseDetail();
  },[params&&user])

  // Get User enrolled course details using Id and email

  const getUserEnrolledCourseDetail = () =>{
    globalApi.getUserEnrolledCourse(params.enrollId,
      user.primaryEmailAddress.emailAddress)
      .then(resp=>(
        setCompletedChapter(resp?.userEnrollCourses[0].completedChapter),
        setCourseInfo(resp.userEnrollCourses[0].courseList)
      ))
  }

  // save chapter completed ID
  const onChapterComplete = (chapterId) =>{
    globalApi.markChapterCompleted(params.enrollId,chapterId)
    .then(resp=>{
      console.log(resp)
      if(resp)[
        toast('Chapter Marked As Completed'),
        getUserEnrolledCourseDetail() 
      ]
    })
  }

  return courseInfo.name&&(
    <div>
      <div className='grid grid-cols-1 md:grid-cols-3 p-5 gap-3'>
        {/*Video Description And Title */}
        <div className='col-span-2 bg-white p-3'>
            <CourseVideoDescription courseInfo = {courseInfo}
              activeChapterIndex= {activeChapterIndex}
              watchMode={true}
              setChapterCompleted={(chapterId)=>onChapterComplete(chapterId)}
            />
        </div>

        {/*Course Content*/}
        <div>
             <CourseContentSection  isUserAlreadyEnrolled = {true}
             courseInfo = {courseInfo}
            watchMode = {true}
            completedChapter = {completedChapter}
            setActiveChapterIndex={(index)=>{
              setActiveChapterIndex(index)
            }}
             /> 
        </div>
      </div>
    </div>
  )
}
