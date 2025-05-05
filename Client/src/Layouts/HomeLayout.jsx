import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/Slices/AuthSlice";

const HomeLayout = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
  const role = useSelector((state) => state?.auth?.role);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  useEffect(() => {
    document.body.style.overflow = isDrawerOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isDrawerOpen]);

  return (
    <div className="min-h-screen bg-gray-900 text-white relative">
      {/* Navbar */}
      <nav className="bg-gray-800 z-30 relative">
        <div className="container mx-auto p-4 flex items-center justify-between md:justify-between">
          {/* Mobile: Hamburger on Left and LMS Logo on Right */}
          <div className="flex w-full justify-between items-center md:hidden">
            {/* Hamburger Icon (left) */}
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

            {/* LMS Logo (right side for mobile view) */}
            <Link to="/" className="text-2xl font-bold text-yellow-400 ml-auto">
              LMS
            </Link>
          </div>

          {/* Desktop: Normal layout */}
          <div className="hidden md:flex w-full items-center justify-between">
            {/* LMS logo */}
            <Link to="/" className="text-2xl font-bold text-yellow-400">
              LMS
            </Link>

            {/* Navigation Links */}
            <div className="flex gap-6 items-center">
              <Link to="/" className="hover:text-yellow-400">
                Home
              </Link>
              {role === "ADMIN" && (
                <Link to="/admin/dashboard" className="hover:text-yellow-400">
                  Admin Dashboard
                </Link>
              )}

              <Link to="/courses" className="hover:text-yellow-400">
                Courses
              </Link>
              <Link to="/about" className="hover:text-yellow-400">
                About
              </Link>
              <Link to="/contactus" className="hover:text-yellow-400">
                Contact
              </Link>

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
          </div>
        </div>
      </nav>

      {/* Drawer - From Left */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 bg-opacity-90 backdrop-blur-md z-50 transform transition-transform duration-300 ease-in-out ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={toggleDrawer}
          className="text-white absolute top-4 right-4 focus:outline-none"
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

        <div className="flex flex-col pt-20 px-6 gap-6">
          <Link to="/" className="hover:text-yellow-400" onClick={toggleDrawer}>
            Home
          </Link>
          {role === "ADMIN" && (
            <Link
              to="/admin/dashboard"
              className="hover:text-yellow-400"
              onClick={toggleDrawer}
            >
              Admin Dashboard
            </Link>
          )}

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
            to="/contactus"
            className="hover:text-yellow-400"
            onClick={toggleDrawer}
          >
            Contact
          </Link>

          {!isLoggedIn ? (
            <div className="mt-6 flex flex-col gap-4">
              <Link
                to="/login"
                className="text-center px-4 py-2 border border-yellow-400 text-yellow-400 rounded-lg hover:bg-yellow-400 hover:text-gray-900"
                onClick={toggleDrawer}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-center px-4 py-2 border border-yellow-400 text-yellow-400 rounded-lg hover:bg-yellow-400 hover:text-gray-900"
                onClick={toggleDrawer}
              >
                Register
              </Link>
            </div>
          ) : (
            <div className="mt-6 flex flex-col gap-4">
              <Link
                to="/profile"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 text-center"
                onClick={toggleDrawer}
              >
                Profile
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  toggleDrawer();
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <main className="relative z-10">{children}</main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomeLayout;
