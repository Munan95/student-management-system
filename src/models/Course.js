import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Course name is required"],
      unique: true,
      trim: true,
    },
    code: {
      type: String,
      required: [true, "Course code is required"],
      unique: true,
      sparse: true,
      uppercase: true,
      trim: true,
    },
    instructor: {
      type: String,
      required: [true, "Instructor is required"],
      trim: true,
    },
    duration: {
      type: String,
      required: [true, "Duration is required"],
      trim: true,
      default: "4 Years",
    },
    fees: {
      type: Number,
      required: [true, "Fees is required"],
      min: [0, "Fees cannot be negative"],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Course || mongoose.model("Course", CourseSchema);
