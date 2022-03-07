// Define the student CRUD operation routes

import express from "express";
import {
  getStudentById,
  getStudents,
  CreateStudent,
  DeleteStudent,
  UpdateStudent,
  getStudentsPerUniversity,
  getStudentsPerSubject
} from "../controllers/studentControllers.js";
const router = express.Router();

router.route("/").get(getStudents);
router
  .route("/:id")
  .get(getStudentById)
  .delete(DeleteStudent)
  .put(UpdateStudent);

router
  .route("/byuni/:id")
  .get(getStudentsPerUniversity)

router
  .route("/bysubject/:id")
  .get(getStudentsPerSubject)

router.route("/create").post(CreateStudent);

export default router;