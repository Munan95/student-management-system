"use client";

export const inputClass =
  "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-200";

export default function Modal({ title, error, onClose, onSubmit, saving, submitLabel, children }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      onClick={onClose}
    >
      <form
        onSubmit={onSubmit}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-6 shadow-xl"
      >
        <h2 className="mb-5 text-lg font-semibold text-slate-700">{title}</h2>
        {error && (
          <div className="mb-4 rounded-md border border-rose-200 bg-red-50 px-3 py-2 text-sm text-rose-700">
            {error}
          </div>
        )}
        <div className="grid gap-4 sm:grid-cols-2">{children}</div>
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-slate-300 px-5 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="rounded-md bg-teal-600 px-5 py-2 text-sm font-medium text-white hover:bg-teal-700 disabled:opacity-60"
          >
            {saving ? "Saving..." : submitLabel}
          </button>
        </div>
      </form>
    </div>
  );
}

export function Field({ label, wide, children }) {
  return (
    <div className={wide ? "sm:col-span-2" : ""}>
      <label className="mb-1 block text-sm font-medium text-slate-700">{label}</label>
      {children}
    </div>
  );
};