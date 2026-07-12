import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TripTable from "@/components/trips/TripTable";
import DispatchDialog from "@/components/trips/DispatchDialog";
import TripDetails from "@/components/trips/TripDetails";
import TripTimeline from "@/components/trips/TripTimeline";
import { getTrips, updateTrip } from "@/services/tripService";

export default function TripList() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [dispatchTrip, setDispatchTrip] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loadTrips();
  }, []);

  async function loadTrips() {
    try {
      setLoading(true);
      setError("");
      const data = await getTrips();
      setTrips(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDispatch(trip) {
    setDispatchTrip(trip);
  }

  async function confirmDispatch() {
    if (!dispatchTrip) {
      return;
    }

    try {
      setError("");
      await updateTrip(dispatchTrip._id, { ...dispatchTrip, status: "ongoing" });
      setMessage("Trip dispatched successfully.");
      setDispatchTrip(null);
      loadTrips();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleComplete(trip) {
    try {
      setError("");
      await updateTrip(trip._id, { ...trip, status: "completed" });
      setMessage("Trip marked as completed.");
      if (selectedTrip?._id === trip._id) {
        setSelectedTrip({ ...selectedTrip, status: "completed" });
      }
      loadTrips();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex flex-col gap-4 rounded-3xl border border-border bg-card p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Trip List</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Manage scheduled, ongoing, and completed trips. Dispatch only vehicles that are available and not in shop.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary/90"
            onClick={() => navigate("/trips/add")}
          >
            Add Trip
          </button>
        </div>
      </div>

      {(message || error) && (
        <div className={`rounded-3xl border p-4 ${error ? "border-destructive bg-destructive/10 text-destructive" : "border-primary bg-primary/10 text-primary"}`}>
          {error || message}
        </div>
      )}

      <div className="grid gap-6 xl:grid-cols-[1.7fr_1fr]">
        <div className="space-y-4">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-foreground">Trips</h2>
                <p className="mt-1 text-sm text-muted-foreground">Select a trip to inspect its status and details.</p>
              </div>
              <p className="text-sm text-slate-500">{loading ? "Loading..." : `${trips.length} total`}</p>
            </div>
            <div className="mt-6">
              <TripTable
                trips={trips}
                onEdit={(trip) => navigate(`/trips/edit/${trip._id}`)}
                onDispatch={handleDispatch}
                onComplete={handleComplete}
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-foreground">Trip details</h2>
            <p className="mt-1 text-sm text-muted-foreground">Tap a trip in the table to view details and progress.</p>
            <div className="mt-6 space-y-4">
              <TripDetails trip={selectedTrip} />
              <TripTimeline status={selectedTrip?.status || "scheduled"} />
            </div>
          </div>
        </div>
      </div>

      <DispatchDialog
        open={Boolean(dispatchTrip)}
        trip={dispatchTrip}
        onClose={() => setDispatchTrip(null)}
        onDispatch={confirmDispatch}
      />
    </div>
  );
}
