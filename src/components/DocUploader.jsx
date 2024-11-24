import React, { useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt, faFileAlt } from "@fortawesome/free-solid-svg-icons";
import TypingResponse from './TypingResponse';

export default function DocUploader() {

  const [files, setFiles] = useState([]);
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle file selection
  const handleFileChange = (event) => {
    const fileName = event.target.files;
    console.log(Array.from(fileName));
    setFiles(fileName ? Array.from(fileName) : "");
  };

  // Handle query input
  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  // Submit the file and query
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!files || !query) {
      alert("Please upload a file and enter a query.");
      return;
    }

    setResponse(`Processing...`);

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });
    formData.append("query", query);

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:8080/api/azure_data", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response);
      setResponse(response.data); // Assuming backend returns an "answer" field
    } catch (error) {
      console.error("Error:", error);
      setResponse("An error occurred while processing your request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='container font-poppins'>
      <div className="flex justify-center items-center mt-4">
        <div>
            <h1 className='text-2xl font-bold mb-8 text-center'>Document Query Interface</h1>
            <form onSubmit={handleSubmit} className="flex justify-center gap-10 items-center">
                <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg border border-gray-200">
                <div>
                  <h2 className="text-xl font-bold mb-4">Upload Your Document</h2>
                  
                  {/* Upload Box */}
                  <div className="relative border-2 border-dashed border-blue-400 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      name="files"
                      id="fileUpload"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      multiple
                    />
                    <FontAwesomeIcon
                      icon={faCloudUploadAlt}
                      className="text-blue-400 text-5xl mb-2"
                    />
                    <p className="text-gray-500 font-medium">
                      Drag & drop a file here or click to browse
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <strong className="text-xl font-bold mb-4">Uploaded files</strong>
                  {files.length !== 0 ? <div>
                              {
                                files.map((file,id) => {
                                  return(
                                    <p key={id} className="mt-3 text-sm text-green-600">
                                      <FontAwesomeIcon icon={faFileAlt} className="mr-2" />
                                      {file.name}
                                    </p>
                                  )
                                  }
                                )
                            }
                            </div> : <h4 className='text-center text-sm mt-3 text-black'>No files uploaded.</h4>
                    }
                </div>
                <div className='mt-8'>
                    <label>
                        <strong className='text-xl font-bold'>Enter Query </strong>
                    </label>
                    <input
                        type="text"
                        value={query}
                        onChange={handleQueryChange}
                        placeholder="Ask a question based on the document"
                        className='border border-gray-300 rounded-md mt-3 p-3 w-full'
                    />
                    <div className='mt-1'>
                    <button type="submit" className='bg-blue-500 text-white w-full py-2 px-4 rounded-lg mt-6 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75'>
                        {loading ? "Processing..." : "Submit"}
                    </button>
                    </div>
                </div>
                </div>
                <div>
                </div>
            </form>
        </div>
        <div className='overflow-y-scroll rounded-lg shadow-lg border border-gray-200' style={{
          width : '750px',
          height : '500px'
        }}>
              <TypingResponse response={response} />
        </div>
      </div>
    </div>
  )
}
