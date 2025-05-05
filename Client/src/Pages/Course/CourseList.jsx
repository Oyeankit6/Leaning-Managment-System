import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourses } from "../../Redux/Slices/CourseSlice";
import HomeLayouts from "../../Layouts/HomeLayout";
import CourseCard from "../../components/CourseCard";
// Assuming you have a modal for course creation

import { useNavigate } from "react-router-dom";

export const CourseList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseData, loading } = useSelector((state) => state.course);
  const { role } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getAllCourses());
  }, [dispatch]);

  const handleCreateCourseClick = () => {
    navigate("/courses/create");
  };

  return (
    <HomeLayouts>
      <section className="min-h-screen py-10 px-4 md:px-10 bg-gray-900">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-10 text-center">
          Welcome to AlgoCamp Courses
        </h1>

        {role === "ADMIN" && (
          <div className="flex justify-center mb-6">
            <button
              onClick={handleCreateCourseClick}
              className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Create New Course
            </button>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="loader"></div>
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            {courseData && courseData.length > 0 ? (
              courseData.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))
            ) : (
              <p className="text-center text-gray-400">No Courses Available</p>
            )}
          </div>
        )}
      </section>
    </HomeLayouts>
  );
};
