"use client";

import { useEffect, useState } from "react";
import Modal, { Field, inputClass } from "@/components/Modal";
import { request, jsonOptions } from "@/lib/request";
import { SquarePen,Trash } from "lucide-react";
import ConfirmModal from "./ConfirmModal";

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
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false); 

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

  // Delete
  function handleDelete(courses) {
    setDeleteTarget(courses); // open the modal
  }

  async function confirmDelete() {
    setDeleting(true);
    try {
      const res = await fetch(`/api/courses/${deleteTarget._id}`, { method: "DELETE" });
      const json = await res.json();
      if (!json.success) throw new Error(json.error);
      flash("Courses deleted");
      await load();
    } catch (err) {
      setError(err.message || "Failed to delete courses");
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  }

  const th = "px-4 py-5 text-left text-sm text-slate-950 font-normal uppercase";
  const td = "px-4 py-5 text-sm text-slate-700";

  return (
    <div>

      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-700">Courses</h2>
          <p className="mt-1 text-lg text-slate-500">Manage courses information</p>
        </div>
        <button
          onClick={() => {
            setEditing(null);
            setModalOpen(true);
          }}
          className="rounded-md bg-teal-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-700"
        >
          Add Course
        </button>
      </div>

      {message && (
        <div className="mt-5 rounded-md border border-teal-200 bg-teal-50 px-4 py-3 text-sm text-teal-700">
          {message}
        </div>
      )}
      {error && (
        <div className="mt-5 rounded-md border border-rose-200 bg-red-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </div>
      )}

      <div className="mt-6 p-6 bg-white rounded-md shadow-md">
        <div className="overflow-x-auto border border-slate-500">
          <table className="min-w-full divide-y divide-slate-500">
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
            <tbody className="divide-y divide-slate-500">
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
                        className="rounded px-1 py-1 text-teal-400 transition hover:text-teal-500"
                      >
                        <SquarePen strokeWidth={2} className="size-5" /> 
                      </button>
                      <button
                        onClick={() => handleDelete(c)}
                        className="rounded px-1 py-1 text-rose-400 transition hover:text-rose-500"
                      >
                        <Trash strokeWidth={2} className="size-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
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

      {deleteTarget && (
        <ConfirmModal
          title={`Are you sure you want to delete ${deleteTarget.name}?`}
          loading={deleting}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}

    </div>
  );
};