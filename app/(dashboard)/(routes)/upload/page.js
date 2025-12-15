"use client"
import React, { useState } from 'react'
import FilePreview from './_components/FilePreview'
import {supabase} from './../../../../supabaseClient'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation';
import { toast } from "react-toastify";
import { Upload, File } from 'lucide-react';

const FileUploadCard = () => {
  const {user} = useUser()
  const [file, setFile] = useState(null);
  const router = useRouter();
  const [loading,setLoading] = useState(false)

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size > 2000000) {
      toast.error("File size exceeds 2MB!");
      return;
    }
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    console.log('🚀 Upload started');
    console.log('📁 File details:', {
      name: file?.name,
      size: file?.size,
      type: file?.type
    });
    console.log('👤 User details:', {
      email: user?.primaryEmailAddress?.emailAddress,
      name: user?.fullName
    });
    console.log('🔧 Environment:', {
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
      nextUrl: process.env.NEXT_PUBLIC_URL
    });

    setLoading(true)
    if(!file){
      console.log('❌ No file selected');
      toast.error("Please select a file")
      return;
    }
    
    try {
      console.log('📤 Attempting to upload to Supabase storage...');
      const { data, error } = await supabase.storage
        .from('uploads') // Using your existing bucket name
        .upload(`${file.name}`, file)
  
      console.log('📤 Storage upload response:', { data, error });

      if (error) {
        console.error('❌ Storage upload error:', error);
        toast.error(`Error uploading file: ${error.message}`)
        return
      }

      console.log('✅ File uploaded to storage successfully!');
      console.log('💾 Now inserting into database...');

      const fileUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/uploads/${data.fullPath}`;
      console.log('🔗 Generated file URL:', fileUrl);

      const dbPayload = {
        file_id: data.id,
        file_name: file.name,
        file_size: file.size,
        file_type: file.type,
        file_url: fileUrl,
        user_email: user.primaryEmailAddress.emailAddress,
        user_name: user.fullName,
        password: '',
        short_url: `${process.env.NEXT_PUBLIC_URL}/file/${data.id}`
      };
      
      console.log('💾 Database payload:', dbPayload);

      const { error: dbError } = await supabase
      .from('file-share') // Replace with your table name
      .insert([dbPayload]);

      console.log('💾 Database insert response:', { dbError });

      if (dbError) {
        console.error('❌ Database insert error:', dbError);
        toast.error(`Database error: ${dbError.message}`);
        return;
      }
  
      console.log('🎉 Everything successful!');
      toast.success("File uploaded and saved successfully!");
      router.push(`/file-preview/${data.id}`);

    } catch (error) {
      console.error('💥 Unexpected error:', error);
      toast.error(`Unexpected error: ${error.message}`)
    } finally {
      setLoading(false);
    }

  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="w-full max-w-md">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="text-2xl font-semibold leading-none tracking-tight text-center">
              Start <span className="text-primary">Uploading</span> File and{" "}
              <span className="text-primary">Share</span> it
            </h3>
          </div>
          <div className="p-6 pt-0">
            <div className="border-2 border-dashed border-border rounded-lg p-8 bg-muted/20 mb-4 transition-colors hover:bg-muted/30">
              <input
                type="file"
                id="fileInput"
                className="hidden"
                onChange={handleFileChange}
              />
              <label
                htmlFor="fileInput"
                className="cursor-pointer flex flex-col items-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <Upload className="h-12 w-12 mb-4" />
                <span className="text-lg font-medium mb-2">Click to upload or drag and drop</span>
                <span className="text-sm">
                  SVG, PNG, JPG, or GIF (Max Size: 2MB)
                </span>
              </label>
            </div>
            {file && (
              <div className="mb-4 p-4 border rounded-lg bg-muted/20">
                <div className="flex items-center gap-3">
                  <File className="h-8 w-8 text-primary" />
                  <div>
                    <p className="font-medium">{file.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
              </div>
            )}
            <button
              onClick={handleUpload}
              disabled={!file || loading}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
            >
              {loading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUploadCard;
