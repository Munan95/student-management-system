export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 flex h-16 w-700 items-center justify-between border-b border-slate-200 rounded-xl m-3 bg-white px-6 shadow-md">
      <h1 className="text-xl font-semibold">Student Management System</h1>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-600 text-sm font-semibold text-white">
            AR
          </span>
          <span className="text-sm text-slate-700">Admin</span>
        </div>
        <button
          type="button"
          className="rounded-md bg-rose-400 px-5 py-1.5 text-sm font-medium text-slate-900 transition hover:bg-rose-500"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};