// TODO: The final Trip object structure is owned by the trips-maintenance
// module (Samiksha's branch). Field paths below (vehicle?.name, driver?.name,
// route, status) are best-guess assumptions using optional chaining and
// should be confirmed/adjusted once that module's Trip schema is finalized.

const RecentTrips = ({ trips }) => {
  if (!trips || trips.length === 0) {
    return (
      <div className="rounded-lg border border-border p-4">
        <h3 className="text-base font-semibold text-foreground mb-2">
          Recent Trips
        </h3>
        <p className="text-sm text-muted-foreground">
          No recent trips available.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border p-4 overflow-x-auto">
      <h3 className="text-base font-semibold text-foreground mb-3">
        Recent Trips
      </h3>
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="border-b border-border">
            <th className="py-2 pr-4 font-medium text-muted-foreground">
              Vehicle
            </th>
            <th className="py-2 pr-4 font-medium text-muted-foreground">
              Driver
            </th>
            <th className="py-2 pr-4 font-medium text-muted-foreground">
              Route
            </th>
            <th className="py-2 pr-4 font-medium text-muted-foreground">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {trips.map((trip) => (
            <tr key={trip?._id} className="border-b border-border last:border-0">
              <td className="py-2 pr-4 text-foreground">
                {trip?.vehicle?.name ?? "—"}
              </td>
              <td className="py-2 pr-4 text-foreground">
                {trip?.driver?.name ?? "—"}
              </td>
              <td className="py-2 pr-4 text-foreground">
                {trip?.route ?? "—"}
              </td>
              <td className="py-2 pr-4 text-foreground">
                {trip?.status ?? "—"}
              </td>
            </tr>
          ))}
        </tbody>
        </table>
    </div>
  );
};

export default RecentTrips;