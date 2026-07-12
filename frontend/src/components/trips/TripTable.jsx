export default function TripTable({ trips = [], onEdit, onDispatch, onComplete }) {
  return (
    <div className="space-y-3">
      {trips.length === 0 ? (
        <div className="rounded-xl border bg-white p-6 text-sm text-slate-500">
          No trips available.
        </div>
      ) : (
        <div className="space-y-2">
          {trips.map((trip) => (
            <div key={trip._id} className="flex flex-col gap-3 rounded-xl border bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-semibold text-slate-900">{trip.source} → {trip.destination}</p>
                <p className="text-sm text-slate-600">Vehicle: {trip.vehicleId}</p>
                <p className="text-sm text-slate-600">Status: {trip.status}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  className="rounded-md bg-slate-100 px-3 py-1 text-sm"
                  onClick={() => onEdit?.(trip)}>
                  Edit
                </button>
                {trip.status === 'scheduled' && (
                  <button
                    type="button"
                    className="rounded-md bg-primary px-3 py-1 text-sm text-white"
                    onClick={() => onDispatch?.(trip)}>
                    Dispatch
                  </button>
                )}
                {trip.status === 'ongoing' && (
                  <button
                    type="button"
                    className="rounded-md bg-emerald-600 px-3 py-1 text-sm text-white"
                    onClick={() => onComplete?.(trip)}>
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
