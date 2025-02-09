"use client"
import React, { useState } from 'react'
import FilePreview from './_components/FilePreview'
import {supabase} from './../../../../supabaseClient'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation';


const Upload = () => {
  const {user} = useUser()
  const [file,setFile ] = useState()
  const router = useRouter();
  
  const handleUpload = async () => {
    if(!file){
      alert("Please select a file")
      return;
    }
    try {
      const { data, error } = await supabase.storage
        .from('file-share') // Replace with your bucket name
        .upload(`uploads/${file.name}`, file)
  
      if (error) {
        console.error("Error uploading file:", error.message)
        alert("Error uploading file")
        return
      }
  
      console.log("File uploaded successfully:", data)
      console.log("file",file)
      alert("File uploaded successfully")
      const { error: dbError } = await supabase
      .from('file-share') // Replace with your table name
      .insert([
        {
          file_id:data.id,
          file_name: file.name,
          file_size:file.size,
          file_type: file.type,
          file_url: "https://dfwimqfrvktdqtitagzq.supabase.co/storage/v1/object/public/"+data.fullPath,
          user_email:user.primaryEmailAddress.emailAddress,
          user_name:user.fullName,
          password:'',
          short_url: "http://localhost:3000/"+data.id
        },
      ]);
      if (dbError) {
        console.error("Error saving file info to database:", dbError.message);
        alert("Error saving file info");
        return;
      }
  
      alert("File uploaded and saved successfully!");
      router.push(`/file-preview/${data.id}`);

    } catch (error) {
      console.error("Unexpected error:", error)
      alert("Unexpected error occurred")
    }

  }
  const handleFileChange = (e) => {
    const file = e.target.files[0]

    if(file && file.size>2000000){
      console.log("file size is greater than 2mb")
      return;
    }
    setFile(file)

  }
  return (
    <div>
     <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md text-center">
        <h1 className="text-xl font-bold mb-4">Start uploading file and share it</h1>
        <input
          type="file"
          onChange={handleFileChange}
          className="mb-4 w-full border border-gray-300 rounded-md p-2"
        />
        <FilePreview file={file}/>
        <button
          onClick={handleUpload}
          disabled={!file}
          className={`${
            !file ? "bg-gray-400 cursor-not-allowed" : "bg-[#5570CB] hover:bg-[#4359a8]"
          } text-white py-2 px-4 rounded-md w-full transition-colors`}
        >
          Upload File
        </button>
      </div>
    </div>
    </div>
  )
}

export default Upload