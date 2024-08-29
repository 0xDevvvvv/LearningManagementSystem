import React from 'react'
import Sidenav from './_components/sidenav'


function layout({children}) {
  return (
    <div>
        <div className='sm:w-64 sm:block fixed'>
            <Sidenav />
        </div>
        <div className='ml-64'>
            {children}
        </div>
    </div>
  )
}

export default layout
