import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content Area */}
      <div
        className={`flex flex-col flex-1 h-screen transition-all duration-300 ${
          isOpen ? "ml-64" : "ml-16"
        }`}
      >
        {/* Header */}
        <Header />

        {/* Main Content and Footer */}
        <div className="flex flex-1 flex-col">
          <div className="flex-1 bg-gray-200 overflow-y-auto p-4">
            <Outlet />
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Layout;
