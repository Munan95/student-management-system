export default function Header() {
  return (
    <header className="sticky top-0 z-50 flex h-16 w-367 items-center justify-between border-b rounded-xl m-2 border-slate-300 bg-white px-6 shadow-md">
      <h1 className="text-2xl font-bold">EduDash</h1>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-sm font-semibold text-white">
            AR
          </span>
          <span className="text-base text-slate-700">Admin</span>
        </div>
        <button
          type="button"
          className="rounded-md bg-rose-400 px-4.5 py-1.25 text-base font-medium text-white transition hover:bg-rose-500"
        >
          Logout
        </button>
      </div>
    </header>
  );
};