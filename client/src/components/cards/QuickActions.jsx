import { useNavigate } from "react-router-dom";

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      label: "Project",
      color: "bg-indigo-600 hover:bg-indigo-700",
      path: "/projects/create",
    },
    {
      label: "Task",
      color: "bg-green-600 hover:bg-green-700",
      path: "/tasks/create",
    },
    {
      label: "Work Log",
      color: "bg-orange-600 hover:bg-orange-700",
      path: "/worklogs/create",
    },
    {
      label: "User",
      color: "bg-purple-600 hover:bg-purple-700",
      path: "/users",
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="dashboard-title">
        Quick Actions
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {actions.map((action) => (
          <button
            key={action.label}
            onClick={() => navigate(action.path)}
            className={`p-4 rounded-xl text-white font-medium transition ${action.color}`}
          >
            + {action.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;