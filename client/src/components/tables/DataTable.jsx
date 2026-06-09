const DataTable = ({
  columns,
  data,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <table className="w-full">
        <thead className="bg-slate-50">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-6 py-4 text-left text-sm font-semibold"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              className="border-t hover:bg-slate-50"
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className="px-6 py-4 text-left"
                >
                  {col.render
                    ? col.render(row)
                    : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;