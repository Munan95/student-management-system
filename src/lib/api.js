import { NextResponse } from "next/server";
import mongoose from "mongoose";

export function errorResponse(error) {
  if (error.name === "ValidationError") {
    const message = Object.values(error.errors)
      .map((e) => e.message)
      .join(", ");
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
  if (error.code === 11000) {
    const field = Object.keys(error.keyPattern || {})[0] || "value";
    return NextResponse.json(
      { success: false, error: `A record with this ${field} already exists` },
      { status: 409 }
    );
  }
  return NextResponse.json(
    { success: false, error: error.message || "Server error" },
    { status: 500 }
  );
}

export const isValidId = (id) => mongoose.isValidObjectId(id);

export function invalidId() {
  return NextResponse.json({ success: false, error: "Invalid id" }, { status: 400 });
}

export function notFound(what = "Record") {
  return NextResponse.json({ success: false, error: `${what} not found` }, { status: 404 });
}

export function badRequest(message) {
  return NextResponse.json({ success: false, error: message }, { status: 400 });
}
