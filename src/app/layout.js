import "./globals.css";
import AppShell from "../components/AppShell";

export const metadata = {
  title: "Student Management System",
  description: "Manage student records with Next.js, Tailwind CSS and MongoDB",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-slate-900 antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
};