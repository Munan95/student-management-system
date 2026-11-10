export default function StudentTable({ students, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto rounded-lg bg-white shadow-md ring-1 ring-slate-200">
      <table className="min-w-full divide-y divide-slate-200 text-sm">
        <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
          <tr>
            <th className="px-5 py-3 font-semibold">Name</th>
            <th className="px-5 py-3 font-semibold">Roll</th>
            <th className="px-5 py-3 font-semibold">Email</th>
            <th className="px-5 py-3 font-semibold">Phone</th>
            <th className="px-5 py-3 font-semibold">Department</th>
            <th className="px-5 py-3 font-semibold">Status</th>
            <th className="px-5 py-3 text-right font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {students.map((s) => {
            const active = s.status !== "Inactive";
            return (
              <tr key={s._id} className="hover:bg-slate-50">
                <td className="whitespace-nowrap px-5 py-3">
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
                      {s.name?.charAt(0).toUpperCase()}
                    </span>
                    <span className="font-medium">{s.name}</span>
                  </div>
                </td>
                <td className="whitespace-nowrap px-5 py-3">{s.roll || "-"}</td>
                <td className="whitespace-nowrap px-5 py-3">{s.email}</td>
                <td className="whitespace-nowrap px-5 py-3">{s.phone}</td>
                <td className="whitespace-nowrap px-5 py-3">{s.department}</td>
                <td className="whitespace-nowrap px-5 py-3">
                  <span
                    className={`rounded-full px-3 py-0.5 text-[11px] ${
                      active ? "bg-green-100 text-green-700" : "bg-red-300 text-red-700"
                    }`}
                  >
                    {s.status || "Active"}
                  </span>
                </td>
                <td className="whitespace-nowrap px-5 py-3 text-right">
                  <button
                    onClick={() => onEdit(s)}
                    className="mr-2 rounded bg-blue-600 px-4 py-1 text-xs font-medium text-white hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(s)}
                    className="rounded bg-red-400 px-4 py-1 text-xs font-medium text-white hover:bg-red-500"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};