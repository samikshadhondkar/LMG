const FleetSummary = ({ summary }) => {
  if (!summary) return null;

  return (
    <div className="rounded-lg border border-border p-4">
      <h2 className="text-lg font-semibold text-foreground mb-3">
        Fleet Summary
      </h2>
      <ul className="grid grid-cols-2 gap-3">
        <li className="flex flex-col">
          <span className="text-sm text-muted-foreground">Total Vehicles</span>
          <span className="text-base font-medium text-foreground">
            {summary.totalVehicles}
          </span>
        </li>
        <li className="flex flex-col">
          <span className="text-sm text-muted-foreground">Available Vehicles</span>
          <span className="text-base font-medium text-foreground">
            {summary.availableVehicles}
          </span>
        </li>
        <li className="flex flex-col">
          <span className="text-sm text-muted-foreground">Vehicles On Trip</span>
          <span className="text-base font-medium text-foreground">
            {summary.vehiclesOnTrip}
          </span>
        </li>
        <li className="flex flex-col">
          <span className="text-sm text-muted-foreground">Vehicles In Shop</span>
          <span className="text-base font-medium text-foreground">
            {summary.vehiclesInShop}
          </span>
        </li>
      </ul>
    </div>
  );
};

export default FleetSummary;