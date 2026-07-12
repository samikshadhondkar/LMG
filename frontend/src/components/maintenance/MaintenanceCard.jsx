export default function MaintenanceCard({ item }) {
  return (
    <article className="rounded-xl border bg-white p-4 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">{item?.maintenanceType || 'Maintenance Task'}</h2>
      <p className="text-sm text-slate-600">Vehicle: {item?.vehicleId || 'Unknown'}</p>
      <p className="text-sm text-slate-600">Service date: {item?.serviceDate ? new Date(item.serviceDate).toLocaleDateString() : 'TBD'}</p>
      <p className="mt-2 text-sm text-slate-500">Status: {item?.status || 'pending'}</p>
    </article>
  );
}
