import React from 'react'
import Image from 'next/image'
import { Progress } from "@/components/ui/progress"
import Link from 'next/link'


export default function ProgressCourseItem({course}) {

  const getTotalCompletedChapterPerc = (item) =>{
    const completed =  item.completedChapter?.length > item?.courseList?.chapter?.length ? item?.courseList?.chapter?.length :item.completedChapter?.length
    const percentage = (completed/item?.courseList?.chapter?.length)*100
    console.log("/course-preview/"+item.courseList.slug)
    return percentage
  }

  return (
    <Link href={"/course-preview/"+course?.courseList?.slug}>
    <div className='border rounded-xl hover:shadow-md shadow-purple-300 cursor-pointer'>
      <Image src={course.courseList?.banner?.url} 
      width={500}
      height={450}
      alt = "banner"
      className='rounded-t-xl'
      />
      <div className='flex flex-col gap-1 p-1'>
        <h2 className='font-medium'>{course.courseList.name}</h2>
        <h2 className='text-[12px] text-gray-400'>{course.courseList.author}</h2>
        <h2 className='text-[12px] text-gray-400 mt-3'>{getTotalCompletedChapterPerc(course)}%
          <span className='float-right'>{course.completedChapter?.length > course.courseList?.chapter?.length ?course.courseList?.chapter?.length : course.completedChapter?.length }/{course.courseList?.chapter?.length} chapters</span></h2>
        <Progress value={getTotalCompletedChapterPerc(course)} className='h-[7px]' />
      </div>
    </div>
    </Link>
  )
}
