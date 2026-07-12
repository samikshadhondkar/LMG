import Loader from "@/components/shared/Loader";
import EmptyState from "@/components/shared/EmptyState";
import FuelTable from "@/components/fuel/FuelTable";
import FuelCard from "@/components/fuel/FuelCard";

const FuelHistory = ({ fuel, loading, error }) => {
  if (loading) {
    // TODO: Confirm Loader's expected prop names/usage.
    return <Loader />;
  }

  if (error) {
    return <p className="text-sm text-destructive">{error}</p>;
  }

  if (!fuel || fuel.length === 0) {
    // TODO: Confirm EmptyState's actual prop signature.
    return (
      <EmptyState
        title="No fuel records found"
        description="Add a fuel entry to get started."
      />
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-base font-semibold text-foreground">Fuel History</h3>

      {/* Desktop/tablet view */}
      <div className="hidden sm:block">
        <FuelTable fuel={fuel} />
      </div>

      {/* Mobile view */}
      <div className="flex flex-col gap-3 sm:hidden">
        {fuel.map((entry) => (
          <FuelCard key={entry?._id} record={entry} />
        ))}
      </div>
    </div>
  );
};

export default FuelHistory;