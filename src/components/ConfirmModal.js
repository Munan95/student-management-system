"use client";

import { useEffect } from "react";
import { Trash2 } from "lucide-react";

export default function ConfirmModal({
  title = "Are you sure you want to delete this student?",
  confirmText = "Yes, Delete",
  cancelText = "Cancel",
  loading = false,
  onConfirm,
  onCancel,
}) {
  // close on Escape
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && !loading && onCancel();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [loading, onCancel]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4"
      onClick={() => !loading && onCancel()}
    >
      <div
        role="alertdialog"
        aria-modal="true"
        className="w-full max-w-md rounded-3xl bg-white px-8 py-10 text-center shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Trash2 strokeWidth={1.5} className="mx-auto size-12 text-rose-500" />

        <h3 className="mx-auto mt-6 max-w-xs text-xl font-semibold leading-snug text-slate-700">
          {title}
        </h3>

        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="rounded-lg border border-slate-500 px-8 py-3 text-lg font-medium text-slate-700 transition hover:bg-slate-100 disabled:opacity-60"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="rounded-lg bg-teal-600 px-8 py-3 text-lg font-medium text-white transition hover:bg-teal-700 disabled:opacity-60"
          >
            {loading ? "Deleting..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};