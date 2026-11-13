"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { House,GraduationCap,List,CalendarCheck,SquarePen } from "lucide-react";
import SidebarIcon from "@/components/SidebarIcon";

const items = [
  { label: "Dashboard", href: "/", icon: House },
  { label: "Students", href: "/students", icon: GraduationCap },
  { label: "Courses", href: "/courses", icon: List },
  { label: "Attendance", href: "/attendance", icon: CalendarCheck },
  { label: "Marks", href: "/marks", icon: SquarePen },
];

export default function Sidebar({ open,onToggleSidebar }) {
  const pathname = usePathname();

  return (
    <aside
      className={`sticky top-3 m-3 h-[calc(100vh-1.5rem)] shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-md transition-all duration-400 ${open ? "w-56" : "w-18"
        }`}
    >
      {/* fixed-width inner box so text doesn't wrap while the sidebar animates */}
      <div
        className={`flex h-16 items-center border-b border-slate-300 shadow-md ${open ? "justify-between px-4" : "justify-center px-0"
          }`}
      >
        {open && (
          <span className="pl-2 text-2xl font-bold text-slate-700">Menu</span>
        )}
        <button
          type="button"
          onClick={onToggleSidebar}
          aria-label={open ? "Collapse sidebar" : "Expand sidebar"}
          className="rounded-md p-1.5 text-slate-700 hover:bg-slate-100"
        >
          <SidebarIcon />
        </button>
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
              title={item.label}
              className={`flex items-center whitespace-nowrap rounded-md py-3 text-sm font-semibold transition ${open ? "gap-3 px-4" : "justify-center px-0"
                } ${active
                  ? "border-r-4 border-teal-500 bg-teal-200 text-slate-600"
                  : "text-slate-600 hover:bg-slate-100"
                }`}
            >
              <Icon strokeWidth={2} className="size-5 shrink-0" />
              {open && item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};