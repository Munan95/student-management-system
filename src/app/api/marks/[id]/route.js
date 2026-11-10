import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Mark from "@/models/Mark";
import Student from "@/models/Student";
import { badRequest, errorResponse, invalidId, isValidId, notFound } from "@/lib/api";

// UPDATE
export async function PUT(request, { params }) {
  try {
    if (!isValidId(params.id)) return invalidId();
    await connectDB();
    const { student, subject, exam, score, total } = await request.json();
    if (!isValidId(student) || !(await Student.exists({ _id: student }))) {
      return badRequest("Please select a valid student");
    }
    if (Number(score) > Number(total)) {
      return badRequest("Marks cannot be greater than max marks");
    }
    const update = { student, subject, score, total };
    if (exam !== undefined) update.exam = exam;
    const mark = await Mark.findByIdAndUpdate(params.id, update, {
      new: true,
      runValidators: true,
    });
    if (!mark) return notFound("Mark");
    return NextResponse.json({ success: true, data: mark });
  } catch (error) {
    return errorResponse(error);
  }
}

// DELETE
export async function DELETE(_request, { params }) {
  try {
    if (!isValidId(params.id)) return invalidId();
    await connectDB();
    const mark = await Mark.findByIdAndDelete(params.id);
    if (!mark) return notFound("Mark");
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return errorResponse(error);
  }
};