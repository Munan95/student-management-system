import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Course from "@/models/Course";
import { errorResponse, invalidId, isValidId, notFound } from "@/lib/api";

// UPDATE
export async function PUT(request, { params }) {
  const { id } = await params;
  try {
    if (!isValidId(id)) return invalidId();
    await connectDB();
    const { name, code, instructor, duration, fees } = await request.json();
    const course = await Course.findByIdAndUpdate(
      id,
      { name, code, instructor, duration, fees },
      { new: true, runValidators: true }
    );
    if (!course) return notFound("Course");
    return NextResponse.json({ success: true, data: course });
  } catch (error) {
    return errorResponse(error);
  }
}

// DELETE
export async function DELETE(_request, { params }) {
  const { id } = await params;
  try {
    if (!isValidId(id)) return invalidId();
    await connectDB();
    const course = await Course.findByIdAndDelete(id);
    if (!course) return notFound("Course");
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return errorResponse(error);
  }
};