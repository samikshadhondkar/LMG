export default function TripDetails({ trip }) {
  if (!trip) {
    return (
      <div className="rounded-3xl border border-border bg-card p-6 text-sm text-slate-500">
        Select a trip to view details.
      </div>
    );
  }

  return (
    <div className="space-y-4 rounded-3xl border border-border bg-card p-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground">Trip details</h3>
        <p className="mt-1 text-sm text-slate-500">Current trip information and resource assignments.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-background p-4">
          <p className="text-sm uppercase tracking-[0.16em] text-muted-foreground">Vehicle</p>
          <p className="mt-2 text-base font-medium text-foreground">{trip.vehicleId || 'Unknown'}</p>
        </div>
        <div className="rounded-2xl border border-border bg-background p-4">
          <p className="text-sm uppercase tracking-[0.16em] text-muted-foreground">Driver</p>
          <p className="mt-2 text-base font-medium text-foreground">{trip.driver?.name || 'Unassigned'}</p>
          <p className="text-sm text-slate-600">{trip.driver?.licenseNumber || ''}</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-border bg-background p-4">
          <p className="text-sm uppercase tracking-[0.16em] text-muted-foreground">Route</p>
          <p className="mt-2 text-base font-medium text-foreground">{trip.source} → {trip.destination}</p>
        </div>
        <div className="rounded-2xl border border-border bg-background p-4">
          <p className="text-sm uppercase tracking-[0.16em] text-muted-foreground">Status</p>
          <p className="mt-2 text-base font-medium text-foreground">{trip.status}</p>
        </div>
        <div className="rounded-2xl border border-border bg-background p-4">
          <p className="text-sm uppercase tracking-[0.16em] text-muted-foreground">Passengers</p>
          <p className="mt-2 text-base font-medium text-foreground">{trip.passengerCount || 0}</p>
        </div>
      </div>
    </div>
  );
}
