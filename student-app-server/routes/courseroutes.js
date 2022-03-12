// Define the course CRUD operation routes

import express from "express";
import {
  getCourses,
  CreateCourse,
  DeleteCourse
} from "../controllers/courses-controller.js";
import { notFound } from "../middleware/error-handler.js";

const router = express.Router();

router.route("/").get(getCourses);
router.route("/create").post(CreateCourse);
router
  .route("/:name")
  .delete(DeleteCourse);
router.use(notFound);
export default router;