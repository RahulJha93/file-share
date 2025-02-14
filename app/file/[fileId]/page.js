"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import {supabase} from './../../../supabaseClient'
const FileView = () => {
  const params = useParams();
  const [password, setPassword] = useState("");
  const [fileData, setFileData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const validatePasswordAndDownload = async () => {
    try {
      // Validate the password by querying only the necessary field
      const { data, error } = await supabase
        .from("file-share")
        .select("password, file_url")
        .eq("file_id", params?.fileId)
        .single();

      if (error) {
        console.error("Error validating password:", error);
        alert("Error fetching file details");
        return;
      }

      if (data.password !== password) {
        alert("Incorrect password");
        return;
      }

      // // Generate signed URL for secure file download
      // const { data: signedUrlData, error: signedUrlError } = await supabase.storage
      //   .from("file-share") // Replace with your bucket name
      //   .createSignedUrl(data.file_url, 60); // 60 seconds expiry for signed URL

      // if (signedUrlError) {
      //   console.error("Error generating signed URL:", signedUrlError);
      //   alert("Error generating download link");
      //   return;
      // }

      // Trigger file download
      const link = document.createElement("a");
      link.href = data.file_url;
      link.download = data.file_name || "download";
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading file:", error);
      alert("Error downloading the file!");
    }
  };

  const fetchFileData = async (fileId) => {
    setLoading(true)
    if (!fileId) {
      console.error("No fileId provided");
      return;
    }

    try {
      // Fetch data from Supabase where the field matches the given value
      const { data, error } = await supabase
        .from("file-share") // Replace "files" with your Supabase table name
        .select("file_name, file_size, file_type")
        .eq("file_id", fileId) // Replace "id" with the actual field you're querying
        .single(); // Fetch a single row if you expect a unique match
      if (data) {
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

  useEffect(() => {
    fetchFileData(params?.fileId);
  }, [params?.fileId]);

  if(loading) {
   return <div>Loading....</div>
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-96 text-center">
        <h2 className="text-blue-600 font-bold text-lg mb-2">
          Tubeguruji{" "}
          <span className="text-gray-700">Shared the file with You</span>
        </h2>
        <p className="text-gray-500 text-sm mb-6">Find File details below</p>
        <div className="flex justify-center mb-6">
          <img
            src="https://via.placeholder.com/100" // Replace with your file icon/image
            alt="File Icon"
            className="w-20"
          />
        </div>
        <p className="text-gray-800 font-medium text-sm mb-1">
         {fileData?.file_name} ⚡ {fileData?.file_type} ⚡ {(fileData?.file_size/1024/1024).toFixed(2)}mb
        </p>
        <div className="mt-4">
          <input
            type="password"
            placeholder="Enter password to access"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
          />
          <button
            onClick={validatePasswordAndDownload}
            disabled={!password}
            className={`w-full py-2 rounded-lg text-white font-medium ${
              password
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            <span className="flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Download
            </span>
          </button>
        </div>
        <p className="text-gray-500 text-xs mt-4">
          *Terms and Conditions apply
        </p>
      </div>
    </div>
  );
};

export default FileView;
