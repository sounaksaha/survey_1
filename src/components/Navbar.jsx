import React, { Fragment, useState, useEffect } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  XMarkIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../hooks/useAuth.js";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
  const [menu, setMenu] = useState([
    { title: "Dashboard", link: "/dashboard", current: true, id: 1 },
    { title: "Add Rate", link: "./add", current: false, id: 2 },
    { title: "Add Quantity", link: "./total", current: false, id: 3 },
    { title: "Customer", link: "./user", current: false, id: 4 },
  ]);
  const [darkMode, setDarkMode] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(() => navigate("/"));
  };

  useEffect(() => {
    const fetchUnreadCount = async () => {
      const adminId = localStorage.getItem("admin_id");
      if (adminId) {
        try {
          const response = await axios.get(
            `https://gold.riddleescape.in/notification_Count.php?admin_id=${adminId}`
          );
          setUnreadCount(response.data.unread_count);
        } catch (error) {
          console.error("Error fetching notification count:", error);
        }
      }
    };

    fetchUnreadCount();
  }, []);

  const handleMenuClick = (id) => {
    setMenu((prevMenu) =>
      prevMenu.map((item) => ({
        ...item,
        current: item.id === id,
      }))
    );
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Disclosure as="nav" className={`bg-${darkMode ? "gray-900" : "gray-800"}`}>
      {({ open }) => (
        <>
          <div className="mx-auto max-w-9xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex items-center">
                <img className="h-14 w-auto" src="/logo.png" alt="Logo" />
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={toggleDarkMode}
                  className="rounded-full p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                >
                  <span className="sr-only">Toggle dark mode</span>
                  {darkMode ? (
                    <SunIcon className="h-6 w-6" />
                  ) : (
                    <MoonIcon className="h-6 w-6" />
                  )}
                </button>

                <button
                  className="relative rounded-full p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" />
                  {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center h-4 w-4 rounded-full bg-red-600 text-white text-xs font-bold">
                      {unreadCount}
                    </span>
                  )}
                </button>

                <Menu as="div" className="relative ml-3">
                  <Menu.Button className="rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white">
                    <img className="h-8 w-8 rounded-full" src="/logo.png" alt="" />
                  </Menu.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item>
                      {isAuthenticated && (
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={handleLogout}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block w-full text-left px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Sign out
                            </button>
                          )}
                        </Menu.Item>
                      )}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
