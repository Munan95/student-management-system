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

export default function Sidebar({ open }) {
  const pathname = usePathname();

  return (
    <aside
      className={`sticky top-3 h-[calc(100vh-1.5rem)] shrink-0 overflow-hidden rounded-xl bg-white transition-all duration-300 ${open ? "m-3 w-56 border border-slate-200 shadow-md" : "m-0 w-0 border-0"
        }`}
    >
      {/* fixed-width inner box so text doesn't wrap while the sidebar animates */}
      <div className="w-56">
        <div className="flex h-16 items-center border-b border-slate-300 px-6 shadow-md">
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
                className={`flex items-center gap-3 whitespace-nowrap rounded-md px-4 py-3 text-sm font-semibold transition ${active
                    ? "border-r-4 border-sky-600 bg-sky-200 text-slate-900"
                    : "text-slate-900 hover:bg-slate-100"
                  }`}
              >
                <span className="text-base">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};