import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export const metadata = {
  title: "Student Management System",
  description: "Manage student records with Next.js, Tailwind CSS and MongoDB",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-slate-900 antialiased">
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex min-w-0 flex-1 flex-col">
            <Header />
            <div className="flex-1 bg-white">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
};