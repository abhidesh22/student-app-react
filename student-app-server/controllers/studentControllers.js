import Student from "../models/studentModel.js";
import asyncHandler from "express-async-handler";
import Course from "../models/coursesModel.js";
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// @desc    Get all Students
// @route   GET /api/Student
const getStudents = asyncHandler(async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

//@description     Fetch single Student
//@route           GET /api/Student/:title
const getStudentById = asyncHandler(async (req, res) => {
  const student = await Student.find({id: req.params.id});

  if (student) {
    res.json(student);
  } else {
    res.status(404).json({ message: "Student not found" });
  }

});

//@description     Fetch single Student
//@route           GET /api/Student/:title
const getStudentsPerUniversity = asyncHandler(async (req, res) => {
  const student = await Student.find({university: req.params.id}).populate('course');

  if (student) {
    res.json(student);
  } else {
    res.status(404).json({ message: "Student not found" });
  }

});

//@description     Fetch single Student
//@route           GET /api/Student/:title
const getStudentsPerSubject = asyncHandler(async (req, res) => {
  //const student = await Student.find({university: req.params.id}).populate('university', 'courses');
  const pipeline = [
    { $match: { university: ObjectId(req.params.id) } },
    { $lookup: {
      from: 'courses',
      localField: 'course',
      foreignField: '_id',
      as: 'course_name'
    }},
    { $group: { _id: "$course", course_name : { $first: '$course_name.name' }, averageGrade: { "$avg": "$grade" } }}
  ];
  const student = await Student.aggregate(pipeline);
  if (student) {
    res.json(student);
  } else {
    res.status(404).json({ message: "Student not found" });
  }

});

//@description     Create Student
//@route           POST /api/Student/create
//@access          Private
const CreateStudent = asyncHandler(async (req, res) => {
  const { title, content, name, username } = req.body;
  let contentArray = content.split(';');
  if (!title || !name || !username) {
    res.status(400);
    res.json("Please Fill all the feilds");
    throw new Error("Please Fill all the feilds");
    return;
  } else {
    const student = new Student({ username, title, content: contentArray, name });

    const createdStudent = await Student.save();

    res.status(201).json(createdStudent);
  }
});

//@description     Delete Student
//@route           DELETE /api/Student/:title

const DeleteStudent = asyncHandler(async (req, res) => {
  const student = await Student.find({title: req.params.title});

  if (student[0]) {
    await student[0].remove();
    res.json({ message: "Student Removed" });
  } else {
    res.status(404);
    res.json("Student Not Found");
    throw new Error("Student not Found");
  }
});

// @desc    Update an Student
// @route   PUT /api/Student/:title

const UpdateStudent = asyncHandler(async (req, res) => {
  const { title, content, name, username } = req.body;

  const student = await Student.find({title: req.params.title});

  if (student[0]) {
    student[0].title = title;
    student[0].content = content;
    student[0].name = name;
    student[0].username = username;

    const updatedStudent = await student[0].save();
    res.json(updatedStudent);
  } else {
    res.status(404);
    res.json("Student Not Found");
    throw new Error("Student not found");
  }
});

export { getStudentById, getStudents, getStudentsPerUniversity, getStudentsPerSubject, CreateStudent, DeleteStudent, UpdateStudent };
