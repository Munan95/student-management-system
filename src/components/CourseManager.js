"use client";

import { useEffect, useState } from "react";
import Modal, { Field, inputClass } from "@/components/Modal";
import { request, jsonOptions } from "@/lib/request";

const EMPTY = { name: "", code: "", instructor: "", duration: "4 Years", fees: "" };

function CourseModal({ initial, onClose, onSaved }) {
  const isEdit = Boolean(initial);
  const [values, setValues] = useState(
    initial
      ? {
          name: initial.name,
          code: initial.code || "",
          instructor: initial.instructor || "",
          duration: initial.duration || "",
          fees: initial.fees ?? "",
        }
      : EMPTY
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const change = (e) => setValues((v) => ({ ...v, [e.target.name]: e.target.value }));

  async function submit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const body = { ...values, fees: Number(values.fees) };
      await request(
        isEdit ? `/api/courses/${initial._id}` : "/api/courses",
        jsonOptions(isEdit ? "PUT" : "POST", body)
      );
      onSaved(isEdit ? "Course updated successfully" : "Course added successfully");
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  }

  return (
    <Modal
      title={isEdit ? "Edit Course" : "Add New Course"}
      error={error}
      saving={saving}
      onClose={onClose}
      onSubmit={submit}
      submitLabel={isEdit ? "Update Course" : "Add Course"}
    >
      <Field label="Course Name" wide>
        <input name="name" value={values.name} onChange={change} required placeholder="Computer Science" className={inputClass} />
      </Field>
      <Field label="Code">
        <input name="code" value={values.code} onChange={change} required placeholder="CS" className={inputClass} />
      </Field>
      <Field label="Duration">
        <input name="duration" value={values.duration} onChange={change} required placeholder="4 Years" className={inputClass} />
      </Field>
      <Field label="Instructor" wide>
        <input name="instructor" value={values.instructor} onChange={change} required placeholder="Dr. Rajesh Kumar" className={inputClass} />
      </Field>
      <Field label="Fees" wide>
        <input name="fees" type="number" min="0" value={values.fees} onChange={change} required placeholder="250000" className={inputClass} />
      </Field>
    </Modal>
  );
}

export default function CourseManager() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  async function load() {
    try {
      setCourses(await request("/api/courses"));
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function flash(text) {
    setMessage(text);
    setTimeout(() => setMessage(""), 3000);
  }

  async function handleDelete(course) {
    if (!confirm(`Delete course "${course.name}"?`)) return;
    try {
      await request(`/api/courses/${course._id}`, { method: "DELETE" });
      flash("Course deleted");
      load();
    } catch (err) {
      setError(err.message);
    }
  }

  const th = "px-4 py-5 text-left text-sm font-normal uppercase";
  const td = "px-4 py-5 text-sm";

  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">Courses</h2>
          <p className="mt-1 text-2xl">Manage courses information</p>
        </div>
        <button
          onClick={() => {
            setEditing(null);
            setModalOpen(true);
          }}
          className="rounded-md bg-blue-600 px-8 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Add Course
        </button>
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

      <div className="mt-6 overflow-x-auto border border-slate-800 bg-white shadow-md">
        <table className="min-w-full divide-y divide-slate-800">
          <thead>
            <tr>
              <th className={th}>Course Name</th>
              <th className={th}>Code</th>
              <th className={th}>Instructor</th>
              <th className={th}>Students</th>
              <th className={th}>Duration</th>
              <th className={th}>Fees</th>
              <th className={`${th} text-right`}>Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {loading ? (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-sm text-slate-500">
                  Loading courses...
                </td>
              </tr>
            ) : courses.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-sm text-slate-500">
                  No courses yet. Click “Add Course” to create one.
                </td>
              </tr>
            ) : (
              courses.map((c) => (
                <tr key={c._id}>
                  <td className={td}>{c.name}</td>
                  <td className={td}>{c.code}</td>
                  <td className={td}>{c.instructor}</td>
                  <td className={td}>{c.students}</td>
                  <td className={td}>{c.duration}</td>
                  <td className={td}>{Number(c.fees).toLocaleString("en-IN")}</td>
                  <td className={`${td} whitespace-nowrap text-right`}>
                    <button
                      onClick={() => {
                        setEditing(c);
                        setModalOpen(true);
                      }}
                      className="mr-2 rounded bg-blue-600 px-3 py-1 text-xs font-medium text-white hover:bg-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(c)}
                      className="rounded bg-red-400 px-3 py-1 text-xs font-medium text-white hover:bg-red-500"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <CourseModal
          initial={editing}
          onClose={() => setModalOpen(false)}
          onSaved={(text) => {
            setModalOpen(false);
            flash(text);
            load();
          }}
        />
      )}
    </div>
  );
};