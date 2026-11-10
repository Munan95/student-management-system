import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Attendance from "@/models/Attendance";
import { badRequest, errorResponse, isValidId } from "@/lib/api";

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

// READ: attendance records for one date  (?date=YYYY-MM-DD)
export async function GET(request) {
  try {
    const date = new URL(request.url).searchParams.get("date");
    if (!date || !DATE_RE.test(date)) return badRequest("A valid date (YYYY-MM-DD) is required");
    await connectDB();
    const records = await Attendance.find({ date }).lean();
    return NextResponse.json({ success: true, data: records });
  } catch (error) {
    return errorResponse(error);
  }
}

// CREATE / UPDATE: save attendance for a date (upsert per student)
export async function POST(request) {
  try {
    const { date, records } = await request.json();
    if (!date || !DATE_RE.test(date)) return badRequest("A valid date (YYYY-MM-DD) is required");
    if (!Array.isArray(records) || records.length === 0) {
      return badRequest("No attendance records to save");
    }
    for (const r of records) {
      if (!isValidId(r.student) || !["Present", "Absent"].includes(r.status)) {
        return badRequest("Invalid attendance record");
      }
    }
    await connectDB();
    await Attendance.bulkWrite(
      records.map((r) => ({
        updateOne: {
          filter: { student: r.student, date },
          update: { $set: { status: r.status } },
          upsert: true,
        },
      }))
    );
    return NextResponse.json({ success: true, data: { saved: records.length } });
  } catch (error) {
    return errorResponse(error);
  }
};