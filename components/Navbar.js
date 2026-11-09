export default function Header() {
  return (
    <header className="fixed top-0 left-0 z-50 flex h-16 w-full items-center justify-between border-b border-slate-300 bg-white px-6 shadow-sm">
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
    </header>
  );
};