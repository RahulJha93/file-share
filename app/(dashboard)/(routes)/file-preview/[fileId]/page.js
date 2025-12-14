"use client";
import React, { useEffect, useState } from "react";
import {supabase} from './../../../../../supabaseClient'
import { useParams } from 'next/navigation'
import { toast } from "react-toastify";
import { Copy, Lock, Mail, Download, Eye } from 'lucide-react';
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
    toast.success("Short URL copied to clipboard!");
  };

  const handleSendMail = () => {
    toast.error("This Service is down !");
  };

  const storePassword =async () => {
    if(password) {
    const { error: updateError } = await supabase
      .from("file-share") // Replace with your table name
      .update({ password: password || "" })
      .eq("file_id", fileData.file_id);

    if (updateError) {
      console.error("Error updating password:", updateError.message);
      toast.error("Error updating password");
      return;
    }

    toast.success("password updated successfully!");
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading file details...</p>
        </div>
      </div>
    );
  }

  if (!fileData) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-destructive mb-2">File not found</p>
          <p className="text-muted-foreground text-sm">The requested file could not be loaded.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">File Preview</h1>
          <p className="text-muted-foreground">Manage your file sharing settings</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
            <Download className="h-4 w-4 mr-2" />
            Download
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* File Preview Card */}
        <div className="lg:col-span-1">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="p-6">
              <div className="space-y-4">
                {/* File Preview */}
                <div className="relative">
                  {fileData?.file_type?.startsWith('image/') ? (
                    <img
                      src={fileData?.file_url}
                      alt={fileData?.file_name || 'File Preview'}
                      className="w-full h-48 object-cover rounded-lg border"
                    />
                  ) : (
                    <div className="w-full h-48 flex items-center justify-center bg-muted rounded-lg border">
                      <div className="text-center">
                        <Eye className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Preview not available</p>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* File Details */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg truncate">
                    {fileData?.file_name || 'Unnamed File'}
                  </h3>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p><span className="font-medium">Type:</span> {fileData?.file_type}</p>
                    <p><span className="font-medium">Size:</span> {(fileData?.file_size/1024/1024).toFixed(2)} MB</p>
                    <p><span className="font-medium">Uploaded:</span> {new Date(fileData?.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Settings Panel */}
        <div className="lg:col-span-2 space-y-4">
          {/* Short URL Card */}
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="flex flex-col space-y-1.5 p-6 pb-4">
              <h3 className="text-lg font-semibold leading-none tracking-tight">Share Link</h3>
              <p className="text-sm text-muted-foreground">Copy this link to share your file</p>
            </div>
            <div className="p-6 pt-0">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={fileData?.short_url || ''}
                  readOnly
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
                <button
                  onClick={copyToClipboard}
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </button>
              </div>
            </div>
          </div>

          {/* Password Protection Card */}
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="flex flex-col space-y-1.5 p-6 pb-4">
              <div className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                <h3 className="text-lg font-semibold leading-none tracking-tight">Password Protection</h3>
              </div>
              <p className="text-sm text-muted-foreground">Add an extra layer of security to your file</p>
            </div>
            <div className="p-6 pt-0 space-y-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="password-toggle"
                  checked={isPasswordEnabled}
                  onChange={(e) => setIsPasswordEnabled(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <label htmlFor="password-toggle" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Enable Password Protection
                </label>
              </div>
              {isPasswordEnabled && (
                <div className="space-y-3">
                  <input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                  <button 
                    onClick={storePassword}
                    className="inline-flex items-center justify-content whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                  >
                    Save Password
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Send Email Card */}
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="flex flex-col space-y-1.5 p-6 pb-4">
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                <h3 className="text-lg font-semibold leading-none tracking-tight">Send via Email</h3>
              </div>
              <p className="text-sm text-muted-foreground">Share your file directly via email</p>
            </div>
            <div className="p-6 pt-0">
              <div className="flex items-center gap-2">
                <input
                  type="email"
                  placeholder="Enter email address"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
                <button
                  onClick={handleSendMail}
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilePreview;
