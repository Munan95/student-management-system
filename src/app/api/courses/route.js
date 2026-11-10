import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Course from "@/models/Course";
import Student from "@/models/Student";
import { errorResponse } from "@/lib/api";
import { matchesCourse } from "@/lib/courseMatch";

// READ: all courses, each with the number of students in that course
export async function GET() {
  try {
    await connectDB();
    const [courses, students] = await Promise.all([
      Course.find({}).sort({ createdAt: 1 }).lean(),
      Student.find({}).select("department").lean(),
    ]);
    const data = courses.map((c) => ({
      ...c,
      students: students.filter((s) => matchesCourse(s.department, c.name)).length,
    }));
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return errorResponse(error);
  }
}

// CREATE
export async function POST(request) {
  try {
    await connectDB();
    const { name, code, instructor, duration, fees } = await request.json();
    const course = await Course.create({ name, code, instructor, duration, fees });
    return NextResponse.json({ success: true, data: course }, { status: 201 });
  } catch (error) {
    return errorResponse(error);
  }
};