import axios from "axios";
import { getToken } from "../utils/auth";

// Create shared Axios instance
const api = axios.create({
  baseURL: "http://93.127.194.139:5001/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically attach token to all requests
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 🔐 Define and export reusable login function
export const loginUser = async (formData) => {
  return await api.post("/auth/login", formData);
};

// Add this to your api.js file
export const uploadFile = async (formData) => {
  return await api.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data", // override default JSON
    },
  });
};
export const submitForm = async (payload) => {
  return await api.post("/submit-form", payload);
};

export const getAllSubmissions = async () => {
  return await api.get("/form-submissions");
};
export const getSubmissionById = async (id) => {
  return await api.get(`/form-submissions/${id}`);
};

export const updateSubmission = async (id, payload) => {
  return await api.put(`/form-submissions/${id}`, payload);
};

export const deleteSubmission = async (id) => {
  return await api.delete(`/form-submissions/${id}`);
};

export const getSubmissionCount = async () => {
  return await api.get("/form-submissions-count");
};

export default api;
