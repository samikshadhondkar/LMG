// TODO: Swap this semantic table for the shared DataTable component once its
// prop API (columns/data shape) is confirmed.

const ReportTable = ({ columns, rows }) => {
  if (!rows || rows.length === 0) return null;

  return (
    <div className="rounded-lg border border-border overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="border-b border-border">
            {columns.map((col) => (
              <th key={col.key} className="py-2 px-4 font-medium text-muted-foreground">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={row?._id ?? idx} className="border-b border-border last:border-0">
              {columns.map((col) => (
                <td key={col.key} className="py-2 px-4 text-foreground">
                  {col.render ? col.render(row) : row?.[col.key] ?? "—"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportTable;