"use client";

import { useState } from "react";

const EMPTY = {
  name: "",
  email: "",
  phone: "",
  department: "",
  roll: "",
  address: "",
  status: "Active",
};

const inputClass =
  "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200";

export default function StudentModal({ initial, saving, error, onSubmit, onClose }) {
  const isEdit = Boolean(initial);
  const [values, setValues] = useState(
    initial
      ? {
          name: initial.name || "",
          email: initial.email || "",
          phone: initial.phone || "",
          department: initial.department || "",
          roll: initial.roll || "",
          address: initial.address || "",
          status: initial.status || "Active",
        }
      : EMPTY
  );

  function handleChange(e) {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(values);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      onClick={onClose}
    >
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-6 shadow-xl"
      >
        <h2 className="mb-5 text-lg font-semibold">
          {isEdit ? "Edit Student" : "Add New Student"}
        </h2>

        {error && (
          <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-medium">Name</label>
            <input name="name" value={values.name} onChange={handleChange} required placeholder="Full name" className={inputClass} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Roll</label>
            <input name="roll" value={values.roll} onChange={handleChange} placeholder="CS001" className={inputClass} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Status</label>
            <select name="status" value={values.status} onChange={handleChange} className={inputClass}>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-medium">Email</label>
            <input name="email" type="email" value={values.email} onChange={handleChange} required placeholder="student@example.com" className={inputClass} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Phone</label>
            <input name="phone" type="tel" value={values.phone} onChange={handleChange} required placeholder="+91-9867543001" className={inputClass} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Department</label>
            <input name="department" value={values.department} onChange={handleChange} required placeholder="Computer Science" className={inputClass} />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-medium">Address</label>
            <input name="address" value={values.address} onChange={handleChange} placeholder="City, State" className={inputClass} />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-slate-300 px-5 py-2 text-sm font-medium hover:bg-slate-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="rounded-md bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {saving ? "Saving..." : isEdit ? "Update Student" : "Add Student"}
          </button>
        </div>
      </form>
    </div>
  );
};