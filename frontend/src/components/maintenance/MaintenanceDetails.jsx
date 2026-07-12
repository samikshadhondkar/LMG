export default function MaintenanceDetails({ item }) {
  if (!item) {
    return (
      <div className="rounded-xl border bg-white p-6 text-sm text-slate-500">
        Select a maintenance item to see details.
      </div>
    );
  }

  return (
    <div className="space-y-3 rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-900">{item.title}</h2>
      <p className="text-sm text-slate-600">Vehicle: {item.vehicle}</p>
      <p className="text-sm text-slate-600">Due date: {item.dueDate}</p>
      <p className="text-sm text-slate-600">Status: {item.status}</p>
      <p className="text-sm text-slate-500">Notes: {item.notes || "No additional details."}</p>
    </div>
  );
}
