const DataTable = ({ columns, data }) => {
  if (!data || data.length === 0) {
    return <p className="text-gray-500 text-center py-8">No records found.</p>;
  }

  return (
    <div className="overflow-x-auto border rounded-lg mt-4">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((col, i) => (
              <th key={i} className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data.map((row, i) => (
            <tr key={row._id || i}>
              {columns.map((col, j) => (
                <td key={j} className="px-4 py-2 text-sm">
                  {col.cell ? col.cell(row) : row[col.accessorKey]}
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