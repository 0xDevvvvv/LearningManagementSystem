import React from 'react'

export default function VideoPlayer({videoUrl,poster}) {
  return (
    <video width={1000}
     height={250}
      key = {videoUrl}
     controls className='rounded-sm' poster={poster}>
        <source src={videoUrl} type="video/mp4" />
    </video>
  )
}
