import { useEffect, useState } from "react";
import { getFuel } from "@/services/fuelService";
import PageHeader from "@/components/layout/PageHeader";
import FuelForm from "@/components/fuel/FuelForm";
import FuelHistory from "@/components/fuel/FuelHistory";

const FuelList = () => {
  const [fuel, setFuel] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFuel = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getFuel();
      setFuel(response?.data ?? []);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to load fuel records");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFuel();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {/* TODO: Confirm PageHeader's actual prop signature (assuming title/subtitle). */}
      <PageHeader title="Fuel" subtitle="Track fuel entries across your fleet" />

      <FuelForm onSuccess={fetchFuel} />
      <FuelHistory fuel={fuel} loading={loading} error={error} />
    </div>
  );
};

export default FuelList;