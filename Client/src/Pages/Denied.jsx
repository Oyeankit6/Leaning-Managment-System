import React from "react";
import { useNavigate } from "react-router-dom";

export const Denied = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-4">
      <h1 className="text-6xl font-bold text-red-500 mb-4">Access Denied</h1>
      <p className="text-lg text-gray-400 mb-8 text-center max-w-md">
        Oops! You don't have the necessary permissions to access this page.
        Please login with an admin account.
      </p>

      <button
        onClick={handleGoBack}
        className="inline-block px-6 py-3 bg-yellow-400 text-black font-semibold rounded-md hover:bg-yellow-500 transition"
      >
        Go Back
      </button>

      {/* Optional Image */}
      <div className="mt-10">
        <img
          src="https://cdn-icons-png.flaticon.com/512/1828/1828843.png"
          alt="Access Denied"
          className="w-40 opacity-70"
        />
      </div>
    </div>
  );
};
