// Define the student CRUD operation routes

import express from "express";
import {
  getStudentByRollno,
  getStudents,
  CreateStudent,
  DeleteStudent,
  UpdateStudent,
  getStudentsPerUniversity,
  getStudentsPerSubject
} from "../controllers/students-controller.js";
import { notFound } from "../middleware/error-handler.js";

const router = express.Router();

router.route("/").get(getStudents);
router
  .route("/:rollno")
  .get(getStudentByRollno)
  .delete(DeleteStudent)
  .put(UpdateStudent);

router
  .route("/byuni/:id")
  .get(getStudentsPerUniversity)

router
  .route("/bysubject/:id")
  .get(getStudentsPerSubject)

router.route("/create").post(CreateStudent);
router.use(notFound);
export default router;