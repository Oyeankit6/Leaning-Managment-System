import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit, FaTrash, FaVideo, FaPlayCircle } from "react-icons/fa";
import { MdOutlineSubscriptions } from "react-icons/md";
import LockedLectureShimmer from "../../components/LectureCard";
import { deleteCourse } from "../../Redux/Slices/CourseSlice";

export const CourseDescription = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { role, data } = useSelector((state) => state.auth);
  const { subscription } = data || {};
  const course = state?.course;

  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (!course) {
      navigate(-1);
    }

    if (role === "USER" && subscription?.status !== "active") {
      setShowPopup(true);
    }
  }, [course, navigate, role, subscription]);

  if (!course) {
    return null;
  }

  const handleEditCourse = () => {
    navigate("/courses/update", { state: { course } });
  };

  const handleDeleteCourse = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this course?"
    );
    if (confirmDelete) {
      console.log("Deleting course with id:", course._id);

      dispatch(deleteCourse(course._id));
      navigate("/courses");
      // dispatch(deleteCourse(course._id)); // Uncomment if dispatching
    }
  };

  const handleWatchLectures = () => {
    navigate("/course/lectures", { state: { courseId: course._id } });
  };

  const handleSubscribe = () => {
    navigate("/checkout");
  };

  const handleDisplayLectures = () => {
    navigate("/course/displaylecture", { state: { courseId: course._id } });
  };

  return (
    <HomeLayout>
      {/* Subscription Modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
          <div className="bg-white text-black p-6 rounded-xl shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4">Subscription Required</h2>
            <p className="mb-6">
              You must subscribe to access this course content.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowPopup(false)}
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSubscribe}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
              >
                Subscribe Now
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-gray-900 text-white py-10 px-6 md:px-20">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-center gap-10">
          {/* Course Image */}
          <div className="w-full md:w-1/3">
            <img
              src={
                course.thumbnail?.secure_url ||
                "https://via.placeholder.com/400"
              }
              alt={course.title}
              className="rounded-lg shadow-lg w-full object-cover"
            />
          </div>

          {/* Course Details */}
          <div className="w-full md:w-2/3">
            <h1 className="text-3xl md:text-5xl font-bold text-yellow-400 mb-4">
              {course.title}
            </h1>

            {/* Badges */}
            <div className="flex items-center gap-4 mb-6">
              {role === "ADMIN" && (
                <span className="px-3 py-1 bg-red-600 text-white text-sm rounded-full font-semibold">
                  Admin
                </span>
              )}
              {subscription?.status === "active" ? (
                <span className="px-3 py-1 bg-green-600 text-white text-sm rounded-full font-semibold flex items-center gap-2">
                  <FaPlayCircle />
                  Watch Lectures
                </span>
              ) : (
                <span
                  onClick={() => navigate("/checkout")}
                  className="px-3 py-1 bg-gray-600 text-white text-sm rounded-full font-semibold flex items-center gap-2 cursor-pointer"
                >
                  <MdOutlineSubscriptions />
                  Subscribe
                </span>
              )}
            </div>

            <p className="text-gray-300 mb-4">{course.description}</p>

            <div className="flex flex-wrap gap-6 mt-6">
              <div>
                <h3 className="text-lg font-semibold">Instructor</h3>
                <p className="text-gray-400">{course.createdBy}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Number of Lectures</h3>
                <p className="text-gray-400">
                  {course.numberOfLectures || "N/A"}
                </p>
              </div>
            </div>

            {/* Admin Controls */}
            {role === "ADMIN" && (
              <div className="flex flex-wrap gap-4 mt-8">
                <button
                  onClick={handleEditCourse}
                  className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center gap-2"
                >
                  <FaEdit />
                  Edit Course
                </button>
                <button
                  onClick={handleDeleteCourse}
                  className="px-5 py-3 bg-red-600 hover:bg-red-700 text-white rounded-md flex items-center gap-2"
                >
                  <FaTrash />
                  Delete Course
                </button>
                <button
                  onClick={() =>
                    navigate("/course/addlecture", {
                      state: { courseId: course._id },
                    })
                  }
                  className="px-5 py-3 bg-green-600 hover:bg-green-700 text-white rounded-md flex items-center gap-2"
                >
                  <FaVideo />
                  Create Lecture
                </button>
                {/* NEW: Display Lectures for Admin with active subscription */}
                {subscription?.status === "active" && (
                  <button
                    onClick={handleDisplayLectures}
                    className="px-5 py-3 bg-yellow-600 hover:bg-yellow-700 text-white rounded-md flex items-center gap-2"
                  >
                    <FaPlayCircle />
                    Display Lectures
                  </button>
                )}
              </div>
            )}

            {/* User Controls */}
            {role === "USER" && (
              <div className="mt-8">
                {subscription?.status === "active" ? (
                  <button
                    onClick={handleWatchLectures}
                    className="px-6 py-3 bg-green-500 hover:bg-green-600 text-black font-bold rounded-md flex items-center gap-2"
                  >
                    <FaPlayCircle />
                    Watch Lectures
                  </button>
                ) : (
                  <div className="animate-pulse w-full bg-gray-700 h-12 rounded-md mb-4" />
                )}
              </div>
            )}
          </div>
        </div>

        {/* What You'll Learn Section */}
        <div className="mt-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-yellow-400">
            What you'll learn
          </h2>
          <p className="text-gray-300 leading-relaxed">
            {course.whatYouWillLearn ||
              "This course offers an in-depth understanding of the subject to help you achieve your goals!"}
          </p>
        </div>

        {/* here add a locked and blur card type ui like behined this a  lecture is avaliavle and this should baised pn like admin or user subcribeed or not subscribed  */}

        {role === "USER" && subscription?.status !== "active" && (
          <div className="mt-16 space-y-6">
            <h3 className="text-xl font-bold mb-4">Lectures (Locked)</h3>
            {[1, 2, 3].map((_, index) => (
              <LockedLectureShimmer key={index} />
            ))}
            <div className="flex justify-center mt-6">
              <button
                onClick={handleSubscribe}
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded-md"
              >
                Subscribe Now to Access All Lectures
              </button>
            </div>
          </div>
        )}

        {/* jhgyuvtfsuvbgiuegriuovfsebuhi */}

        {(role === "ADMIN" ||
          (role === "USER" && subscription?.status === "active")) && (
          <button
            onClick={() =>
              navigate(`/course/displaylecture/${course._id}`, {
                state: { courseId: course._id },
              })
            }
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Go to Lectures
          </button>
        )}

        {/* Go Back */}
        <div className="mt-10">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-md hover:bg-yellow-500 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    </HomeLayout>
  );
};
