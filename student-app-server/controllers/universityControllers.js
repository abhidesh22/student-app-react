import University from "../models/universityModel.js";
import Course from "../models/coursesModel";
import asyncHandler from "express-async-handler";

// @desc    Get all Universitys
// @route   GET /api/University
const getUniversities = asyncHandler(async (req, res) => {
  const universities = await University.find({}, {"name": 1, 'courses': 1}).populate('courses');
  res.json(universities);
});

//@description     Fetch single University
//@route           GET /api/University/:title
// const getUniversityById = asyncHandler(async (req, res) => {
//   const university = await University.find({id: req.params.id});

//   if (university) {
//     res.json(university);
//   } else {
//     res.status(404).json({ message: "University not found" });
//   }
// });

//@description     Create University
//@route           POST /api/University/create
//@access          Private
const CreateUniversity = asyncHandler(async (req, res) => {
  const { title, content, name, username } = req.body;
  let contentArray = content.split(';');
  if (!title || !name || !username) {
    res.status(400);
    res.json("Please Fill all the feilds");
    throw new Error("Please Fill all the feilds");
    return;
  } else {
    const University = new University({ username, title, content: contentArray, name });

    const createdUniversity = await University.save();

    res.status(201).json(createdUniversity);
  }
});

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

//@description     Delete University
//@route           DELETE /api/University/:title

const DeleteUniversity = asyncHandler(async (req, res) => {
  const University = await University.find({title: req.params.title});

  if (University[0]) {
    await University[0].remove();
    res.json({ message: "University Removed" });
  } else {
    res.status(404);
    res.json("University Not Found");
    throw new Error("University not Found");
  }
});

// @desc    Update an University
// @route   PUT /api/University/:title

const UpdateUniversity = asyncHandler(async (req, res) => {
  const { title, content, name, username } = req.body;

  const University = await University.find({title: req.params.title});

  if (University[0]) {
    University[0].title = title;
    University[0].content = content;
    University[0].name = name;
    University[0].username = username;

    const updatedUniversity = await University[0].save();
    res.json(updatedUniversity);
  } else {
    res.status(404);
    res.json("University Not Found");
    throw new Error("University not found");
  }
});

export { getUniversities, DeleteUniversity, UpdateUniversity, CreateUniversity, CreateCourse };
