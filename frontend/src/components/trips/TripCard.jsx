export default function TripCard({ trip }) {
  return (
    <article className="rounded-xl border bg-white p-4 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">Trip</h2>
      <p className="text-sm text-slate-600">Vehicle: {trip?.vehicleId || 'Unknown'}</p>
      <p className="text-sm text-slate-600">Route: {trip?.source || 'N/A'} → {trip?.destination || 'N/A'}</p>
      <p className="text-sm text-slate-600">Driver: {trip?.driver?.name || 'Unassigned'}</p>
      <p className="mt-2 text-sm text-slate-500">Status: {trip?.status || 'scheduled'}</p>
    </article>
  );
}
