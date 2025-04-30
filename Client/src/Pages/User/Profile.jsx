import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HomeLayout from "../../Layouts/HomeLayout";
import { Link, useNavigate } from "react-router-dom";

export const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state?.auth?.data);

  return (
    <HomeLayout>
      <div className="min-h-screen bg-gray-900 py-16 px-4 md:px-10">
        <div className="max-w-3xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg">
          {/* Profile Header */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-indigo-600">
              <img
                src={
                  userData?.user?.avatar?.secure_url ||
                  "https://via.placeholder.com/150"
                }
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-3xl font-semibold text-white">
              {userData?.user?.fullName}
            </h2>
            <p className="text-gray-400 text-lg">{userData?.user?.email}</p>
          </div>

          {/* User Details */}
          <div className="text-white">
            <h3 className="text-xl font-medium text-gray-200 mb-4">
              User Information
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-400">Role:</span>
                <span className="font-semibold">{userData?.user?.role}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Email:</span>
                <span className="font-semibold">{userData?.user?.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Subscription Status:</span>
                <span
                  className={`font-semibold ${
                    userData?.user?.subscription?.status === "active"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {userData?.user?.subscription?.status === "active"
                    ? "Active"
                    : "Inactive"}
                </span>
              </div>
            </div>
          </div>

          {/* Edit Profile Button */}
          <div className="mt-6 flex justify-center space-x-4">
            <button
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition duration-300"
              onClick={() => navigate("/editProfile")}
            >
              Edit Profile
            </button>

            {/* Change Password Link */}
            <Link
              to="/change-password"
              className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition duration-300"
            >
              Change Password
            </Link>
          </div>
          {userData?.user?.subscription?.status === "active" && (
            <button>Cancel subscription</button>
          )}
        </div>
      </div>
    </HomeLayout>
  );
};
