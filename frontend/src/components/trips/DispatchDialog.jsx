export default function DispatchDialog({ trip, open, onClose, onDispatch }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="text-xl font-semibold text-slate-900">Dispatch Trip</h2>
        <p className="mt-2 text-sm text-slate-600">
          Confirm dispatch for <strong>{trip?.name || "this trip"}</strong>.
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <button type="button" className="rounded-md border px-4 py-2" onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="rounded-md bg-primary px-4 py-2 text-white" onClick={() => onDispatch?.(trip)}>
            Dispatch
          </button>
        </div>
      </div>
    </div>
  );
}
