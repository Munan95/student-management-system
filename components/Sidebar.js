"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { label: "Dashboard", href: "/", icon: "📊" },
  { label: "Students", href: "/students", icon: "👥" },
  { label: "Courses", href: "/courses", icon: "📚" },
  { label: "Attendance", href: "/attendance", icon: "✅" },
  { label: "Marks", href: "/marks", icon: "📝" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 hidden h-screen w-56 shrink-0 border-r border-slate-200 bg-white md:block">
      <div className="flex h-16 items-center border-b border-slate-300 px-6 shadow-sm">
        <span className="text-xl font-semibold">Menu</span>
      </div>
      <nav className="mt-10 space-y-5 px-3">
        {items.map((item) => {
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-md px-4 py-3 text-sm font-semibold transition ${
                active
                  ? "border-r-4 border-indigo-600 bg-indigo-200 text-slate-900"
                  : "text-slate-900 hover:bg-slate-100"
              }`}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};