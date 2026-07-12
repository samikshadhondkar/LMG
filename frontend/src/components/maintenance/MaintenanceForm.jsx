export default function MaintenanceForm({ onSubmit, initialValues = {} }) {
  return (
    <form
      className="space-y-4 rounded-xl border bg-white p-6 shadow-sm"
      onSubmit={(event) => {
        event.preventDefault();
        const data = {
          vehicleId: event.target.vehicleId.value,
          maintenanceType: event.target.maintenanceType.value,
          description: event.target.description.value,
          serviceDate: event.target.serviceDate.value,
          nextServiceDate: event.target.nextServiceDate.value || undefined,
          cost: Number(event.target.cost.value) || 0,
          status: event.target.status.value || initialValues.status || 'pending',
          mechanic: {
            name: event.target.mechanicName.value,
            contactNumber: event.target.mechanicContact.value,
          },
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
          <label className="block text-sm font-medium text-slate-700">Maintenance Type</label>
          <input
            name="maintenanceType"
            defaultValue={initialValues.maintenanceType}
            className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
            placeholder="Oil change, repair, etc."
            required
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700">Description</label>
        <textarea
          name="description"
          defaultValue={initialValues.description}
          className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
          placeholder="Details about the maintenance"
          rows="3"
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-700">Service Date</label>
          <input
            name="serviceDate"
            type="date"
            defaultValue={initialValues.serviceDate ? new Date(initialValues.serviceDate).toISOString().slice(0, 10) : ''}
            className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Next Service Date</label>
          <input
            name="nextServiceDate"
            type="date"
            defaultValue={initialValues.nextServiceDate ? new Date(initialValues.nextServiceDate).toISOString().slice(0, 10) : ''}
            className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
          />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-700">Cost</label>
          <input
            name="cost"
            type="number"
            min="0"
            defaultValue={initialValues.cost || 0}
            className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
            placeholder="Maintenance cost"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Status</label>
          <select
            name="status"
            defaultValue={initialValues.status || 'pending'}
            className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
          >
            <option value="pending">Pending</option>
            <option value="scheduled">Scheduled</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-700">Mechanic Name</label>
          <input
            name="mechanicName"
            defaultValue={initialValues.mechanic?.name}
            className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
            placeholder="Mechanic full name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Mechanic Contact</label>
          <input
            name="mechanicContact"
            defaultValue={initialValues.mechanic?.contactNumber}
            className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
            placeholder="Phone number"
          />
        </div>
      </div>
      <button className="inline-flex rounded-md bg-primary px-4 py-2 text-sm text-white hover:bg-primary/90">
        Save Maintenance
      </button>
    </form>
  );
}
