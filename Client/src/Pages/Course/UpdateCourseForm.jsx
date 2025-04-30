import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";
import { useDispatch, useSelector } from "react-redux";
import { updateCourseById } from "../../Redux/Slices/CourseSlice";

const UpdateCourseForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.course);
  const { state } = useLocation();
  const course = state?.course;

  const [title, setTitle] = useState(course?.title || "");
  const [description, setDescription] = useState(course?.description || "");
  const [whatYouWillLearn, setWhatYouWillLearn] = useState(
    course?.whatYouWillLearn || ""
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      title,
      description,
      whatYouWillLearn,
    };

    await dispatch(updateCourseById({ courseId: course._id, updatedData }));
    navigate(-1); // Go back after update
  };

  if (!course) {
    return (
      <HomeLayout>
        <div className="text-white text-center py-20">
          <h2 className="text-2xl">No course selected to update.</h2>
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="mt-4 bg-yellow-500 text-black px-4 py-2 rounded"
          >
            Back to Dashboard
          </button>
        </div>
      </HomeLayout>
    );
  }

  return (
    <HomeLayout>
      <div className="min-h-screen bg-gray-900 text-white py-10 px-6 md:px-20">
        <h1 className="text-3xl font-bold text-yellow-400 mb-10">
          Update Course
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 p-8 rounded-lg shadow-md max-w-xl mx-auto space-y-6"
        >
          <div>
            <label className="block text-sm mb-2">Title</label>
            <input
              type="text"
              className="w-full p-3 rounded bg-gray-700 text-white"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Description</label>
            <textarea
              className="w-full p-3 rounded bg-gray-700 text-white"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-2">What You'll Learn</label>
            <textarea
              className="w-full p-3 rounded bg-gray-700 text-white"
              value={whatYouWillLearn}
              onChange={(e) => setWhatYouWillLearn(e.target.value)}
              rows={4}
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 font-semibold rounded-md transition"
            >
              {loading ? "Updating..." : "Update Course"}
            </button>
          </div>
        </form>
      </div>
    </HomeLayout>
  );
};

export default UpdateCourseForm;
