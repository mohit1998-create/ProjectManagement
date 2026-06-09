import DashboardLayout from "../layouts/DashboardLayout";
import StatCard from "../components/cards/StatCard";
import RecentProjectsTable from "../components/tables/RecentProjectsTable";
import RecentActivity from "../components/cards/RecentActivity";
import QuickActions from "../components/cards/QuickActions";
import TaskProgressChart from "../components/charts/TaskProgressChart";
import ProjectStatusChart from "../components/charts/ProjectStatusChart";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
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
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <TaskProgressChart />
        <ProjectStatusChart />
      </div>

<div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
  <div className="xl:col-span-2">
    <RecentProjectsTable />
  </div>

  <RecentActivity />
</div>
<QuickActions />
    </DashboardLayout>
  );
};

export default Dashboard;