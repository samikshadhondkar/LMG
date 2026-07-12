import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MaintenanceForm from "@/components/maintenance/MaintenanceForm";
import { createMaintenance } from "@/services/maintenanceService";

export default function AddMaintenance() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(data) {
    try {
      setLoading(true);
      setError("");
      await createMaintenance(data);
      setMessage("Maintenance request created successfully.");
      navigate("/maintenance");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-foreground">Add Maintenance</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Create a maintenance record and send the vehicle to the shop immediately.
        </p>
      </div>

      {(message || error) && (
        <div className={`rounded-3xl border p-4 ${error ? "border-destructive bg-destructive/10 text-destructive" : "border-primary bg-primary/10 text-primary"}`}>
          {error || message}
        </div>
      )}

      <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
        <MaintenanceForm onSubmit={handleSubmit} />
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            className="rounded-xl border border-border px-4 py-2 text-sm text-foreground"
            onClick={() => navigate("/maintenance")}
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={loading}
            className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
            onClick={() => document.querySelector('form')?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))}
          >
            {loading ? "Saving..." : "Save Maintenance"}
          </button>
        </div>
      </div>
    </div>
  );
}
