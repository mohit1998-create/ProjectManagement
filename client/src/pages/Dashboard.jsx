import DashboardLayout from "../layouts/DashboardLayout";
import StatCard from "../components/StatCard";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Projects"
          value="12"
        />

        <StatCard
          title="Tasks"
          value="48"
        />

        <StatCard
          title="Completed"
          value="35"
        />

        <StatCard
          title="Hours Logged"
          value="128"
        />
      </div>

      <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm border">
        <h2 className="text-xl font-semibold mb-4">
          Recent Projects
        </h2>

        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3">
                Project
              </th>
              <th className="text-left py-3">
                Status
              </th>
              <th className="text-left py-3">
                Manager
              </th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="py-3">
                CRM System
              </td>
              <td>Active</td>
              <td>Mohit</td>
            </tr>

            <tr>
              <td className="py-3">
                Mobile App
              </td>
              <td>Planning</td>
              <td>Amit</td>
            </tr>
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;