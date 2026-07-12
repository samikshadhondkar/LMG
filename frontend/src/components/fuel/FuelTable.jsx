// TODO: Swap this semantic table for the shared DataTable component once its
// prop API (columns/data shape) is confirmed.

const FuelTable = ({ fuel }) => {
  return (
    <div className="rounded-lg border border-border overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="border-b border-border">
            <th className="py-2 px-4 font-medium text-muted-foreground">Vehicle</th>
            <th className="py-2 px-4 font-medium text-muted-foreground">Fuel Date</th>
            <th className="py-2 px-4 font-medium text-muted-foreground">Quantity (L)</th>
            <th className="py-2 px-4 font-medium text-muted-foreground">Cost</th>
            <th className="py-2 px-4 font-medium text-muted-foreground">Odometer</th>
            <th className="py-2 px-4 font-medium text-muted-foreground">Station</th>
          </tr>
        </thead>
        <tbody>
          {fuel.map((entry) => (
            <tr key={entry?._id} className="border-b border-border last:border-0">
              {/* TODO: entry.vehicle may be a raw ObjectId string until the
                  Vehicle module (auth-vehicle-driver branch) is merged and
                  the backend populate resolves it to { name, registrationNumber }. */}
              <td className="py-2 px-4 text-foreground">
                {entry?.vehicle?.name ?? entry?.vehicle ?? "—"}
              </td>
              <td className="py-2 px-4 text-foreground">
                {entry?.fuelDate ? new Date(entry.fuelDate).toLocaleDateString() : "—"}
              </td>
              <td className="py-2 px-4 text-foreground">{entry?.quantity ?? "—"}</td>
              <td className="py-2 px-4 text-foreground">{entry?.cost ?? "—"}</td>
              <td className="py-2 px-4 text-foreground">{entry?.odometerReading ?? "—"}</td>
              <td className="py-2 px-4 text-foreground">{entry?.fuelStation ?? "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FuelTable;