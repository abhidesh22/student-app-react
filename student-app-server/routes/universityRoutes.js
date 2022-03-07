// Define the student CRUD operation routes

import express from "express";
import {
  getUniversities,
  CreateUniversity,
  DeleteUniversity,
  UpdateUniversity,
  CreateCourse
} from "../controllers/universityControllers.js";
const router = express.Router();

router.route("/").get(getUniversities);
router
  .route("/:id")
  .delete(DeleteUniversity)
  .put(UpdateUniversity);
router.route("/create").post(CreateUniversity);
router.route("/createcourse").post(CreateCourse);

export default router;