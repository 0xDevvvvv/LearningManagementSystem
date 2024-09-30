import React, { useState } from 'react'
import { Lock, Play } from 'lucide-react'
export default function CourseContentSection({courseInfo, isUserAlreadyEnrolled,watchMode = false,setActiveChapterIndex,completedChapter}) {
    const [activeIndex , setActiveIndex] = useState(0);

    
    // check if chapter completed
    const checkIsChapterCompleted = (chapterId) =>{
      
      return completedChapter.find(item=>item.chapterId == chapterId)
    } 



  return (
    <div className='p-3 bg-white rounded-sm'>
        <h2>Content</h2>
        {courseInfo.chapter.map((item,index)=>(
            <div key={index}>
                <h2 className={`p-2 text-[14px] flex justify-between items-center
                 border rounded-sm px-4 cursor-pointer m-2 
                 hover:bg-gray-200 hover:text-gray-500 
                 ${activeIndex==index&&'bg-primary text-white'}
                 ${watchMode&&checkIsChapterCompleted(item.id)&&
                  'border-green-800 bg-green-400'
                 }
                 ${isUserAlreadyEnrolled&&'hover:bg-primary hover:text-white'}
                 
                 `}
                  onClick={()=>{
                    watchMode&&setActiveChapterIndex(index);
                    watchMode&&setActiveIndex(index);
                  }}
                 >
                    {index+1}.{item.name}
                    {activeIndex==index || isUserAlreadyEnrolled?
                    <Play className='h-4 w-4'/>
                    :<Lock className='h-4 w-4'/>}

                </h2>
            </div>
        ))}
    </div>
  )
}
