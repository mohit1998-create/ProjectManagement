import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-slate-900 text-white">
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-xl font-bold">
          Project Manager
        </h1>
      </div>

      <nav className="p-4">
        <ul className="space-y-2">
          <li>
            <Link
              to="/dashboard"
              className="block p-3 rounded-lg hover:bg-slate-800"
            >
              Dashboard
            </Link>
          </li>

          <li>
            <Link
              to="/projects"
              className="block p-3 rounded-lg hover:bg-slate-800"
            >
              Projects
            </Link>
          </li>

          <li>
            <Link
              to="/tasks"
              className="block p-3 rounded-lg hover:bg-slate-800"
            >
              Tasks
            </Link>
          </li>

          <li>
            <Link
              to="/worklogs"
              className="block p-3 rounded-lg hover:bg-slate-800"
            >
              Work Logs
            </Link>
          </li>

          <li>
            <Link
              to="/users"
              className="block p-3 rounded-lg hover:bg-slate-800"
            >
              Users
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;