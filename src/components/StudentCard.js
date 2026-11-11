import { SquarePen,Trash } from "lucide-react";

export default function StudentCard({ student, onEdit, onDelete }) {
  const active = student.status !== "Inactive";

  return (
    <div className="rounded-lg bg-white p-5 shadow-md ring-1 ring-slate-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-teal-600 text-xs font-semibold text-white">
            {student.name?.charAt(0).toUpperCase()}
          </span>
          <span className="text-sm font-semibold text-slate-700">{student.name}</span>
        </div>
        <span
          className={`rounded-full px-3 py-0.5 text-[11px] ${
            active ? "bg-green-100 text-green-700" : "bg-rose-300 text-rose-700"
          }`}
        >
          {student.status || "Active"}
        </span>
      </div>

      <div className="mt-3 space-y-0.5 text-sm leading-relaxed text-slate-700">
        {student.roll && <p>Roll:{student.roll}</p>}
        <p className="break-all">Email:{student.email}</p>
        <p>Course:{student.department}</p>
        <p>Phone:{student.phone}</p>
        {student.address && <p className="pl-10">{student.address}</p>}
      </div>

      <div className="mt-4 flex justify-end gap-3">
        <button
          onClick={() => onEdit(student)}
          className="rounded px-1 py-1 text-slate-600 transition hover:bg-slate-100"
        >
          <SquarePen strokeWidth={2} className="size-5" />
        </button>
        <button
          onClick={() => onDelete(student)}
          className="rounded px-1 py-1 text-slate-600 transition hover:bg-slate-100"
        >
          <Trash strokeWidth={2} className="size-5" />
        </button>
      </div>

    </div>
  );
};