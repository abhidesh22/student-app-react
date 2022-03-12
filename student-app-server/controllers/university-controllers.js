import University from "../models/universityModel.js";
import Course from "../models/coursesModel";
import asyncHandler from "express-async-handler";

// @desc    Get all Universitys
// @route   GET /api/University
const getUniversities = asyncHandler(async (req, res) => {
  const universities = await University.find({}, {"name": 1, 'courses': 1}).populate('courses');
  res.json(universities);
});

//@description     Create University
//@route           POST /api/University/create
//@access          Private
const CreateUniversity = asyncHandler(async (req, res) => {
  const { name, type, Address, url, totalstudents, establishedDate, courses } = req.body;
  let coursesArray = [courses];
  if (!name || !type) {
    res.status(400);
    res.json("Please Fill all the feilds");

  } else {
    const university = new University({ name, type, Address, url, totalstudents, establishedDate, courses: coursesArray });

    const createdUniversity = await university.save();

    res.status(201).json(createdUniversity);
  }
});

//@description     Delete University
//@route           DELETE /api/University/:title

const DeleteUniversity = asyncHandler(async (req, res) => {
  const university = await University.find({name: req.params.name});

  if (university[0]) {
    await university[0].remove();
    res.json({ message: "University Removed" });
  } else {
    res.status(404);
    res.json("University Not Found");
  }
});

export { getUniversities, DeleteUniversity, CreateUniversity };
