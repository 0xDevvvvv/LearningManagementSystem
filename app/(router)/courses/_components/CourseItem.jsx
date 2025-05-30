import React from 'react'
import Image from 'next/image'


function CourseItem ({course}) {
  return (
    
    <div className='border rounded-xl hover:shadow-md shadow-purple-300 cursor-pointer'>
      <Image src={course?.banner?.url} 
      width={500}
      height={450}
      alt = "banner"
      className='rounded-t-xl'
      />
      <div className='flex flex-col gap-1 p-1'>
        <h2 className='font-medium'>{course.name}</h2>
        <h2 className='text-[12px] text-gray-400'>{course.author}</h2>
        
        {course.totalchapter == 0?
          <div className='flex gap-2'>
            <Image src='/youtube.png' alt='youtube' width={20} height={20}/>
            <h2 className='text-[14px] text-gray-400'>Watch on youtube</h2>
          </div>:
        <div className='flex gap-2'>
          <Image src='/chapter.png' alt='chapter' width={20} height={20}/>
          <h2 className='text-[14px] text-gray-400'>Chapter</h2>
        </div>
        }
  
        <h2>{course?.free?'Free':'Paid'}</h2>
      </div>
    </div>
  )
}

export default CourseItem
