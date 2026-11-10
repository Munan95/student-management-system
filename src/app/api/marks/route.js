import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Mark from "@/models/Mark";
import Student from "@/models/Student";
import { badRequest, errorResponse, isValidId } from "@/lib/api";

// READ: all marks with the student's name and department
export async function GET() {
  try {
    await connectDB();
    const marks = await Mark.find({})
      .sort({ createdAt: -1 })
      .populate("student", "name department")
      .lean();
    return NextResponse.json({ success: true, data: marks });
  } catch (error) {
    return errorResponse(error);
  }
}

// CREATE
export async function POST(request) {
  try {
    await connectDB();
    const { student, subject, exam, score, total } = await request.json();
    if (!isValidId(student) || !(await Student.exists({ _id: student }))) {
      return badRequest("Please select a valid student");
    }
    if (Number(score) > Number(total ?? 100)) {
      return badRequest("Marks cannot be greater than max marks");
    }
    const mark = await Mark.create({ student, subject, exam, score, total });
    return NextResponse.json({ success: true, data: mark }, { status: 201 });
  } catch (error) {
    return errorResponse(error);
  }
};