"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { House,GraduationCap,List,CalendarCheck,SquarePen } from "lucide-react";

const items = [
  { label: "Dashboard", href: "/", icon: House },
  { label: "Students", href: "/students", icon: GraduationCap },
  { label: "Courses", href: "/courses", icon: List },
  { label: "Attendance", href: "/attendance", icon: CalendarCheck },
  { label: "Marks", href: "/marks", icon: SquarePen },
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
          <span className="text-slate-700 text-2xl font-bold">Menu</span>
        </div>
        <nav className="mt-10 space-y-5 px-3">
          {items.map((item) => {
            const Icon = item.icon;
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 whitespace-nowrap rounded-md px-4 py-3 text-sm font-semibold transition ${active
                    ? "border-r-4 border-teal-500 bg-teal-200 text-slate-600"
                    : "text-slate-600 hover:bg-slate-100"
                  }`}
              >
                <Icon strokeWidth={2} className="size-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};