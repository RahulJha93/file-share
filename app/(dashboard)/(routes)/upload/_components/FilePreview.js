import React from 'react'
// import {X} from 'lucide-react'

const FilePreview = ({file}) => {
  return (
    // <div className='m-2 flex items-center'>
    //     <div className='bg-slate-200'>
    //     <h2>{file?.name}</h2>
    //     <h2>{file?.type}</h2>
    //     <h2>{(file?.size/1024/1024).toFixed(2)} mb</h2>
    //     {/* <X/> */}
    //     </div>
    // </div>
    <>
    <div className="text-gray-600 text-sm mb-4">
            Selected File: <strong>{file.name}</strong>
    </div>
    <div className="text-gray-600 text-sm mb-4 flex gap-4 justify-center">
       <div>
             File Type: <strong>{file.type}</strong>
            </div>
            <div>
             File Size: <strong>{(file.size/1024/1024).toFixed(2)}mb</strong>
            </div>
    </div>
    </>
  )
}

export default FilePreview
