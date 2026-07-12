import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MaintenanceTable from "@/components/maintenance/MaintenanceTable";
import MaintenanceDetails from "@/components/maintenance/MaintenanceDetails";
import { getMaintenance, updateMaintenance } from "@/services/maintenanceService";

export default function MaintenanceList() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loadMaintenance();
  }, []);

  async function loadMaintenance() {
    try {
      setLoading(true);
      setError("");
      const data = await getMaintenance();
      setItems(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleComplete(item) {
    try {
      setError("");
      await updateMaintenance(item._id, { ...item, status: "completed" });
      setMessage("Maintenance completed and vehicle released.");
      loadMaintenance();
      if (selectedItem?._id === item._id) {
        setSelectedItem({ ...selectedItem, status: "completed" });
      }
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex flex-col gap-4 rounded-3xl border border-border bg-card p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Maintenance List</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Track active maintenance work and complete service orders when repairs finish.
          </p>
        </div>
        <button
          type="button"
          className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary/90"
          onClick={() => navigate("/maintenance/add")}
        >
          Add Maintenance
        </button>
      </div>

      {(message || error) && (
        <div className={`rounded-3xl border p-4 ${error ? "border-destructive bg-destructive/10 text-destructive" : "border-primary bg-primary/10 text-primary"}`}>
          {error || message}
        </div>
      )}

      <div className="grid gap-6 xl:grid-cols-[1.7fr_1fr]">
        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-foreground">Maintenance records</h2>
          <p className="mt-1 text-sm text-muted-foreground">Service history and shop status.</p>
          <div className="mt-6">
            <MaintenanceTable
              items={items}
              onView={setSelectedItem}
              onComplete={handleComplete}
            />
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-foreground">Details</h2>
          <p className="mt-1 text-sm text-muted-foreground">View the selected maintenance item.</p>
          <div className="mt-6">
            <MaintenanceDetails item={selectedItem} />
          </div>
        </div>
      </div>
    </div>
  );
}
