import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  deleteCourseLecture,
  getCourseLecture,
} from "../../Redux/Slices/LectureSlice";
import { getAllCourses } from "../../Redux/Slices/CourseSlice";
import HomeLayout from "../../Layouts/HomeLayout";

const DisplayLectures = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams(); // assuming you use /course/displaylecture/:id in your route

  const [courseDetails, setCourseDetails] = useState(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const { lectures } = useSelector((state) => state.lecture);
  const { role } = useSelector((state) => state.auth);
  const { courseData: courses } = useSelector((state) => state.course); // ✅ alias

  // Load all courses (needed to find the one we're displaying)
  useEffect(() => {
    dispatch(getAllCourses());
  }, [dispatch]);

  // Once courses are loaded, extract current course from ID
  useEffect(() => {
    if (Array.isArray(courses)) {
      const course = courses.find((c) => c._id === id);
      if (course) {
        setCourseDetails(course);
        dispatch(getCourseLecture(course._id));
      }
    }
  }, [courses, id, dispatch]);

  const handleLectureDelete = async (courseId, lectureId) => {
    const data = { courseId, lectureId };
    await dispatch(deleteCourseLecture(data));
    await dispatch(getCourseLecture(courseId));
  };

  if (!courseDetails) {
    return (
      <HomeLayout>
        <div className="flex items-center justify-center h-screen text-white text-xl">
          Loading course details...
        </div>
      </HomeLayout>
    );
  }

  return (
    <HomeLayout>
      <div className="flex flex-col gap-10 items-center justify-center min-h-[90vh] py-10 text-white mx-[5%]">
        {/* Course Name */}
        <h1 className="text-center text-2xl font-semibold text-yellow-500">
          Course Name: {courseDetails?.title}
        </h1>

        <div className="flex justify-center gap-10 w-full flex-wrap">
          {/* Left: Video Player + Lecture Info */}
          <div className="space-y-5 w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black]">
            <video
              className="object-fill rounded-tl-lg rounded-tr-lg w-full"
              src={lectures?.[currentVideoIndex]?.lecture?.secure_url}
              controls
              disablePictureInPicture
              muted
              controlsList="nodownload"
            ></video>

            <div>
              <h1>
                <span className="text-yellow-500">Title: </span>
                {lectures?.[currentVideoIndex]?.title}
              </h1>
              <p>
                <span className="text-yellow-500">Description: </span>
                {lectures?.[currentVideoIndex]?.description}
              </p>
            </div>
          </div>

          {/* Right: List of Lectures */}
          <ul className="w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black] space-y-4">
            <li className="font-semibold text-xl text-yellow-500 flex items-center justify-between">
              <p>Lectures List</p>

              {role === "ADMIN" && (
                <button
                  onClick={() =>
                    navigate("/course/addlecture", {
                      state: courseDetails,
                    })
                  }
                  className="btn-primary px-2 py-1 rounded-md font-semibold text-sm"
                >
                  Add New Lecture
                </button>
              )}
            </li>

            {lectures?.length === 0 && (
              <li className="text-white">No lectures available.</li>
            )}

            {lectures?.map((element, index) => (
              <li className="space-y-2" key={element._id}>
                <p
                  className="cursor-pointer"
                  onClick={() => setCurrentVideoIndex(index)}
                >
                  <span className="text-yellow-500">Lecture {index + 1}:</span>{" "}
                  {element?.title}
                </p>

                {role === "ADMIN" && (
                  <button
                    onClick={() =>
                      handleLectureDelete(courseDetails._id, element._id)
                    }
                    className="btn-primary px-2 py-1 rounded-md font-semibold text-sm"
                  >
                    Delete Lecture
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </HomeLayout>
  );
};

export default DisplayLectures;
