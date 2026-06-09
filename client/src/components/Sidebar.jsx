import {
  LayoutDashboard,
  FolderKanban,
  ClipboardList,
  Clock,
  Users,
  LogOut,
  BriefcaseBusiness,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const menuItems = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Projects",
    path: "/projects",
    icon: FolderKanban,
  },
  {
    title: "Tasks",
    path: "/tasks",
    icon: ClipboardList,
  },
  {
    title: "Work Logs",
    path: "/worklogs",
    icon: Clock,
  },
  {
    title: "Users",
    path: "/users",
    icon: Users,
  },
];

const Sidebar = () => {
  return (
    <aside className="w-72 bg-gradient-to-b from-slate-950 to-slate-900 text-white flex flex-col">
      {/* Logo */}
      <div className="h-20 px-6 border-b border-slate-800 flex items-center">
        <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center">
          <BriefcaseBusiness size={24} />
        </div>

        <div className="ml-3">
          <h1 className="text-3xl font-bold">
            TaskFlow
          </h1>

          <p className="text-xs text-slate-400">
            Project Management
          </p>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `
                    flex items-center gap-3
                    px-4 py-3
                    rounded-xl
                    transition-all
                    ${
                      isActive
                        ? "bg-indigo-600 text-white shadow-lg"
                        : "hover:bg-white/10 text-slate-300"
                    }
                  `
                  }
                >
                  <Icon size={20} />
                  <span>{item.title}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Section */}
      <div className="border-t border-slate-800 p-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-indigo-600 flex items-center justify-center font-bold">
            M
          </div>

          <div className="flex-1">
            <h3 className="text-sm font-semibold">
              Mohit Choudhary
            </h3>

            <p className="text-xs text-slate-400">
              Administrator
            </p>
          </div>

          <button className="text-slate-400 hover:text-red-500">
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;