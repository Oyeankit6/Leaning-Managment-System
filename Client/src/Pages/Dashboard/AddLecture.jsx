import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { FaArrowLeft, FaUpload } from "react-icons/fa";
import { addCourseLecture } from "../../Redux/Slices/LectureSlice";

const AddLecture = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const courseId = state?.courseId;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState(null);
  const [videoPreview, setVideoPreview] = useState("");

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = [
        "video/mp4",
        "video/x-m4v",
        "video/webm",
        "video/avi",
      ];
      if (!validTypes.includes(file.type)) {
        toast.error("Invalid file type. Please upload a valid video.");
        return;
      }

      setVideo(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setVideoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !video) {
      toast.error("All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("lecture", video);
    formData.append("courseId", courseId);

    try {
      await dispatch(addCourseLecture({ courseId, formData }));
      toast.success("Lecture added successfully!");
      navigate(-1); // Navigate back after success
    } catch (error) {
      toast.error("Failed to add lecture");
    }
  };

  return (
    <HomeLayout>
      <div className="min-h-screen bg-gray-900 text-white px-4 py-10 md:px-20">
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black rounded-md font-semibold"
          >
            <FaArrowLeft />
            Back to Course
          </button>
        </div>

        <h2 className="text-3xl font-bold text-yellow-400 mb-6">
          Add New Lecture
        </h2>

        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 p-6 rounded-xl shadow-lg max-w-3xl mx-auto space-y-6"
          encType="multipart/form-data"
        >
          {/* Lecture Title */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-300">
              Lecture Title
            </label>
            <input
              type="text"
              placeholder="Enter lecture title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Lecture Description */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-300">
              Description
            </label>
            <textarea
              rows="4"
              placeholder="Enter lecture description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-gray-700 text-white resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Video Upload */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-300">
              Upload Video
            </label>
            <input
              type="file"
              accept="video/mp4,video/x-m4v,video/*"
              onChange={handleVideoChange}
              className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-yellow-500 file:text-black hover:file:bg-yellow-600"
            />
          </div>

          {/* Video Preview */}
          {videoPreview && (
            <div className="mt-4">
              <label className="block mb-2 text-sm font-semibold text-gray-300">
                Preview:
              </label>
              <video
                controls
                className="w-full rounded-md shadow-md max-h-96 object-contain"
                src={videoPreview}
              />
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={false} // Manage loading state via Redux
              className="px-6 py-3 rounded-md font-semibold flex items-center gap-2 transition bg-green-500 hover:bg-green-600"
            >
              <FaUpload />
              Upload Lecture
            </button>
          </div>
        </form>
      </div>
    </HomeLayout>
  );
};

export default AddLecture;
