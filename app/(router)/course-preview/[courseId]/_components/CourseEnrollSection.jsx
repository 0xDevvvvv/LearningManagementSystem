
import globalApi from "@/app/_utils/globalApi";
import  Button  from "@/components/ui/button"
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import React, { useEffect } from 'react'
function CourseEnrollSection({courseInfo,isUserAlreadyEnrolled}) {
    const membership = false 
    const {user} = useUser()
    const router  = useRouter();

    useEffect(()=>{
      console.log("isUserAlreadyEnrolled  : ",isUserAlreadyEnrolled)
    },[])


    const onEnrollCourse = () =>{
        globalApi.enrollToCourse(courseInfo?.slug,user?.primaryEmailAddress.emailAddress)
        .then(resp=>{
          if (resp){
            //show toast on successfull enroll 
            toast("User Enrolled Successfully ", {
              description: "User Enrolled to this course",
            })
            //redirect to watch course
             router.push('/watch-course/'+resp.createUserEnrollCourse.id)
          }
        })
    }

  return (
    <div className='p-3 text-center rounded-sm bg-primary flex flex-col gap-3'>
      <h2 className='text-[22px]
      font-bold text-white'>
        Enroll to the course</h2>
        {/* User has membership and logged in */}
        {user&&(membership||courseInfo.free)&&!isUserAlreadyEnrolled?
        <div className='flex flex-col gap-3 mt-3'>
        <h2 className='text-white
        font-light'>
            Enroll now to start learning and building projects.</h2>
        <Button onClick={()=>onEnrollCourse()} className='bg-white text-primary hover:bg-white hover:text-primary'>Enroll Now</Button>
      </div>
      :!user?
      <div className='flex flex-col gap-3 mt-3'>
        <h2 className='text-white
        font-light'>
            Enroll now to start learning and building projects.</h2>
        <Link href={"/sign-in"}>
          <Button  className='bg-white text-primary hover:bg-white hover:text-primary'>Enroll Now</Button>
        </Link>
      </div>
      :!isUserAlreadyEnrolled&&<div className='flex flex-col gap-3 mt-3'>
                {/* User does not have membership or not log in */}
            <h2 className='text-white
            font-light'>
                Buy Monthly Membership and Get Access to All Courses.</h2>
            <Button className='bg-white text-primary hover:bg-white hover:text-primary'>Buy Membership at $2.99</Button>
            </div>
        }
        {isUserAlreadyEnrolled?
        <div className='flex flex-col gap-3 mt-3'>
        {/* User does not have membership or not log in */}
        <h2 className='text-white
        font-light'>
            Continue to learn your project.</h2>
        <Link href={"/watch-course/"+isUserAlreadyEnrolled}><Button className='bg-white text-primary hover:bg-white hover:text-primary'>Continue</Button></Link>
        </div>:
        <div></div>
    }
    </div>
  )
}
export default CourseEnrollSection;