// Exports currently displayed rows to CSV using plain JS (Blob) — no new
// package dependency added. PDF export intentionally omitted: TODO below.

// TODO: PDF export not implemented — could not confirm whether a PDF
// library (e.g. jspdf) is already installed without visibility into
// package.json. Add PDF export once confirmed.

const convertToCSV = (columns, rows) => {
  const header = columns.map((col) => col.label).join(",");
  const body = rows
    .map((row) =>
      columns
        .map((col) => {
          const value = col.render ? col.render(row) : row?.[col.key];
          const safeValue = value === undefined || value === null ? "" : value;
          return `"${String(safeValue).replace(/"/g, '""')}"`;
        })
        .join(",")
    )
    .join("\n");
  return `${header}\n${body}`;
};

const ExportButton = ({ columns, rows, filename = "report.csv" }) => {
  const handleExport = () => {
    if (!rows || rows.length === 0) return;

    const csvContent = convertToCSV(columns, rows);
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <button
      type="button"
      onClick={handleExport}
      disabled={!rows || rows.length === 0}
      className="rounded-md border border-border px-4 py-2 text-sm font-medium disabled:opacity-50"
    >
      Export CSV
    </button>
  );
};

export default ExportButton;