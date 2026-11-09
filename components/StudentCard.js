export default function StudentCard({ student, onEdit, onDelete }) {
  const active = student.status !== "Inactive";

  return (
    <div className="rounded-lg bg-white p-5 shadow-md ring-1 ring-slate-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
            {student.name?.charAt(0).toUpperCase()}
          </span>
          <span className="text-sm font-semibold">{student.name}</span>
        </div>
        <span
          className={`rounded-full px-3 py-0.5 text-[11px] ${
            active ? "bg-green-100 text-green-700" : "bg-red-300 text-red-700"
          }`}
        >
          {student.status || "Active"}
        </span>
      </div>

      <div className="mt-3 space-y-0.5 text-sm leading-relaxed text-slate-900">
        {student.roll && <p>Roll:{student.roll}</p>}
        <p className="break-all">Email:{student.email}</p>
        <p>Course:{student.department}</p>
        <p>Phone:{student.phone}</p>
        {student.address && <p className="pl-10">{student.address}</p>}
      </div>

      <div className="mt-4 flex justify-center gap-3">
        <button
          onClick={() => onEdit(student)}
          className="w-24 rounded bg-blue-600 py-1 text-[11px] font-medium text-white transition hover:bg-blue-700"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(student)}
          className="w-24 rounded bg-red-400 py-1 text-[11px] font-medium text-white transition hover:bg-red-500"
        >
          Delete
        </button>
      </div>
    </div>
  );
};