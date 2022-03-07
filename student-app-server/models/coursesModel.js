//Model for Course
import mongoose from "mongoose";

const courseSchema = mongoose.Schema(
  {
    name: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: false
    },
    subjects: [{
        type: String,
        required: false
    }]
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model("Course", courseSchema);

export default Course;
