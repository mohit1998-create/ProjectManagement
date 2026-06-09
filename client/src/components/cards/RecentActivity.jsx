const activities = [
  "Created Project Alpha",
  "Assigned task to John",
  "Logged 5 hours",
  "Added new user",
];

const RecentActivity = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4">
        Recent Activity
      </h2>

      <div className="space-y-3">
        {activities.map((item, index) => (
          <div
            key={index}
            className="p-3 bg-slate-50 rounded-lg"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;