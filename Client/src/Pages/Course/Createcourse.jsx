import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";
import { useDispatch } from "react-redux";
import { createNewCourse } from "../../Redux/Slices/CourseSlice";

export const CreateCourse = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    createdBy: "",
    thumbnail: null,
  });

  const [previewImage, setPreviewImage] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "thumbnail") {
      const file = files[0];
      setFormData({ ...formData, thumbnail: file });
      const fileReaderUrl = URL.createObjectURL(file);
      setPreviewImage(fileReaderUrl);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await dispatch(createNewCourse(formData));
    navigate("/courses");
  };

  return (
    <HomeLayout>
      <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center py-12 px-6">
        <div className="w-full max-w-3xl bg-gray-800 p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-center text-yellow-400 mb-8">
            Create New Course
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 font-semibold">Title</label>
              <input
                type="text"
                name="title"
                placeholder="Enter course title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">Description</label>
              <textarea
                name="description"
                placeholder="Enter course description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="4"
                className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
              ></textarea>
            </div>

            <div>
              <label className="block mb-2 font-semibold">Category</label>
              <input
                type="text"
                name="category"
                placeholder="e.g., Programming, Design, Marketing"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                Instructor Name
              </label>
              <input
                type="text"
                name="createdBy"
                placeholder="Enter instructor name"
                value={formData.createdBy}
                onChange={handleChange}
                required
                className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                Course Thumbnail
              </label>
              <input
                type="file"
                name="thumbnail"
                accept="image/*"
                onChange={handleChange}
                required
                className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none"
              />
            </div>

            {previewImage && (
              <div className="mt-4">
                <p className="mb-2 font-semibold">Preview:</p>
                <img
                  src={previewImage}
                  alt="Thumbnail Preview"
                  className="w-full h-64 object-cover rounded-md border-2 border-yellow-400"
                />
              </div>
            )}

            <div className="flex items-center justify-between mt-8">
              <button
                type="submit"
                className="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-md transition"
              >
                Create Course
              </button>

              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-md transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </HomeLayout>
  );
};
