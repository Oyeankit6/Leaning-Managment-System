// src/Layouts/HomeLayout.jsx

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/Slices/AuthSlice";

const HomeLayout = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
  const role = useSelector((state) => state?.auth?.role);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleLogout = () => {
    dispatch(logout()); // This should clear user data from Redux
    navigate("/"); // Redirect to home or login after logout
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navbar */}
      <nav className="bg-gray-800">
        <div className="container mx-auto p-4 flex items-center justify-between">
          {isLoggedIn && role === "ADMIN" && (
            <li>
              <Link
                to="/admin/dashboard"
                className="text-yellow-400 font-semibold hover:text-yellow-300"
              >
                Admin Dashboard
              </Link>
            </li>
          )}
          <Link to="/" className="text-2xl font-bold text-yellow-400">
            LMS
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-6 items-center">
            <Link to="/" className="hover:text-yellow-400">
              Home
            </Link>
            <Link to="/courses" className="hover:text-yellow-400">
              Courses
            </Link>
            <Link to="/about" className="hover:text-yellow-400">
              About
            </Link>
            <Link to="/contact" className="hover:text-yellow-400">
              Contact
            </Link>

            {/* Login/Register Buttons for Desktop */}
            {!isLoggedIn ? (
              <div className="flex gap-4">
                <Link
                  to="/login"
                  className="px-4 py-2 bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-300"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-300"
                >
                  Register
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  to="/profile"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Icon */}
          <div className="md:hidden">
            <button
              onClick={toggleDrawer}
              className="text-white focus:outline-none"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-75 z-50 md:hidden"
          onClick={toggleDrawer}
        />
      )}
      <div
        className={`fixed inset-y-0 right-0 bg-gray-900 w-64 p-6 transform transition-transform duration-300 ease-in-out z-50 md:hidden ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          onClick={toggleDrawer}
          className="text-white absolute top-4 left-4 focus:outline-none"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
        <div className="flex flex-col pt-10 gap-6">
          <Link to="/" className="hover:text-yellow-400" onClick={toggleDrawer}>
            Home
          </Link>
          <Link
            to="/courses"
            className="hover:text-yellow-400"
            onClick={toggleDrawer}
          >
            Courses
          </Link>
          <Link
            to="/about"
            className="hover:text-yellow-400"
            onClick={toggleDrawer}
          >
            About
          </Link>
          <Link
            to="/contact"
            className="hover:text-yellow-400"
            onClick={toggleDrawer}
          >
            Contact
          </Link>
        </div>
        {!isLoggedIn ? (
          <div className="mt-6">
            <Link
              to="/login"
              className="block text-center text-yellow-400 py-2 px-4 border border-yellow-400 rounded-lg hover:bg-yellow-400 hover:text-gray-900"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="block text-center text-yellow-400 py-2 px-4 border border-yellow-400 rounded-lg mt-4 hover:bg-yellow-400 hover:text-gray-900"
            >
              Register
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link
              to="/profile"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
            >
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500"
            >
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomeLayout;
