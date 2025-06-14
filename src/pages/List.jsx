import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { deleteSubmission, getAllSubmissions } from "../api/axiosInstance"; // make sure the path is correct
import { useNavigate } from "react-router-dom";

const List = () => {
  const [submissions, setSubmissions] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await getAllSubmissions();
        setSubmissions(response.data.submissions);
      } catch (err) {
        console.error("Error loading submissions:", err);
        toast.error("Failed to load submissions");
      }
    };

    fetchSubmissions();
  }, []);

  const renderFilePreview = (url) => {
    if (url.match(/\.(jpeg|jpg|png|gif|webp)$/i)) {
      return (
        <img
          src={url}
          alt="Uploaded"
          className="h-12 w-12 object-cover rounded-md border cursor-pointer hover:scale-105 transition"
          onClick={() => {
            setSelectedFile(url);
            setShowModal(true);
          }}
        />
      );
    } else if (url.match(/\.pdf$/i)) {
      return (
        <div
          className="text-blue-600 underline cursor-pointer text-sm"
          onClick={() => {
            setSelectedFile(url);
            setShowModal(true);
          }}
        >
          📄 View PDF
        </div>
      );
    } else {
      return (
        <div
          className="text-blue-600 underline cursor-pointer text-sm"
          onClick={() => {
            setSelectedFile(url);
            setShowModal(true);
          }}
        >
          📁 View File
        </div>
      );
    }
  };

  const renderModalContent = (url) => {
    if (url.match(/\.(jpeg|jpg|png|gif|webp)$/i)) {
      return (
        <img
          src={url}
          alt="Preview"
          className="max-w-full max-h-[80vh] object-contain"
        />
      );
    } else if (url.match(/\.pdf$/i)) {
      return (
        <iframe
          src={url}
          title="PDF Preview"
          className="w-full h-[80vh] border rounded"
        />
      );
    } else {
      return (
        <div className="text-center text-gray-700">
          <p className="mb-4">This file type cannot be previewed here.</p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Open file in new tab
          </a>
        </div>
      );
    }
  };
  const handleDelete = async (id) => {
    try {
      await deleteSubmission(id);
      toast.success(" Deleted successfully!");
      // Optionally: refresh or filter out deleted entry
      setSubmissions((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      toast.error(" Failed to delete");
      console.error("Delete error:", err);
    }
  };
  return (
    <div style={{ padding: "2rem" }}>
      <table className="min-w-full divide-y divide-gray-200 overflow-x-auto">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Content
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              File
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Submitted
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {submissions.length === 0 ? (
            <tr>
              <td colSpan="5" className="px-6 py-4 text-center text-gray-400">
                No submissions yet.
              </td>
            </tr>
          ) : (
            submissions.map((item) => (
              <tr key={item._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {item.content}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {renderFilePreview(item.fileUrl)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(item.submittedAt).toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    className="text-indigo-600 hover:text-indigo-900 mr-2"
                    onClick={() => navigate(`/form/${item._id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600 hover:text-red-900"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && selectedFile && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center px-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-lg shadow-lg max-w-[95%] max-h-[90%] overflow-hidden p-4"
            onClick={(e) => e.stopPropagation()}
          >
            {renderModalContent(selectedFile)}
            <div className="text-right mt-4">
              <button
                className="text-red-600 hover:underline"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default List;
