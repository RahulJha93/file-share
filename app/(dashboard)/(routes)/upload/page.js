"use client"
import React, { useState } from 'react'
import FilePreview from './_components/FilePreview'
import {supabase} from './../../../../supabaseClient'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation';

const FileUploadCard = () => {
  const {user} = useUser()
  const [file, setFile] = useState(null);
  const router = useRouter();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size > 2000000) {
      alert("File size exceeds 2MB!");
      return;
    }
    setFile(selectedFile);
  };

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
          short_url: `${process.env.NEXT_PUBLIC_URL}/file/${data.id}`
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

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg w-96 p-6 text-center">
        <h2 className="text-lg font-bold text-gray-800 mb-2">
          Start <span className="text-blue-500">Uploading</span> File and{" "}
          <span className="text-blue-500">Share</span> it
        </h2>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-blue-50 mb-4">
          <input
            type="file"
            id="fileInput"
            className="hidden"
            onChange={handleFileChange}
          />
          <label
            htmlFor="fileInput"
            className="cursor-pointer flex flex-col items-center text-blue-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mb-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16v2a2 2 0 002 2h14a2 2 0 002-2v-2m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            <span>Click to upload or drag and drop</span>
            <span className="text-sm text-gray-500">
              SVG, PNG, JPG, or GIF (Max Size: 2MB)
            </span>
          </label>
        </div>
        {file && (
          <FilePreview file={file}/>
        )}
        <button
          onClick={handleUpload}
          disabled={!file}
          className={`w-full py-2 rounded-md text-white font-medium ${
            file
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Upload
        </button>
      </div>
    </div>
  );
};

export default FileUploadCard;
