import React from "react";
import { useNavigate } from "react-router-dom";

const LockedLectureShimmer = () => {
  const navigate = useNavigate();

  const handleSubscribe = () => {
    navigate("/checkout");
  };

  return (
    <div className="relative flex bg-[#1e293b] rounded-xl overflow-hidden blur-sm pointer-events-none shadow-md w-full max-w-5xl mx-auto">
      {/* Left thumbnail shimmer */}
      <div className="w-1/3 md:w-1/4 bg-gray-700 animate-pulse h-40 md:h-36" />

      {/* Right content shimmer */}
      <div className="flex-1 p-4 space-y-3 animate-pulse">
        <div className="h-5 bg-gray-600 rounded w-2/3" />
        <div className="h-4 bg-gray-600 rounded w-1/4" />
        <div className="h-4 bg-gray-600 rounded w-5/6" />
        <div className="h-4 bg-gray-600 rounded w-2/3" />
      </div>

      {/* Overlay */}
    </div>
  );
};

export default LockedLectureShimmer;
