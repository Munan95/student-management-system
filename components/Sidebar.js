const items = [
  { label: "Dashboard", icon: "📊", active: false },
  { label: "Students", icon: "👥", active: true },
  { label: "Courses", icon: "📚", active: false },
  { label: "Attendence", icon: "✅", active: false },
  { label: "Marks", icon: "📝", active: false },
];

export default function Sidebar() {
  return (
    <aside className="hidden w-56 shrink-0 border-r border-slate-200 bg-white md:block">
      <div className="flex h-16 items-center border-b border-slate-300 px-6 shadow-sm">
        <span className="text-xl font-semibold">Menu</span>
      </div>
      <nav className="mt-10 space-y-5 px-3">
        {items.map((item) => (
          <div
            key={item.label}
            className={`flex cursor-pointer items-center gap-3 rounded-md px-4 py-3 text-sm font-semibold transition ${
              item.active
                ? "border-r-4 border-indigo-600 bg-indigo-200 text-slate-900"
                : "text-slate-900 hover:bg-slate-100"
            }`}
          >
            <span className="text-base">{item.icon}</span>
            {item.label}
          </div>
        ))}
      </nav>
    </aside>
  );
};