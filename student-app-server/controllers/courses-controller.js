import Course from "../models/coursesModel";
import asyncHandler from "express-async-handler";

// @desc    Get all Courses
// @route   GET /api/courses
const getCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find({}, {"name": 1});
  res.json(courses);
  res.sendStatus(200);
});

//@description     Create Course
//@route           POST /api/courses/create
//@access          Private

const CreateCourse = asyncHandler(async (req, res) => {
  const { name, type, subjects } = req.body;
  let subjectArray = subjects.split(';');
  if (!name || !type|| !subjects) {
    res.status(400);
    res.json("Please Fill all the feilds");
    throw new Error("Please Fill all the feilds");
    return;
  } else {
    const course = new Course({ name, type, subjects: subjectArray });

    const createdCourse = await course.save();

    res.status(201).json(createdCourse);
  }
});

//@description     delete Course
//@route           DELETE /api/courses/:name
//@access          Private

const DeleteCourse = asyncHandler(async (req, res) => {
  const course = await Course.find({name: req.params.name});

  if (course[0]) {
    await course[0].remove();
    res.json({ message: "Course Removed" });
    res.status(200);
  } else {
    res.status(404);
    res.json("Course Not Found");
  }
});

export { getCourses, CreateCourse, DeleteCourse };
