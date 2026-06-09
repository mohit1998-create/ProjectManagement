import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { status: "Todo", tasks: 15 },
  { status: "In Progress", tasks: 10 },
  { status: "Done", tasks: 25 },
];

const TaskProgressChart = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 h-72">
      <h2 className="text-lg font-semibold mb-4">
        Task Progress
      </h2>

      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data}>
          <XAxis dataKey="status" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="tasks" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TaskProgressChart;