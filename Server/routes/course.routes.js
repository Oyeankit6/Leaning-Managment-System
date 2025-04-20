import { Router } from "express";
import upload from "../middlewares/multer.middleware.js";

import {
  getALLCourses,
  getLecturesByCourseId,
  createCourse,
  updateCourse,
  removeCourse,
  addLectureToCourseById,
  removeLectureFromCourse,
} from "../controllers/course.controller.js";
import {
  isLoggedin,
  authorizedRoles,
  authorizeSubscriber,
} from "../middlewares/auth.middleware.js";

const router = Router();

router
  .route("/")
  .get(getALLCourses)
  .post(
    isLoggedin,
    authorizedRoles("ADMIN"),
    upload.single("thumbnail"),
    createCourse
  )
  .delete(isLoggedin, authorizedRoles("ADMIN"), removeLectureFromCourse);

router
  .route("/:id")
  .get(isLoggedin, authorizeSubscriber, getLecturesByCourseId)
  .put(isLoggedin, authorizedRoles("ADMIN"), updateCourse)
  .delete(isLoggedin, authorizedRoles("ADMIN"), removeCourse)
  .post(
    isLoggedin,
    authorizedRoles("ADMIN"),
    upload.single("lecture"),
    addLectureToCourseById
  );

export default router;
