"use client";

import { useEffect, useState } from "react";
import StudentCard from "./StudentCard";
import StudentTable from "./StudentTable";
import StudentModal from "./StudentModal";
import ConfirmModal from "./ConfirmModal";
import Pagination from "./Pagination";

export default function StudentManager() {
  const [students, setStudents] = useState([]);
  const [view, setView] = useState("cards");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [pageError, setPageError] = useState("");
  const [modalError, setModalError] = useState("");
  const [message, setMessage] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);

  async function loadStudents() {
    try {
      const res = await fetch("/api/students", { cache: "no-store" });
      const json = await res.json();
      if (!json.success) throw new Error(json.error);
      setStudents(json.data);
      setPageError("");
    } catch (err) {
      setPageError(err.message || "Failed to load students");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadStudents();
  }, []);

  function flash(text) {
    setMessage(text);
    setTimeout(() => setMessage(""), 3000);
  }

  function openAdd() {
    setEditing(null);
    setModalError("");
    setModalOpen(true);
  }

  function openEdit(student) {
    setEditing(student);
    setModalError("");
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditing(null);
    setModalError("");
  }

  // Create or update
  async function handleSubmit(values) {
    setSaving(true);
    setModalError("");
    try {
      const isEdit = Boolean(editing);
      const res = await fetch(isEdit ? `/api/students/${editing._id}` : "/api/students", {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error);
      closeModal();
      flash(isEdit ? "Student updated successfully" : "Student added successfully");
      await loadStudents();
    } catch (err) {
      setModalError(err.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  // Delete
  function handleDelete(student) {
    setDeleteTarget(student); // open the modal
  }

  async function confirmDelete() {
    setDeleting(true);
    try {
      const res = await fetch(`/api/students/${deleteTarget._id}`, { method: "DELETE" });
      const json = await res.json();
      if (!json.success) throw new Error(json.error);
      flash("Student deleted");
      await loadStudents();
    } catch (err) {
      setPageError(err.message || "Failed to delete student");
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  }

  const totalPages = Math.max(1, Math.ceil(students.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pagedStudents = students.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div>
      
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-700">Students</h2>
          <p className="mt-2 text-lg text-slate-500">
            Manage student information({students.length} total)
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex rounded-md bg-slate-300 p-1 text-sm text-slate-700">
            {["cards", "table"].map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`rounded px-5 py-1.5 capitalize transition ${
                  view === v ? "bg-white font-medium shadow-sm" : "text-slate-700"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
          <button
            onClick={openAdd}
            className="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700"
          >
            Add Student
          </button>
        </div>
      </div>

      {message && (
        <div className="mt-5 rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {message}
        </div>
      )}
      {pageError && (
        <div className="mt-5 rounded-md border border-rose-200 bg-red-50 px-4 py-3 text-sm text-rose-700">
          {pageError}
        </div>
      )}

      <div className="mt-6">
        {loading ? (
          <p className="py-10 text-center text-sm text-slate-500">Loading students...</p>
        ) : students.length === 0 ? (
          <p className="py-10 text-center text-sm text-slate-500">
            No students yet. Click “Add Student” to create one.
          </p>
        ) : view === "cards" ? (
          <div className="grid gap-6 sm:grid-cols-3">
            {pagedStudents.map((s) => (
              <StudentCard key={s._id} student={s} onEdit={openEdit} onDelete={handleDelete} />
            ))}
          </div>
        ) : (
          <StudentTable students={pagedStudents} onEdit={openEdit} onDelete={handleDelete} />
        )}
      </div>

      {!loading && students.length > 0 && (
        <Pagination
          page={currentPage}
          totalPages={totalPages}
          totalItems={students.length}
          pageSize={pageSize}
          onPageChange={setPage}
          onPageSizeChange={(n) => {
            setPageSize(n);
            setPage(1);
          }}
        />
      )}

      {modalOpen && (
        <StudentModal
          initial={editing}
          saving={saving}
          error={modalError}
          onSubmit={handleSubmit}
          onClose={closeModal}
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