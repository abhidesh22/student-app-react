//Model for University
import mongoose from "mongoose";

const universitySchema = mongoose.Schema(
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
    Address: {
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
    totalStudents: {
        type: Number,
        required: false
    },
    establishedDate: {
        type: Date,
        required: false
    },
    courses: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'Course'}
    ]
  },
  {
    timestamps: true,
  }
);

const University = mongoose.model("University", universitySchema);

export default University;
