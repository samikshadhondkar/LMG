export default function TripForm({ onSubmit, initialValues = {} }) {
  return (
    <form
      className="space-y-4 rounded-xl border bg-white p-6 shadow-sm"
      onSubmit={(event) => {
        event.preventDefault();
        const data = {
          vehicleId: event.target.vehicleId.value,
          source: event.target.source.value,
          destination: event.target.destination.value,
          startTime: event.target.startTime.value,
          endTime: event.target.endTime.value || undefined,
          distance: Number(event.target.distance.value) || 0,
          passengerCount: Number(event.target.passengerCount.value) || 0,
          driver: {
            name: event.target.driverName.value,
            licenseNumber: event.target.driverLicense.value,
            contactNumber: event.target.driverContact.value,
          },
          status: event.target.status?.value || initialValues.status || 'scheduled',
        };
        onSubmit?.(data);
      }}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-700">Vehicle ID</label>
          <input
            name="vehicleId"
            defaultValue={initialValues.vehicleId}
            className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
            placeholder="Vehicle Mongo ID"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Driver Name</label>
          <input
            name="driverName"
            defaultValue={initialValues.driver?.name}
            className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
            placeholder="Driver full name"
            required
          />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-700">Driver License</label>
          <input
            name="driverLicense"
            defaultValue={initialValues.driver?.licenseNumber}
            className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
            placeholder="License number"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Driver Contact</label>
          <input
            name="driverContact"
            defaultValue={initialValues.driver?.contactNumber}
            className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
            placeholder="Phone number"
          />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-700">Source</label>
          <input
            name="source"
            defaultValue={initialValues.source}
            className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
            placeholder="Starting location"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Destination</label>
          <input
            name="destination"
            defaultValue={initialValues.destination}
            className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
            placeholder="Ending location"
            required
          />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-700">Start Time</label>
          <input
            name="startTime"
            type="datetime-local"
            defaultValue={initialValues.startTime ? new Date(initialValues.startTime).toISOString().slice(0, 16) : ''}
            className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">End Time</label>
          <input
            name="endTime"
            type="datetime-local"
            defaultValue={initialValues.endTime ? new Date(initialValues.endTime).toISOString().slice(0, 16) : ''}
            className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
          />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-700">Distance</label>
          <input
            name="distance"
            type="number"
            min="0"
            defaultValue={initialValues.distance || 0}
            className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
            placeholder="Distance in km"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Passenger Count</label>
          <input
            name="passengerCount"
            type="number"
            min="0"
            defaultValue={initialValues.passengerCount || 0}
            className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
            placeholder="Number of passengers"
          />
        </div>
      </div>
      <button className="inline-flex rounded-md bg-primary px-4 py-2 text-sm text-white hover:bg-primary/90">
        Save Trip
      </button>
    </form>
  );
}
