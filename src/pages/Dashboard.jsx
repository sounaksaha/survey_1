import React, { useEffect, useState } from "react";
import { getSubmissionCount } from "../api/axiosInstance";

const Dashboard = () => {
  const [count, setCount] = useState("");

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await getSubmissionCount();
        setCount(response.data.count);
        console.log("Total submissions:", response.data.count);
      } catch (error) {
        console.error("Failed to fetch submission count", error);
      }
    };

    fetchCount();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <div className="grid grid-cols-1 gap-4 px-4 mt-8 sm:grid-cols-4 sm:px-8">
        {/* Uploaded Document */}
        <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
          <div className="p-4">
            <img
              src="/upload.png"
              alt="upload icon"
              className="w-12 h-12 object-contain"
            />
          </div>
          <div className="px-4 text-gray-700">
            <h3 className="text-sm tracking-wider">Uploaded Document</h3>
            <p className="text-3xl">{count}</p>
          </div>
        </div>

        {/* Total Post */}
        <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
          <div className="p-4 bg-blue-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 
                01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 
                01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 
                002 2h8a2 2 0 002-2v-2" />
            </svg>
          </div>
          <div className="px-4 text-gray-700">
            <h3 className="text-sm tracking-wider">Total Post</h3>
            <p className="text-3xl">{count}</p>
          </div>
        </div>

        {/* Total Comment */}
        <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
          <div className="p-4 bg-indigo-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M17 8h2a2 2 0 012 2v6a2 2 0 
                01-2 2h-2v4l-4-4H9a1.994 1.994 0 
                01-1.414-.586m0 0L11 14h4a2 2 0 
                002-2V6a2 2 0 00-2-2H5a2 2 0 
                00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
            </svg>
          </div>
          <div className="px-4 text-gray-700">
            <h3 className="text-sm tracking-wider">Total Comment</h3>
            <p className="text-3xl">–</p>
          </div>
        </div>

        {/* Server Load */}
        <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
          <div className="p-4 bg-red-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 
                8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 
                8-4M4 7c0-2.21 3.582-4 8-4s8 
                1.79 8 4m0 5c0 2.21-3.582 4-8 
                4s-8-1.79-8-4" />
            </svg>
          </div>
          <div className="px-4 text-gray-700">
            <h3 className="text-sm tracking-wider">Server Load</h3>
            <p className="text-3xl">–</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
