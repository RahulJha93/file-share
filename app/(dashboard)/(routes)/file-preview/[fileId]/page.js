"use client";
import React, { useEffect, useState } from "react";
import {supabase} from './../../../../../supabaseClient'
import { useParams } from 'next/navigation'
const FilePreview = () => {
  const params = useParams()
  const [isPasswordEnabled, setIsPasswordEnabled] = useState(false);
  const [password, setPassword] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [fileData, setFileData] = useState(null);
  const [loading, setLoading] = useState(true);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(fileData?.short_url);
    console.log(shortUrl)
    alert("Short URL copied to clipboard!");
  };

  const handleSendMail = () => {
    alert("Email sent!");
  };

  const storePassword =async () => {
    if(password) {
    const { error: updateError } = await supabase
      .from("file-share") // Replace with your table name
      .update({ password: password || "" })
      .eq("file_id", fileData.file_id);

    if (updateError) {
      console.error("Error updating password:", updateError.message);
      alert("Error updating password");
      return;
    }

    alert("File uploaded, saved, and password updated successfully!");
  }
  }

  const fetchFileData = async (fileId) => {
    if (!fileId) {
        console.error("No fileId provided");
        return;
      }

      try {
        // Fetch data from Supabase where the field matches the given value
        const { data, error } = await supabase
          .from("file-share") // Replace "files" with your Supabase table name
          .select("*")
          .eq("file_id", fileId) // Replace "id" with the actual field you're querying
          .single(); // Fetch a single row if you expect a unique match
        if(data){
            console.log(data);
        }
        if (error) {
          console.error("Error fetching file data:", error);
        } else {
          setFileData(data);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
      } finally {
        setLoading(false);
      }
    };

    useEffect(()=>{
        fetchFileData(params?.fileId)
    },[params?.fileId])

  return (
    <div className="flex flex-col lg:flex-row gap-4 p-4">
      {/* Right Side */}
      <div className="flex flex-col items-center justify-start w-full lg:w-1/3">
        <div className="w-full border rounded-lg p-4">
          <img
            src={fileData?.file_url} // Replace with dynamic image source
            alt="File Preview"
            className="w-full h-64 object-cover mb-4 rounded-lg"
          />
          <h2 className="text-lg font-bold text-center">Example Image</h2>
          <p className="text-sm text-gray-500 text-center">Type: {fileData?.file_type}</p>
          <p className="text-sm text-gray-500 text-center">Size: {fileData?.file_size/1024/1024}</p>
        </div>
      </div>

      {/* Left Side */}
      <div className="flex flex-col w-full lg:w-2/3 space-y-4">
        {/* Short URL Input */}
        <div className="flex flex-col">
          <label className="mb-2 font-medium">Short Url</label>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={fileData?.short_url}
              readOnly
              className="flex-1 border rounded px-2 py-1"
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={copyToClipboard}
            >
              Copy
            </button>
          </div>
        </div>

        {/* Password Protection */}
        <div className="flex flex-col">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={isPasswordEnabled}
              onChange={(e) => setIsPasswordEnabled(e.target.checked)}
              className="w-4 h-4"
            />
            <label>Enable Password Protection</label>
          </div>
          {isPasswordEnabled && (
            <div className="mt-2">
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border rounded px-2 py-1 w-full"
              />
              <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded" onClick={storePassword}>
                Save
              </button>
            </div>
          )}
        </div>

        {/* Send Email */}
        <div className="flex flex-col">
          <label className="mb-2 font-medium">Send to Email</label>
          <div className="flex items-center space-x-2">
            <input
              type="email"
              placeholder="Enter email address"
              className="flex-1 border rounded px-2 py-1"
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={handleSendMail}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilePreview;
