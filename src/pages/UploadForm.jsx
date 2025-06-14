import React, { useEffect, useState } from "react";
import {
  getSubmissionById,
  submitForm,
  updateSubmission,
  uploadFile,
} from "../api/axiosInstance";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const res = await getSubmissionById(id);
          const { name, content, fileUrl } = res.data.submission;
          setName(name);
          setContent(content);
          setUploadedUrl(fileUrl);
        } catch (err) {
          console.error("Failed to load submission", err);
          toast.error("Unable to load form data.");
        }
      }
    };
    fetchData();
  }, [id]);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    setFile(selectedFile);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setIsUploading(true);
      const response = await uploadFile(formData);
      const { fileUrl } = response.data;
      toast.success("File uploaded successfully!");
      setUploadedUrl(fileUrl);
    } catch (err) {
      console.error("❌ Upload error:", err);
      toast.error("❌ Upload failed.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      handleFileChange({ target: { files: [droppedFile] } });
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const truncateFileName = (name, maxLength = 30) => {
    if (!name) return "";
    return name.length > maxLength ? name.slice(0, maxLength) + "..." : name;
  };

  const renderPreviewIcon = () => {
    if (!uploadedUrl) return null;

    if (uploadedUrl.match(/\.(jpeg|jpg|png|gif|webp|png)$/i)) {
      return (
        <img
          src={uploadedUrl}
          alt="preview"
          className="w-10 h-10 rounded-md object-cover mr-2 border"
        />
      );
    } else if (uploadedUrl.match(/\.pdf$/i)) {
      return (
        <img
          src="https://cdn-icons-png.flaticon.com/512/337/337946.png"
          alt="PDF"
          className="w-8 h-8 mr-2"
        />
      );
    } else {
      return (
        <img
          src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
          alt="file"
          className="w-8 h-8 mr-2"
        />
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!uploadedUrl) {
      toast.error("Please upload a file first.");
      return;
    }

    const payload = { name, content, fileUrl: uploadedUrl };

    try {
      if (id) {
        await updateSubmission(id, payload);
        toast.success("Form updated successfully!");
      } else {
        await submitForm(payload);
        toast.success("Form submitted successfully!");
        navigate("/dashboard/form");
      }

      setFile(null);
      setUploadedUrl("");
      setName("");
      setContent("");
      document.getElementById("file").value = null;
    } catch (err) {
      toast.error("Failed to submit the form.");
      console.error("Submit error:", err);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <div className="flex items-center justify-center p-12">
        <div className="mx-auto w-full max-w-[550px] bg-white">
          <form onSubmit={handleSubmit} className="py-6 px-9">
            <div className="mb-5">
              <label htmlFor="name" className="mb-3 block text-base font-medium text-[#07074D]">
                Name:
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-md border border-[#e0e0e0] py-3 px-6 text-base text-[#6B7280] focus:outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>

            <div className="mb-5">
              <label htmlFor="content" className="mb-3 block text-base font-medium text-[#07074D]">
                Content:
              </label>
              <input
                type="text"
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full rounded-md border border-[#e0e0e0] py-3 px-6 text-base text-[#6B7280] focus:outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>

            <div className="mb-6 pt-4">
              <label className="mb-5 block text-xl font-semibold text-[#07074D]">
                Upload File
              </label>
              <div className="mb-8">
                <input
                  type="file"
                  id="file"
                  className="sr-only"
                  onChange={handleFileChange}
                />
                <label
                  htmlFor="file"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  className={`relative flex min-h-[200px] items-center justify-center rounded-md border-2 border-dashed p-12 text-center transition ${
                    isDragging ? "border-[#6A64F1] bg-indigo-50" : "border-[#e0e0e0] bg-white"
                  }`}
                >
                  {isUploading ? (
                    <div className="flex flex-col items-center justify-center">
                      <svg
                        className="animate-spin h-8 w-8 text-[#6A64F1] mb-2"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8H4z"
                        ></path>
                      </svg>
                      <p className="text-[#6B7280] text-sm">Uploading...</p>
                    </div>
                  ) : (
                    <div>
                      <span className="mb-2 block text-xl font-semibold text-[#07074D]">
                        Drop files here
                      </span>
                      <span className="mb-2 block text-base font-medium text-[#6B7280]">Or</span>
                      <span className="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]">
                        Browse
                      </span>
                    </div>
                  )}
                </label>
              </div>

              {uploadedUrl && (
                <div className="mb-5 rounded-md bg-[#F5F7FB] py-4 px-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {renderPreviewIcon()}
                      <span
                        title={file?.name || uploadedUrl.split("/").pop()}
                        className="text-base font-medium text-[#07074D]"
                      >
                        {truncateFileName(file?.name || uploadedUrl.split("/").pop())}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setFile(null);
                        setUploadedUrl("");
                        document.getElementById("file").value = null;
                      }}
                      className="text-[#07074D]"
                    >
                      ❌
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white"
              >
                Send File
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadForm;
