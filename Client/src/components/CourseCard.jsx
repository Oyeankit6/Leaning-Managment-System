import React from "react";
import { Link, useNavigate } from "react-router-dom";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() =>
        navigate(`/courses/description`, { state: { course: course } })
      }
      className="flex flex-col md:flex-row gap-6 bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300"
    >
      {/* Thumbnail */}
      <img
        src={course.thumbnail?.secure_url || "/default-course.jpg"}
        alt={course.title}
        className="w-full md:w-64 h-40 md:h-32 object-cover rounded-lg"
      />

      {/* Course Info */}
      <div className="flex flex-col justify-between flex-grow">
        <div>
          <h2 className="text-white text-xl md:text-2xl font-semibold mb-2">
            {course.title}
          </h2>
          <p className="text-gray-400 text-sm mb-1">
            {course.numberOfLectures || 0} Lessons
          </p>
          <p className="text-gray-400 text-sm">
            {course.description?.length > 120
              ? course.description.slice(0, 120) + "..."
              : course.description}
          </p>
        </div>

        {/* Price Section */}
        <div className="flex flex-wrap items-center justify-between mt-4">
          <div>
            {course.actualPrice && (
              <span className="text-gray-400 line-through ml-2">
                ₹{course.actualPrice}
              </span>
            )}
          </div>

          {course.discountPercentage && (
            <span className="bg-yellow-500 text-black text-xs font-bold py-1 px-2 rounded-md">
              {course.discountPercentage}% OFF
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
