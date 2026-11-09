export default function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-300 bg-white px-6 shadow-sm">
      <h1 className="text-xl font-semibold">Student Management System</h1>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
            AR
          </span>
          <span className="text-sm text-slate-700">Admin</span>
        </div>
        <button className="rounded-md bg-red-300 px-5 py-1.5 text-sm font-medium text-slate-900 transition hover:bg-red-400">
          Logout
        </button>
      </div>
    </header>
  );
};