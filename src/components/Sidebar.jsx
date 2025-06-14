import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  UserIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  ArrowUpTrayIcon,
  ListBulletIcon
} from "@heroicons/react/24/outline";

const menuItems = [
  { id: 1, title: "Dashboard", link: "/dashboard", icon: HomeIcon },
  { id: 2, title: "Upload", link: "./upload", icon: ArrowUpTrayIcon },
  { id: 3, title: "List", link: "./form", icon: ListBulletIcon },
//   { id: 4, title: "Customer", link: "./user", icon: UserIcon },
];

export default function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <div
      className={`bg-gray-900 text-white h-screen transition-all duration-300 fixed top-0 left-0 bottom-0 ${
        isOpen ? "w-64" : "w-16"
      }`}
    >
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="text-white p-4 rounded focus:outline-none"
      >
        {isOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
      </button>

      {/* Menu Items */}
      <nav className="mt-6">
        {menuItems.map(({ id, title, link, icon: Icon }) => (
          <div key={id} className="relative group">
            <Link
              to={link}
              className="flex items-center p-4 rounded hover:bg-gray-700 transition-all"
            >
              {/* Increase icon size when sidebar is closed */}
              <Icon className={`transition-all ${isOpen ? "w-7 h-7" : "w-6 h-6"}`} />

              {/* Show menu title only when sidebar is open */}
              {isOpen && <span className="ml-3">{title}</span>}
            </Link>

            {/* Tooltip for menu name when sidebar is closed */}
            {!isOpen && (
              <span className="absolute left-14 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                {title}
              </span>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
}