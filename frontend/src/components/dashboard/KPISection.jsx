import StatCard from "@/components/shared/StatCard";

const KPISection = ({ summary }) => {
  if (!summary) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* TODO: Confirm StatCard's actual prop names (assuming label/value) */}
      <StatCard label="Total Vehicles" value={summary.totalVehicles} />
      <StatCard label="Available Vehicles" value={summary.availableVehicles} />
      <StatCard label="Vehicles On Trip" value={summary.vehiclesOnTrip} />
      <StatCard label="Vehicles In Shop" value={summary.vehiclesInShop} />
      <StatCard label="Total Drivers" value={summary.totalDrivers} />
      <StatCard label="Active Trips" value={summary.activeTrips} />
      <StatCard label="Fuel Cost" value={summary.fuelCost} />
      <StatCard label="Maintenance Cost" value={summary.maintenanceCost} />
      <StatCard label="Monthly Expenses" value={summary.monthlyExpenses} />
    </div>
  );
};

export default KPISection;