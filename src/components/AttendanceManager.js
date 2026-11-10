"use client";

import { useEffect, useMemo, useState } from "react";
import { request, jsonOptions } from "@/lib/request";
import { matchesCourse } from "@/lib/courseMatch";

function today() {
  const d = new Date();
  const p = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

function StatCard({ label, value, icon, color }) {
  return (
    <div className="flex items-center gap-4 rounded-md bg-white p-4 shadow-md ring-1 ring-slate-100">
      <div className={`flex h-12 w-12 items-center justify-center rounded-md text-xl text-white ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-xs text-slate-700">{label}</p>
        <p className="mt-1 text-base font-bold">{value}</p>
      </div>
    </div>
  );
}

export default function AttendanceManager() {
  const [date, setDate] = useState("");
  const [courseName, setCourseName] = useState("all");
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [statuses, setStatuses] = useState({}); // studentId -> "Present" | "Absent"
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Load students + courses once, and default the date to today
  useEffect(() => {
    setDate(today());
    Promise.all([request("/api/students"), request("/api/courses")])
      .then(([s, c]) => {
        setStudents([...s].reverse()); // oldest first
        setCourses(c);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // Load saved attendance whenever the date changes
  useEffect(() => {
    if (!date) return;
    let cancelled = false;
    request(`/api/attendance?date=${date}`)
      .then((records) => {
        if (cancelled) return;
        const map = {};
        records.forEach((r) => (map[r.student] = r.status));
        setStatuses(map);
      })
      .catch((err) => !cancelled && setError(err.message));
    return () => {
      cancelled = true;
    };
  }, [date]);

  const visible = useMemo(
    () =>
      courseName === "all"
        ? students
        : students.filter((s) => matchesCourse(s.department, courseName)),
    [students, courseName]
  );

  // Students without a saved record default to Present
  const statusOf = (id) => statuses[id] || "Present";
  const presentCount = visible.filter((s) => statusOf(s._id) === "Present").length;
  const absentCount = visible.length - presentCount;

  function flash(text) {
    setMessage(text);
    setTimeout(() => setMessage(""), 3000);
  }

  async function save() {
    setSaving(true);
    setError("");
    try {
      const records = visible.map((s) => ({ student: s._id, status: statusOf(s._id) }));
      await request("/api/attendance", jsonOptions("POST", { date, records }));
      setStatuses((prev) => {
        const next = { ...prev };
        records.forEach((r) => (next[r.student] = r.status));
        return next;
      });
      flash("Attendence saved successfully");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  const setStatus = (id, status) => setStatuses((prev) => ({ ...prev, [id]: status }));

  return (
    <div>
      <h2 className="text-3xl font-bold">Attendence</h2>
      <p className="mt-1 text-2xl">Mark student attendence by course</p>

      <div className="mt-6 flex flex-wrap items-end gap-6 rounded-md bg-white p-5 shadow-md ring-1 ring-slate-100">
        <div>
          <label className="block text-xl">Select Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-2 rounded-md border border-slate-400 px-3 py-2 text-sm outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-xl">Select Course</label>
          <select
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            className="mt-2 w-56 rounded-md border border-slate-400 px-3 py-2 text-sm outline-none focus:border-blue-500"
          >
            <option value="all">All Courses</option>
            {courses.map((c) => (
              <option key={c._id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={save}
          disabled={saving || !date || visible.length === 0}
          className="min-w-50 flex-1 rounded-md bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save Attendence"}
        </button>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <StatCard label="Total Students" value={visible.length} icon="👥" color="bg-blue-600" />
        <StatCard label="Present" value={presentCount} icon="✔" color="bg-green-500" />
        <StatCard label="Absent" value={absentCount} icon="✖" color="bg-red-400" />
      </div>

      {message && (
        <div className="mt-5 rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {message}
        </div>
      )}
      {error && (
        <div className="mt-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <section className="mt-6 rounded-md bg-white p-4 shadow-md ring-1 ring-slate-100">
        <h3 className="mb-3 text-base font-bold">Student Attendence</h3>
        {loading ? (
          <p className="py-8 text-center text-sm text-slate-500">Loading students...</p>
        ) : visible.length === 0 ? (
          <p className="py-8 text-center text-sm text-slate-500">
            No students found for this course.
          </p>
        ) : (
          <div className="border-t border-slate-800">
            {visible.map((s) => {
              const status = statusOf(s._id);
              return (
                <div
                  key={s._id}
                  className="flex items-center justify-between border-b border-slate-800 px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
                      {s.name.charAt(0).toUpperCase()}
                    </span>
                    <div>
                      <p className="text-xs font-semibold">{s.name}</p>
                      <p className="text-[11px] text-slate-700">{s.department}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setStatus(s._id, "Present")}
                      className={`w-16 rounded py-1 text-[11px] font-semibold transition ${
                        status === "Present"
                          ? "bg-green-500 text-white"
                          : "bg-slate-300 text-slate-800 hover:bg-slate-400"
                      }`}
                    >
                      Present
                    </button>
                    <button
                      onClick={() => setStatus(s._id, "Absent")}
                      className={`w-16 rounded py-1 text-[11px] font-semibold transition ${
                        status === "Absent"
                          ? "bg-red-400 text-white"
                          : "bg-slate-300 text-slate-800 hover:bg-slate-400"
                      }`}
                    >
                      Absent
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};