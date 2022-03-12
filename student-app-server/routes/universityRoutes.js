// Define the student CRUD operation routes

import express from "express";
import {
  getUniversities,
  CreateUniversity,
  DeleteUniversity
} from "../controllers/university-controllers.js";
import { notFound } from "../middleware/error-handler.js";

const router = express.Router();

router.route("/").get(getUniversities);
router
  .route("/:name")
  .delete(DeleteUniversity)
router.route("/create").post(CreateUniversity);
router.use(notFound);

export default router;