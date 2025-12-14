"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import {supabase} from './../../../supabaseClient'
import { toast } from "react-toastify";
import { Download, Lock, FileText, Image as ImageIcon, Video, Music, Archive } from 'lucide-react';
const FileView = () => {
  const params = useParams();
  const [password, setPassword] = useState("");
  const [fileData, setFileData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const getFileIcon = (fileType) => {
    if (!fileType) return FileText;
    
    if (fileType.startsWith('image/')) return ImageIcon;
    if (fileType.startsWith('video/')) return Video;
    if (fileType.startsWith('audio/')) return Music;
    if (fileType.includes('zip') || fileType.includes('rar') || fileType.includes('7z')) return Archive;
    return FileText;
  };
  
  const formatFileSize = (bytes) => {
    if (!bytes) return '0 B';
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };
  
  const validatePasswordAndDownload = async () => {
    try {
      // Validate the password by querying only the necessary field
      const { data, error } = await supabase
        .from("file-share")
        .select("password, file_url, file_name")
        .eq("file_id", params?.fileId)
        .single();

      if (error) {
        toast.error("Error fetching file details");
        return;
      }

      // Check if password is required and validate it
      if (data.password && data.password !== password) {
        toast.error("Incorrect password");
        return;
      }

      // Trigger file download
      toast.success("Starting download...");
      const link = document.createElement("a");
      link.href = data.file_url;
      link.download = data.file_name || "download";
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      toast.error("Error downloading the file!");
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
        .select("file_name, file_size, file_type, password, created_at")
        .eq("file_id", fileId) // Replace "id" with the actual field you're querying
        .single(); // Fetch a single row if you expect a unique match
     
      if (error) {
        console.error("Error fetching file data:", error);
        toast.error("File not found");
      } else {
        setFileData(data);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFileData(params?.fileId);
  }, [params?.fileId]);

  if(loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">Loading file details...</p>
        </div>
      </div>
    );
  }

  if (!fileData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">File Not Found</h2>
          <p className="text-slate-600 dark:text-slate-400">The requested file could not be found or may have been deleted.</p>
        </div>
      </div>
    );
  }

  const FileIcon = getFileIcon(fileData?.file_type);
  const isPasswordProtected = fileData?.password && fileData.password.trim() !== '';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Main Card */}
        <div className="bg-white dark:bg-slate-800 shadow-xl rounded-2xl p-8 border border-slate-200 dark:border-slate-700">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="w-8 h-8 bg-slate-900 dark:bg-white rounded-md flex items-center justify-center">
                <span className="text-white dark:text-slate-900 font-bold text-sm">SP</span>
              </div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                SHARE<span className="text-blue-600">PANDA</span>
              </h1>
            </div>
            <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">
              Shared the file with You
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Find file details below
            </p>
          </div>

          {/* File Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center">
              <FileIcon className="w-10 h-10 text-blue-600 dark:text-blue-400" />
            </div>
          </div>

          {/* File Details */}
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 break-words">
              {fileData?.file_name}
            </h3>
            <div className="flex items-center justify-center gap-3 text-sm text-slate-600 dark:text-slate-400">
              <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded-full">
                {fileData?.file_type}
              </span>
              <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded-full">
                {formatFileSize(fileData?.file_size)}
              </span>
            </div>
            {fileData?.created_at && (
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                Shared on {new Date(fileData.created_at).toLocaleDateString()}
              </p>
            )}
          </div>

          {/* Password Input (if required) */}
          {isPasswordProtected && (
            <div className="mb-6">
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="password"
                  placeholder="Enter password to access"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
              </div>
            </div>
          )}

          {!isPasswordProtected && (
            <div className="mb-6">
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-3">
                <p className="text-green-800 dark:text-green-200 text-sm text-center">
                  ✅ No password required - Click download to start
                </p>
              </div>
            </div>
          )}

          {/* Download Button */}
          <button
            onClick={validatePasswordAndDownload}
            className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            Download File
          </button>

          {/* Footer */}
          <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-6">
            *Terms and Conditions apply
          </p>
        </div>

        {/* Security Info */}
        <div className="mt-6 text-center">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            🔒 Secure file sharing powered by SharePanda
          </p>
        </div>
      </div>
    </div>
  );
};

export default FileView;
