"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "../../../../supabaseClient";
const Files = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  // const filteredFiles = files.filter((file) =>
  //   file.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const { data, error } = await supabase.from("file-share").select("*"); 
        if(data){
          console.log(data);
        }
        if (error) {
          console.error("Error fetching files:", error);
        } else {
          setFiles(data);
        }
      } catch (err) {
        console.error("Unexpected error fetching files:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Files</h1>
      
      {/* Search Bar */}
      <div className="mb-4 flex">
        <input
          type="text"
          placeholder="Search files..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 flex-grow"
        />
        <button
          onClick={() => console.log("Search initiated for:", searchTerm)}
          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      {/* Files Table */}
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Filename</th>
            <th className="border border-gray-300 px-4 py-2">Type</th>
            <th className="border border-gray-300 px-4 py-2">Size</th>
            <th className="border border-gray-300 px-4 py-2">View</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file) => (
            <tr key={file.id}>
              <td className="border border-gray-300 px-4 py-2">{file.file_name}</td>
              <td className="border border-gray-300 px-4 py-2">{file.file_type}</td>
              <td className="border border-gray-300 px-4 py-2">{file.file_size}</td>
              <td className="border border-gray-300 px-4 py-2">
                <a
                  href={file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  View
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {files.length === 0 && (
        <p className="text-gray-500 mt-4">No files found.</p>
      )}
    </div>
  );
};

export default Files;
