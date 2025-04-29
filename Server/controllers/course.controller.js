import mongoose from "mongoose";
import Course from "../models/course.model.js";
import AppError from "../utils/error.util.js";
import v2 from "../config/cloudinary.js";
import fs from "fs/promises";
import path from "path";

// Utility: Validate thumbnail file
const validateThumbnail = (file) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  const maxSize = 2 * 1024 * 1024; // 2MB

  if (!allowedTypes.includes(file.mimetype)) {
    throw new AppError("Only JPG, PNG, or WEBP files are allowed", 400);
  }

  if (file.size > maxSize) {
    throw new AppError("Thumbnail file size should be under 2MB", 400);
  }
};

// GET all courses (excluding lectures)
const getALLCourses = async (req, res, next) => {
  try {
    const courses = await Course.find().select("-lectures");

    res.status(200).json({
      success: true,
      message: "All Courses",
      courses,
    });
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};

// GET lectures of a specific course by ID
const getLecturesByCourseId = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new AppError("Invalid course ID format", 400));
    }

    const course = await Course.findById(id);

    if (!course) {
      return next(new AppError("Course not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Course lectures fetched successfully",
      lectures: course.lectures,
    });
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};

// POST create a new course
// POST create a new course
const createCourse = async (req, res, next) => {
  try {
    const { title, description, category, createdBy } = req.body;

    if (!title || !description || !category || !createdBy) {
      return next(new AppError("All fields are required", 400));
    }

    const course = new Course({ title, description, category, createdBy });

    // If thumbnail is uploaded via multer
    if (req.file) {
      const file = req.file;

      try {
        validateThumbnail(file); // optional: validate mimetype and size

        const result = await cloudinary.uploader.upload(file.path, {
          folder: "lms",
          public_id: `courses/${file.filename}`,
          timeout: 120000,
        });

        course.thumbnail = {
          public_id: result.public_id,
          secure_url: result.secure_url,
        };

        console.log(result.secure_url);
        fs.rm(`uploads/${req.file.filename}`);
      } catch (uploadErr) {
        console.error("Cloudinary Upload Error:", uploadErr);
        return next(
          new AppError("Failed to upload thumbnail to Cloudinary", 500)
        );
      }
    }

    await course.save();

    res.status(201).json({
      success: true,
      message: "Course created successfully",
      course,
    });
  } catch (error) {
    next(new AppError(error.message || "Course creation failed", 500));
  }
};

// PUT update course

// const updateCourse = async (req, res, next) => {
//   return next(new AppError("Update course functionality not implemented", 501));
// };
const updateCourse = async (req, res, next) => {
  // Extracting the course id from the request params
  const { id } = req.params;

  // Finding the course using the course id
  const course = await Course.findByIdAndUpdate(
    id,
    {
      $set: req.body, // This will only update the fields which are present
    },
    {
      runValidators: true, // This will run the validation checks on the new data
    }
  );

  // If no course found then send the response for the same
  if (!course) {
    return next(new AppError("Invalid course id or course not found.", 400));
  }

  // Sending the response after success
  res.status(200).json({
    success: true,
    message: "Course updated successfully",
  });
};

// DELETE remove course (not implemented yet)
const removeCourse = async (req, res, next) => {
  try {
    const { id } = req.params;

    const course = await Course.findById(id);

    if (!course) {
      return next(new AppError("Invalid course id or course not found.", 400));
    }

    await Course.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Course Deleted successfully",
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
const addLectureToCourseById = async (req, res, next) => {
  const { title, description } = req.body;
  const { id } = req.params;

  let lectureData = {};

  if (!title || !description) {
    return next(new AppError("Title and Description are required", 400));
  }

  const course = await Course.findById(id);

  if (!course) {
    return next(new AppError("Invalid course id or course not found.", 400));
  }

  // Run only if user sends a file
  if (req.file) {
    try {
      const result = await v2.uploader.upload(req.file.path, {
        folder: "lms",
        chunk_size: 50000000, // 50 MB
        resource_type: "video",
      });

      if (result) {
        lectureData.public_id = result.public_id;
        lectureData.secure_url = result.secure_url;
      }

      // Remove the uploaded file from local storage
      await fs.rm(`uploads/${req.file.filename}`);
    } catch (error) {
      // Clean up uploads folder
      try {
        const files = await fs.readdir("uploads/");
        for (const file of files) {
          await fs.unlink(path.join("uploads/", file));
        }
      } catch (fsErr) {
        console.error("Failed to clean up uploads folder:", fsErr);
      }

      console.error("Cloudinary Upload Error:", error);
      return next(
        new AppError(
          error.message || "File not uploaded, please try again",
          400
        )
      );
    }
  }

  course.lectures.push({
    title,
    description,
    lecture: lectureData,
  });

  course.numberOfLectures = course.lectures.length;

  await course.save();

  res.status(200).json({
    success: true,
    message: "Course lecture added successfully",
    course,
  });
};

///remove lectures
const removeLectureFromCourse = async (req, res, next) => {
  // Grabbing the courseId and lectureId from req.query
  const { courseId, lectureId } = req.query;

  console.log(courseId);

  // Checking if both courseId and lectureId are present
  if (!courseId) {
    return next(new AppError("Course ID is required", 400));
  }

  if (!lectureId) {
    return next(new AppError("Lecture ID is required", 400));
  }

  // Find the course uding the courseId
  const course = await Course.findById(courseId);

  // If no course send custom message
  if (!course) {
    return next(new AppError("Invalid ID or Course does not exist.", 404));
  }

  // Find the index of the lecture using the lectureId
  const lectureIndex = course.lectures.findIndex(
    (lecture) => lecture._id.toString() === lectureId.toString()
  );

  // If returned index is -1 then send error as mentioned below
  if (lectureIndex === -1) {
    return next(new AppError("Lecture does not exist.", 404));
  }

  // Delete the lecture from cloudinary
  await v2.uploader.destroy(course.lectures[lectureIndex].lecture.public_id, {
    resource_type: "video",
  });

  // Remove the lecture from the array
  course.lectures.splice(lectureIndex, 1);

  // update the number of lectures based on lectres array length
  course.numberOfLectures = course.lectures.length;

  // Save the course object
  await course.save();

  // Return response
  res.status(200).json({
    success: true,
    message: "Course lecture removed successfully",
  });
};

export {
  getALLCourses,
  getLecturesByCourseId,
  createCourse,
  updateCourse,
  removeCourse,
  addLectureToCourseById,
  removeLectureFromCourse,
};
