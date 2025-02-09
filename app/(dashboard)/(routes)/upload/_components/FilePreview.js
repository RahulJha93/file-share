import React from 'react'
// import {X} from 'lucide-react'

const FilePreview = ({file}) => {
  return (
    <div className='m-2 flex items-center'>
        <div className='bg-slate-200'>
        <h2>{file?.name}</h2>
        <h2>{file?.type}</h2>
        <h2>{(file?.size/1024/1024).toFixed(2)} mb</h2>
        {/* <X/> */}
        </div>
    </div>
  )
}

export default FilePreview
