
import {gql,request} from "graphql-request"



const MASTER_URl = "https://ap-south-1.cdn.hygraph.com/content/"+process.env.NEXT_PUBLIC_HYGRAPH_API_KEY+"/master"

const getAllCourseList = async ()=>{
    const query = gql `query MyQuery {
  courseLists(first: 20, orderBy: createdAt_DESC) {
    banner(where: {}) {
      url
      id
    }
    author
    demoUrl
    description
    slug
    sourceCode
    youtubeurl
    totalchapter
    name
    free
  }
}`
  const result = await request(MASTER_URl, query);
  return result;
}
const getSideBanner = async() =>{
  const query = gql `query MyQuery {
  sideBanners {
    id
    name
    banner {
      id
      url
    }
    url
  }
}`
  const result = await request(MASTER_URl, query);
  return result;
}
const getCourseByID = async(courseID)=>{
  const query = gql `query MyQuery {
  courseList(where: {slug: "`+courseID+`"}) {
    author
    demoUrl
    description
    free
    youtubeurl
    name
    sourceCode
    chapter {
      video {
        url
      }
      name
      shortDesc
      id
      chapterNo
      youtubeurl
    }
    slug
    totalchapter
  }
}`
  const result = await request(MASTER_URl, query);

  return result;
}
const enrollToCourse = async (courseId , email) =>{
  const query = gql `mutation MyMutation {
  createUserEnrollCourse(
    data: {courseId: "`+courseId+`", userEmail: "`+email+`", courseList: {connect: {slug: "`+courseId+`"}}}
  ) {
    id
  }
  publishManyUserEnrollCoursesConnection {
    edges {
      node {
        id
      }
    }
  }
}`
const result = await request(MASTER_URl, query);

  return result;
}

const checkUserEnrollCourse = async(courseId,email) =>{
  const query = gql `query MyQuery {
  userEnrollCourses(where: {courseId: "`+courseId+`", AND: {userEmail: "`+email+`"}}) {
    id
  }
}`
  const result = await request(MASTER_URl,query);
  return result;
}
const getUserEnrolledCourse = async (id,email) =>{
  const query = gql `query MyQuery {
    userEnrollCourses(where: {id: "`+id+`", userEmail: "`+email+`"}) {
      courseId
      userEmail
       completedChapter {
        ... on CompletedChapter {
          id
          chapterId
        }
      }
      id
      courseList {
        author
        banner {
          url
        }
        chapter {
          id
          name
          shortDesc
          video {
            url
          }
        }
        demoUrl
        description
        free
        id
        name
        sourceCode
        totalchapter
        
      }
    }
}`

  const result = await request(MASTER_URl,query);
  return result;
}

const markChapterCompleted = async(enrollId,chapterId) =>{
  const query = gql `mutation MyMutation {
  updateUserEnrollCourse(
    data: {completedChapter: {create: {CompletedChapter: {data: {chapterId: "`+chapterId+`"}}}}}
    where: {id: "`+enrollId+`"}
  ) {
    id
  }
  publishUserEnrollCourse(where: {id: "`+enrollId+`"}) {
    id
  }
}`
  const result = await request(MASTER_URl,query);
  return result;
}

const getUserAllEnrolledCourseList = async(email) =>{
  const query = gql`
        query MyQuery {
        userEnrollCourses(where: {userEmail: "`+email+`"}) {
          completedChapter {
            ... on CompletedChapter {
              id
              chapterId
            }
          }
          courseId
          courseList {
            id
            name
            sourceCode
            slug
            free
            description
            demoUrl
            chapter(first: 50) {
              id
              name
            }
            author
            banner {
              url
            }
          }
        }
      }
  `
  const result = await request(MASTER_URl,query);
  return result;
  
}


export default {
  getAllCourseList,
  getSideBanner,
  getCourseByID,
  enrollToCourse,
  checkUserEnrollCourse,
  getUserEnrolledCourse,
  markChapterCompleted,
  getUserAllEnrolledCourseList
}