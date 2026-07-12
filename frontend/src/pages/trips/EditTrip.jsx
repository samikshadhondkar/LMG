import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TripForm from "@/components/trips/TripForm";
import { getTrip, updateTrip } from "@/services/tripService";

export default function EditTrip() {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loadTrip();
  }, [id]);

  async function loadTrip() {
    try {
      setLoading(true);
      setError("");
      const data = await getTrip(id);
      setTrip(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(data) {
    try {
      setSaving(true);
      setError("");
      await updateTrip(id, data);
      navigate("/trips");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-foreground">Edit Trip</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Update trip details or complete an ongoing trip in line with backend status rules.
        </p>
      </div>

      {loading ? (
        <div className="rounded-3xl border border-border bg-card p-6 text-center text-sm text-slate-500">Loading trip...</div>
      ) : (
        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
          {error && (
            <div className="mb-6 rounded-3xl border border-destructive bg-destructive/10 p-4 text-sm text-destructive">
              {error}
            </div>
          )}
          {trip ? (
            <TripForm onSubmit={handleSubmit} initialValues={trip} />
          ) : (
            <div className="text-sm text-slate-500">Trip not found.</div>
          )}
          <div className="mt-6 flex gap-3">
            <button
              type="button"
              className="rounded-xl border border-border px-4 py-2 text-sm text-foreground"
              onClick={() => navigate("/trips")}
            >
              Back
            </button>
            <button
              type="button"
              disabled={saving}
              className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
              onClick={() => document.querySelector('form')?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))}
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
