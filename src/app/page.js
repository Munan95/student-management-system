import { Suspense } from "react";
import { connection } from "next/server";
import Link from "next/link";
import connectDB from "../lib/mongodb";
import Student from "../models/Student";
import Course from "../models/Course";
import Mark from "../models/Mark";
import { GraduationCap,List } from "lucide-react";

async function getDashboardData() {
  await connection();
  await connectDB();
  const [totalStudents, totalCourses, recentStudents, recentMarks] = await Promise.all([
    Student.countDocuments(),
    Course.countDocuments(),
    Student.find({}).sort({ createdAt: -1 }).limit(4).lean(),
    Mark.find({}).sort({ createdAt: -1 }).limit(4).populate("student", "name").lean(),
  ]);

  return {
    totalStudents,
    totalCourses,
    recentStudents: recentStudents.map((s) => ({
      id: String(s._id),
      name: s.name,
      department: s.department,
      status: s.status || "Active",
    })),
    recentMarks: recentMarks.map((m) => ({
      id: String(m._id),
      student: m.student?.name || "Unknown student",
      subject: m.subject,
      exam: m.exam,
      score: m.score,
      total: m.total,
    })),
  };
};

function StatCard({ label, value, icon, color }) {
  const Icon = icon;
  return (
    <div className="flex items-center gap-4 rounded-md bg-white p-4 shadow-md ring-1 ring-slate-100">
      <div className={`flex h-14 w-14 items-center justify-center rounded-md text-2xl ${color}`}>
        <Icon strokeWidth={2} className="size-5" />
      </div>
      <div>
        <p className="text-lg text-slate-700">{label}</p>
        <p className="text-xl font-bold text-slate-800">{value}</p>
      </div>
    </div>
  );
};

function DashboardSkeleton() {
  return <div className="h-40 animate-pulse rounded-xl bg-slate-100" />;
};

async function DashboardContent() {
  let data;
  let error = "";
  try {
    data = await getDashboardData();
  } catch (e) {
    error = e.message || "Could not load dashboard data";
  }

  if (error) {
    return (
      <div className="mt-6 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
        {error}
      </div>
    );
  }

  return (
    <>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <StatCard label="Total Students" value={data.totalStudents} icon={GraduationCap} color="bg-teal-500" />
        <StatCard label="Total Courses" value={data.totalCourses} icon={List} color="bg-teal-500" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Recent Students */}
        <section className="rounded-md bg-white p-6 shadow-md ring-1 ring-slate-100">
          <h3 className="text-xl font-bold text-slate-700">Recent Students</h3>
          <div className="mt-5 space-y-4">
            {data.recentStudents.length === 0 && (
              <p className="text-sm text-slate-500">No students yet.</p>
            )}
            {data.recentStudents.map((s) => {
              const active = s.status !== "Inactive";
              return (
                <div
                  key={s.id}
                  className="flex items-center justify-between rounded-md border-b-2 border-slate-400 bg-rose-100 px-5 py-4 shadow"
                >
                  <div className="flex items-center gap-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-600 font-semibold text-white">
                      {s.name.charAt(0).toUpperCase()}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{s.name}</p>
                      <p className="text-sm text-slate-700">{s.department}</p>
                    </div>
                  </div>
                  <span
                    className={`rounded-full px-4 py-1 text-xs ${active ? "bg-green-100 text-green-700" : "bg-rose-300 text-rose-700"
                      }`}
                  >
                    {active ? "Active" : "InActive"}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="mt-6 text-center">
            <Link href="/students" className="text-sm font-medium text-teal-600 hover:underline">
              View All Students →
            </Link>
          </div>
        </section>

        {/* Recent Marks */}
        <section className="rounded-md bg-white p-6 shadow-md ring-1 ring-slate-100">
          <h3 className="text-xl font-bold text-slate-700">Recent Marks</h3>
          <div className="mt-5 space-y-4">
            {data.recentMarks.length === 0 && (
              <p className="text-sm text-slate-500">
                No marks yet. Run <code className="rounded bg-slate-100 px-1">npm run seed</code> to load sample data.
              </p>
            )}
            {data.recentMarks.map((m) => {
              const pct = Math.round((m.score / m.total) * 1000) / 10;
              return (
                <div
                  key={m.id}
                  className="flex items-start justify-between rounded-md border-b-2 border-slate-300 bg-rose-100 px-5 py-4 shadow"
                >
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{m.student}</p>
                    <p className="mt-2 text-sm text-slate-700">
                      {m.subject}
                      {m.exam ? `-${m.exam}` : ""}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-slate-700">
                      {m.score}/{m.total}
                    </p>
                    <p
                      className={`mt-2 text-sm ${pct >= 80 ? "text-green-500" : "text-rose-600"
                        }`}
                    >
                      {pct.toFixed(1)}%
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-6 text-center">
            <Link href="/marks" className="text-sm font-medium text-teal-600 hover:underline">
              View All Marks →
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default function Dashboard() {
  return (
    <main className="px-6 py-6 bg-slate-100">
      <h2 className="text-3xl font-bold text-slate-700">Dashboard</h2>
      <p className="mt-2 text-2xl text-slate-700">Welcome to the Student Management System</p>

      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardContent />
      </Suspense>
    </main>
  );
};