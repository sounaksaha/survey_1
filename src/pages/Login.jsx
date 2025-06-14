import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { loginUser } from "../api/axiosInstance";
import toast from "react-hot-toast";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Please enter both email and password.");
      return;
    }

    try {
      const response = await loginUser({ username, password });
      console.log("Login response:", response.data);
      const token = response.data.data.token;

      if (token) {
        toast.success(response.data.message);
        login(() => navigate("/dashboard"), token);
      } else {
        toast.error("Login failed: No token received.");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error?.response?.data?.message || "Login failed.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="text-center">
            <img
              src="https://storage.googleapis.com/devitary-image-host.appspot.com/15846435184459982716-LogoMakr_7POjrN.png"
              className="w-32 mx-auto"
              alt="Survey Logo"
            />
            <h2 className="text-xl font-semibold mt-2">Survey</h2>
          </div>

          <div className="mt-12 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">Sign In</h1>
            <div className="w-full flex-1 mt-8">
              <form onSubmit={handleSubmit} className="mx-auto max-w-xs">
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="email"
                  placeholder="Email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                  <svg
                    className="w-6 h-6 -ml-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <path d="M20 8v6M23 11h-6" />
                  </svg>
                  <span className="ml-3">Sign In</span>
                </button>
                <p className="mt-6 text-xs text-gray-600 text-center">
                  I agree to abide by templatana's{" "}
                  <a href="#" className="border-b border-gray-500 border-dotted">
                    Terms of Service
                  </a>{" "}
                  and its{" "}
                  <a href="#" className="border-b border-gray-500 border-dotted">
                    Privacy Policy
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
