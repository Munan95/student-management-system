"use client";

import { useEffect, useState } from "react";
import Modal, { Field, inputClass } from "@/components/Modal";
import { request, jsonOptions } from "@/lib/request";

const PASS_PERCENT = 40;

function MarkModal({ initial, students, onClose, onSaved }) {
  const isEdit = Boolean(initial);
  const [values, setValues] = useState(
    initial
      ? {
          student: initial.student?._id || "",
          subject: initial.subject,
          score: initial.score,
          total: initial.total,
        }
      : { student: "", subject: "", score: "", total: 100 }
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const change = (e) => setValues((v) => ({ ...v, [e.target.name]: e.target.value }));

  async function submit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const body = { ...values, score: Number(values.score), total: Number(values.total) };
      await request(
        isEdit ? `/api/marks/${initial._id}` : "/api/marks",
        jsonOptions(isEdit ? "PUT" : "POST", body)
      );
      onSaved(isEdit ? "Marks updated successfully" : "Marks added successfully");
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  }

  return (
    <Modal
      title={isEdit ? "Edit Marks" : "Add Marks"}
      error={error}
      saving={saving}
      onClose={onClose}
      onSubmit={submit}
      submitLabel={isEdit ? "Update Marks" : "Add Marks"}
    >
      <Field label="Student" wide>
        <select name="student" value={values.student} onChange={change} required className={inputClass}>
          <option value="">Select a student</option>
          {students.map((s) => (
            <option key={s._id} value={s._id}>
              {s.name} ({s.department})
            </option>
          ))}
        </select>
      </Field>
      <Field label="Subject" wide>
        <input name="subject" value={values.subject} onChange={change} required placeholder="Data Structures" className={inputClass} />
      </Field>
      <Field label="Marks">
        <input name="score" type="number" min="0" value={values.score} onChange={change} required className={inputClass} />
      </Field>
      <Field label="Max Marks">
        <input name="total" type="number" min="1" value={values.total} onChange={change} required className={inputClass} />
      </Field>
    </Modal>
  );
}

function StatCard({ label, value, icon, color }) {
  return (
    <div className="flex items-center gap-4 rounded-md bg-white p-4 shadow-md ring-1 ring-slate-100">
      <div className={`flex h-12 w-12 items-center justify-center rounded-md text-xl ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-xs text-slate-700">{label}</p>
        <p className="mt-1 text-base font-bold">{value}</p>
      </div>
    </div>
  );
}

export default function MarkManager() {
  const [marks, setMarks] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  async function load() {
    try {
      const [m, s] = await Promise.all([request("/api/marks"), request("/api/students")]);
      setMarks(m);
      setStudents(s);
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

  async function handleDelete(mark) {
    if (!confirm("Delete this marks record?")) return;
    try {
      await request(`/api/marks/${mark._id}`, { method: "DELETE" });
      flash("Marks deleted");
      load();
    } catch (err) {
      setError(err.message);
    }
  }

  const pct = (m) => (m.score / m.total) * 100;
  const highest = marks.length ? Math.max(...marks.map((m) => m.score)) : 0;
  const passRate = marks.length
    ? (marks.filter((m) => pct(m) >= PASS_PERCENT).length / marks.length) * 100
    : 0;

  const th = "px-4 py-4 text-left text-sm font-normal uppercase";
  const td = "px-4 py-4 text-sm";

  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">Marks</h2>
          <p className="mt-1 text-2xl">Manage student marks and grades</p>
        </div>
        <button
          onClick={() => {
            setEditing(null);
            setModalOpen(true);
          }}
          className="rounded-md bg-blue-600 px-10 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Add Marks
        </button>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <StatCard label="Total Records" value={marks.length} icon="📊" color="bg-blue-600" />
        <StatCard label="Highest Marks" value={highest} icon="🏆" color="bg-yellow-400" />
        <StatCard label="Pass Rate" value={`${passRate.toFixed(1)}%`} icon="🎯" color="bg-purple-500" />
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
              <th className={th}>Student Name</th>
              <th className={th}>Course</th>
              <th className={th}>Subject</th>
              <th className={th}>Marks</th>
              <th className={th}>Max Marks</th>
              <th className={th}>Percentage</th>
              <th className={`${th} text-right`}>Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {loading ? (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-sm text-slate-500">
                  Loading marks...
                </td>
              </tr>
            ) : marks.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-sm text-slate-500">
                  No marks yet. Click “Add Marks” to create one.
                </td>
              </tr>
            ) : (
              marks.map((m) => (
                <tr key={m._id}>
                  <td className={td}>{m.student?.name || "Unknown student"}</td>
                  <td className={td}>{m.student?.department || "-"}</td>
                  <td className={td}>{m.subject}</td>
                  <td className={td}>{m.score}</td>
                  <td className={td}>{m.total}</td>
                  <td className={td}>{pct(m).toFixed(1)}%</td>
                  <td className={`${td} whitespace-nowrap text-right`}>
                    <button
                      onClick={() => {
                        setEditing(m);
                        setModalOpen(true);
                      }}
                      className="mr-2 rounded bg-blue-600 px-3 py-1 text-xs font-medium text-white hover:bg-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(m)}
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
        <MarkModal
          initial={editing}
          students={students}
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