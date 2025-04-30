import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-white px-4 py-10">
      <h1 className="text-7xl sm:text-9xl font-extrabold text-yellow-500 mb-6 animate-pulse">
        404
      </h1>
      <h2 className="text-3xl sm:text-4xl font-semibold mb-4 text-center">
        Oops! Page not found
      </h2>
      <p className="text-lg sm:text-xl text-gray-300 text-center max-w-xl mb-8">
        The page you are looking for doesn’t exist or might have been moved.
        Let’s get you back on track.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-yellow-500 text-gray-900 rounded-lg font-medium hover:bg-yellow-400 transform hover:scale-105 transition-all"
      >
        Back to Home
      </Link>

      {/* Optional image or emoji */}
      <div className="mt-10">
        <img
          src="https://illustrations.popsy.co/gray/website-error.svg"
          alt="404 Illustration"
          className="w-64 sm:w-80"
        />
      </div>
    </div>
  );
};

export default NotFound;
