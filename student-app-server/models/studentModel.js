//Model for Student
import mongoose from "mongoose";

const studentSchema = mongoose.Schema(
  {
    rollno: {
        type: Number,
        required: true  
    },
    name: {
        type: String,
        required: true
    },
    degreeEnrolled: {
        type: String,
        required: true
    },
    address: {
        city: {
            type: String,
            required: true
        },
        zipcode: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        }
    },
    url: {
        type: String,
        required: false
    },
    grade: {
        type: Number,
        required: true
    },
    enrolledDate: {
        type: Date,
        required: false
    },
    course: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Course'
    },
    university: {
        type: mongoose.Schema.Types.ObjectId, ref: 'University'
    }
  },
  {
    timestamps: true,
  }
);


const Student = mongoose.model("Student", studentSchema);

export default Student;