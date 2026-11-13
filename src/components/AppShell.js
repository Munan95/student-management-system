"use client";

import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function AppShell({ children }) {
  const [open, setOpen] = useState(true);

  // start collapsed (icons only) on small screens
  useEffect(() => {
    if (window.innerWidth < 768) setOpen(false);
  }, []);

  return (
    <div className="flex">
      <Sidebar open={open} onToggleSidebar={() => setOpen((prev) => !prev)} />
      <div className="flex min-w-0 flex-1 flex-col">
        <Header />
        <div className="flex-1 bg-white">{children}</div>
      </div>
    </div>
  );
};