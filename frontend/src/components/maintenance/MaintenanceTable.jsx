export default function MaintenanceTable({ items = [], onView, onComplete }) {
  return (
    <div className="space-y-3">
      {items.length === 0 ? (
        <div className="rounded-xl border bg-white p-6 text-sm text-slate-500">
          No maintenance records.
        </div>
      ) : (
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item._id} className="flex flex-col gap-3 rounded-xl border bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-semibold text-slate-900">{item.maintenanceType}</p>
                <p className="text-sm text-slate-600">Vehicle: {item.vehicleId}</p>
                <p className="text-sm text-slate-600">Status: {item.status}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  className="rounded-md bg-primary px-3 py-1 text-sm text-white"
                  onClick={() => onView?.(item)}>
                  View
                </button>
                {item.status !== 'completed' && (
                  <button
                    type="button"
                    className="rounded-md bg-emerald-600 px-3 py-1 text-sm text-white"
                    onClick={() => onComplete?.(item)}>
                    Complete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
