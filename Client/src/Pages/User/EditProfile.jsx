import React, { useState } from "react";
import HomeLayout from "../../Layouts/HomeLayout";
import { useDispatch, useSelector } from "react-redux";
import { editProfile } from "../../Redux/Slices/AuthSlice";
import { useNavigate } from "react-router-dom";

export const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.data);

  const [data, setData] = useState({
    previewImage: userData?.user?.avatar?.secure_url || "",
    fullName: userData?.user?.fullName || "",
    avatar: undefined,
    userId: userData.user?._id,
  });

  // Handle avatar image upload
  const handleImageUpload = (e) => {
    e.preventDefault();
    const uploadedImage = e.target.files[0];
    if (uploadedImage) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.onload = () => {
        setData({
          ...data,
          previewImage: fileReader.result,
          avatar: uploadedImage,
        });
      };
    }
  };

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editProfile(data))
      .then(() => {
        // Navigate to profile page after successful update
        navigate("/profile");
      })
      .catch((error) => {
        // Handle error
        console.error("Profile update failed", error);
      });

    console.log("Updated Data: ", data);
  };

  return (
    <HomeLayout>
      <div className="min-h-screen bg-gray-900 py-16 px-4 md:px-10">
        <div className="max-w-3xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg">
          {/* Form Title */}
          <h2 className="text-3xl font-semibold text-white text-center mb-8">
            Edit Profile
          </h2>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Avatar Upload */}
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-indigo-600">
                <img
                  src={data.previewImage || "https://via.placeholder.com/150"}
                  alt="Avatar Preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="file:border-0 file:bg-indigo-600 file:text-white file:px-6 file:py-2 file:rounded-lg hover:file:bg-indigo-700 transition duration-300"
              />
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-gray-400 mb-2" htmlFor="fullName">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={data.fullName}
                onChange={handleChange}
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white"
                placeholder="Enter your full name"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition duration-300"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </HomeLayout>
  );
};
