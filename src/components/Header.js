import Image from "next/image";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b rounded-xl ml-2 mr-4 my-2 border-slate-300 bg-white px-6 shadow-md">
      
      <div className="flex gap-1 items-center justify-center">
        <Image
              src="/EduDash Learning Emblem.png"
              alt="app-logo"
              width={36}
              height={36}
              priority
              className="h-9 w-9 rounded-full"
            />
        <h1 className="text-2xl font-bold text-slate-700">EduDash</h1>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-sm font-semibold text-white/90">
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