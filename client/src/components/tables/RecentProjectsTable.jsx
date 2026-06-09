import DataTable from "./DataTable";
const columns = [
  {
    header: "Project",
    key: "name",
  },
  {
    header: "Status",
    key: "status",
  },
  {
    header: "Progress",
    key: "progress",
  },
];

const data = [
  {
    name: "CRM",
    status: "Active",
    progress: "80%",
  },
  {
    name: "HR Portal",
    status: "Completed",
    progress: "100%",
  },
];

const RecentProjectsTable = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4">
        Recent Projects
      </h2>

      <DataTable
        columns={columns}
        data={data}
      />
    </div>
  );
};

export default RecentProjectsTable;