import { NextResponse } from "next/server";
import mongoose from "mongoose";
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
  );
};

function invalidId() {
  return NextResponse.json({ success: false, error: "Invalid student id" }, { status: 400 });
};

// READ: get one student
export async function GET(_request, { params }) {
  try {
    if (!mongoose.isValidObjectId(params.id)) return invalidId();
    await connectDB();
    const student = await Student.findById(params.id);
    if (!student) {
      return NextResponse.json({ success: false, error: "Student not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: student });
  } catch (error) {
    return errorResponse(error);
  }
};

// UPDATE: edit a student
export async function PUT(request, { params }) {
  try {
    if (!mongoose.isValidObjectId(params.id)) return invalidId();
    await connectDB();
    const { name, email, phone, department, roll, address, status } = await request.json();
    const student = await Student.findByIdAndUpdate(
      params.id,
      { name, email, phone, department, roll, address, status },
      { new: true, runValidators: true }
    );
    if (!student) {
      return NextResponse.json({ success: false, error: "Student not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: student });
  } catch (error) {
    return errorResponse(error);
  }
};

// DELETE: remove a student
export async function DELETE(_request, { params }) {
  try {
    if (!mongoose.isValidObjectId(params.id)) return invalidId();
    await connectDB();
    const student = await Student.findByIdAndDelete(params.id);
    if (!student) {
      return NextResponse.json({ success: false, error: "Student not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return errorResponse(error);
  }
};