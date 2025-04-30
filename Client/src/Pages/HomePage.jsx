// src/pages/HomePage.jsx

import React from "react";
import HomeLayout from "../Layouts/HomeLayout";
import { Link } from "react-router-dom";
import HomeMainImage from "../Assets/Images/homePageMainImage.png";

export const HomePage = () => {
  return (
    <HomeLayout>
      <section className="bg-gradient-to-b from-gray-900 to-black min-h-[90vh] flex items-center justify-center py-16 px-6 md:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-6 text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-white tracking-tight">
              Discover Top-Quality{" "}
              <span className="text-yellow-500">Online Courses</span>
            </h1>
            <p className="text-lg text-gray-300 max-w-xl mx-auto md:mx-0">
              Unlock your potential with expert-led courses designed for
              real-world success. Affordable, flexible, and trusted by learners
              worldwide.
            </p>
            <div className="flex justify-center md:justify-start gap-6 mt-6">
              <Link
                to="/courses"
                className="px-8 py-4 bg-yellow-500 text-white hover:bg-yellow-400 font-semibold rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105"
              >
                Browse Courses
              </Link>
              <Link
                to="/contactus"
                className="px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-black font-semibold rounded-xl transform transition-all duration-300 hover:scale-105"
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Right Content (Image) */}
          <div className="hidden md:block">
            <img
              src={HomeMainImage}
              alt="Online Learning"
              className="w-[90%] h-[60vh] max-w-sm mx-auto animate-fade-in-up rounded-lg shadow-xl"
            />
          </div>
        </div>
      </section>
    </HomeLayout>
  );
};
