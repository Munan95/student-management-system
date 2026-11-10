import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Student from "@/models/Student";

function errorResponse(error) {
  if (error.name === "ValidationError") {
    const message = Object.values(error.errors)
      .map((e) => e.message)
      .join(", ");
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
  if (error.code === 11000) {
    return NextResponse.json(
      { success: false, error: "A student with this email already exists" },
      { status: 409 }
    );
  }
  return NextResponse.json(
    { success: false, error: error.message || "Server error" },
    { status: 500 }
  )
};

// READ: get all students
export async function GET() {
  try {
    await connectDB();
    const students = await Student.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: students });
  } catch (error) {
    return errorResponse(error);
  }
};

// CREATE: add a new student
export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const { name, email, phone, department, roll, address, status } = body;
    const student = await Student.create({ name, email, phone, department, roll, address, status });
    return NextResponse.json({ success: true, data: student }, { status: 201 });
  } catch (error) {
    return errorResponse(error);
  }
};