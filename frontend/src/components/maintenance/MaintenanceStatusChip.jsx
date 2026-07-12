export default function MaintenanceStatusChip({ status }) {
  const statusClass = {
    Open: "bg-yellow-100 text-yellow-900",
    InProgress: "bg-blue-100 text-blue-900",
    Completed: "bg-green-100 text-green-900",
  }[status] || "bg-slate-100 text-slate-900";

  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusClass}`}>
      {status || "Unknown"}
    </span>
  );
}
