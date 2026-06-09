import {
  Bell,
  Search,
} from "lucide-react";

const Navbar = () => {
  return (
    <header className="h-20 bg-white border-b border-slate-200 px-6 flex items-center justify-between">
      {/* Left */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800">
          Dashboard
        </h2>

        <p className="text-sm text-slate-500">
          Welcome back, Mohit 👋
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="hidden md:flex items-center bg-slate-100 rounded-xl px-4 py-2 w-72">
          <Search
            size={18}
            className="text-slate-400"
          />

          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none ml-2 w-full"
          />
        </div>

        {/* Notification */}
        <button className="relative w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center hover:bg-slate-200">
          <Bell size={20} />

          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden md:block">
            <h4 className="font-medium text-sm">
              Mohit Choudhary
            </h4>

            <p className="text-xs text-slate-500">
              Admin
            </p>
          </div>

          <div className="w-11 h-11 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold">
            M
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;