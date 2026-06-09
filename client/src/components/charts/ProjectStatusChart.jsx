import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Active", value: 8 },
  { name: "Completed", value: 5 },
  { name: "Planning", value: 3 },
];

const COLORS = [
  "#4F46E5",
  "#22C55E",
  "#F59E0B",
];

const ProjectStatusChart = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 h-72">
      <h2 className="text-lg font-semibold mb-4">
        Project Status
      </h2>

      <ResponsiveContainer width="100%" height="90%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={120}
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index]}
              />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProjectStatusChart;