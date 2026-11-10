import mongoose from "mongoose";

const MarkSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: [true, "Student is required"],
    },
    subject: { type: String, required: [true, "Subject is required"], trim: true },
    exam: { type: String, trim: true, default: "" }, // optional, e.g. Mid-term, Final
    score: { type: Number, required: [true, "Marks are required"], min: [0, "Marks cannot be negative"] },
    total: { type: Number, required: true, default: 100, min: [1, "Max marks must be at least 1"] },
  },
  { timestamps: true }
);

export default mongoose.models.Mark || mongoose.model("Mark", MarkSchema);
