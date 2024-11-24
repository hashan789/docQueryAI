import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt, faFileAlt } from "@fortawesome/free-solid-svg-icons";

export default function UploadDocForm() {

      const [fileName, setFileName] = useState("");
    
      const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFileName(file ? file.name : "");
      };
    
      return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg border border-gray-200">
          <h2 className="text-xl font-bold mb-4 text-center">Upload Your Document</h2>
          
          {/* Upload Box */}
          <div className="relative border-2 border-dashed border-blue-400 rounded-lg p-6 text-center">
            <input
              type="file"
              id="fileUpload"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <FontAwesomeIcon
              icon={faCloudUploadAlt}
              className="text-blue-400 text-5xl mb-2"
            />
            <p className="text-gray-500 font-medium">
              Drag & drop a file here or click to browse
            </p>
            {fileName && (
              <p className="mt-3 text-green-600">
                <FontAwesomeIcon icon={faFileAlt} className="mr-2" />
                {fileName}
              </p>
            )}
          </div>
    
          {/* Submit Button */}
          <button
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg mt-6 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          >
            Upload
          </button>
        </div>
      );
}
    
