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
const getStudentByRollno = asyncHandler(async (req, res) => {
  const student = await Student.find({rollno: req.params.rollno});

  if (student) {
    res.json(student);
  } else {
    res.status(404).json({ message: "Student not found" });
  }

});

//@description     Fetch student list per university
//@route           GET /api/Student/byuni/:id
const getStudentsPerUniversity = asyncHandler(async (req, res) => {
  const student = await Student.find({university: req.params.id}).populate('course');

  if (student) {
    res.json(student);
  } else {
    res.status(404).json({ message: "Student not found" });
  }

});

//@description     Fetch single Student
//@route           GET /api/Student/bysubject/:id
const getStudentsPerSubject = asyncHandler(async (req, res) => {
  const pipeline = [
    { 
      $match: {
        university: ObjectId(req.params.id) 
      }
    },
    { 
      $lookup: {
        from: 'courses',
        localField: 'course',
        foreignField: '_id',
        as: 'course_name'
      }
    },
    { 
      $group: {
        _id: "$course",
         course_name : {
           $first: '$course_name.name' 
          },
          averageGrade: { 
            "$avg": "$grade" 
          }
        }
      }
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
  const { rollno, name, degreeEnrolled, address, url, grade, enrolledDate, course, university } = req.body;
  if (!rollno || !name) {
    res.status(400);
    res.json("Please Fill all the feilds");
  } else {
    const student = new Student({ rollno, name, degreeEnrolled, address, url, grade, enrolledDate, course, university });

    const createdStudent = await student.save();

    res.status(201).json(createdStudent);
  }
});

//@description     Delete Student
//@route           DELETE /api/Student/:rollno

const DeleteStudent = asyncHandler(async (req, res) => {
  const student = await Student.find({rollno: req.params.rollno});

  if (student[0]) {
    await student[0].remove();
    res.json({ message: "Student Removed" });
  } else {
    res.status(404);
    res.json("Student Not Found");
  }
});

// @desc    Update an Student
// @route   PUT /api/Student/:rollno

const UpdateStudent = asyncHandler(async (req, res) => {
  const { name, degreeEnrolled, address, url, grade, enrolledDate, course, university } = req.body;

  const student = await Student.find({rollno: req.params.rollno});

  if (student[0]) {
    student[0].name = name;
    student[0].degreeEnrolled = degreeEnrolled;
    student[0].address = address;
    student[0].url = url;
    student[0].grade = grade;
    student[0].enrolledDate = enrolledDate;
    student[0].course = course;
    student[0].university = university;

    const updatedStudent = await student[0].save();
    res.json(updatedStudent);
    res.status(200);
  } else {
    res.status(404);
    res.json("Student Not Found");
  }
});

export { getStudentByRollno, getStudents, getStudentsPerUniversity, getStudentsPerSubject, CreateStudent, DeleteStudent, UpdateStudent };
