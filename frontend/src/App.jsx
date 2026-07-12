import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import TripList from "@/pages/trips/TripList";
import AddTrip from "@/pages/trips/AddTrip";
import EditTrip from "@/pages/trips/EditTrip";
import MaintenanceList from "@/pages/maintenance/MaintenanceList";
import AddMaintenance from "@/pages/maintenance/AddMaintenance";

const Dashboard = () => (
  <div className="p-4 md:p-6 space-y-6">
    <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
      <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Welcome to TransitOps. Select a module to get started.
      </p>
    </div>

    <div className="grid gap-4 xl:grid-cols-[1.4fr_1fr]">
      <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-foreground">Demo data guide</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Sample records were seeded to help you verify the workflows quickly.
        </p>

        <div className="mt-5 space-y-4 rounded-3xl border border-border bg-white p-4">
          <div>
            <p className="text-sm font-semibold text-slate-900">Demo vehicles</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600">
              <li><strong>TR-1001</strong> — available</li>
              <li><strong>TR-1002</strong> — available</li>
              <li><strong>TR-1003</strong> — maintenance</li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-900">Demo drivers</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600">
              <li><strong>Priya Singh</strong> — available</li>
              <li><strong>Ravi Patel</strong> — available</li>
              <li><strong>Anjali Kumar</strong> — leave</li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-900">Demo records</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600">
              <li>One scheduled trip for vehicle <strong>TR-1001</strong></li>
              <li>One maintenance record for vehicle <strong>TR-1003</strong></li>
            </ul>
          </div>
        </div>

        <div className="mt-5 rounded-3xl border border-border bg-white p-4 text-sm text-slate-600">
          <p className="font-semibold text-slate-900">Quick start</p>
          <ol className="mt-2 space-y-2 list-decimal pl-5">
            <li>Open <strong>Trips</strong> and dispatch the scheduled trip.</li>
            <li>Open <strong>Maintenance</strong> to view the pending work order.</li>
            <li>Complete the maintenance to return vehicle <strong>TR-1003</strong> to available.</li>
          </ol>
        </div>
      </div>

      <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
        <div className="grid gap-4 sm:grid-cols-2">
          <Link
            to="/trips"
            className="rounded-3xl border border-border bg-white p-6 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <h2 className="text-lg font-semibold text-foreground">Trips</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Manage all trips, dispatch vehicles, and complete trip workflows.
            </p>
          </Link>
          <Link
            to="/maintenance"
            className="rounded-3xl border border-border bg-white p-6 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <h2 className="text-lg font-semibold text-foreground">Maintenance</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Track maintenance work, send vehicles to shop, and release them when complete.
            </p>
          </Link>
        </div>
      </div>
    </div>
  </div>
);

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />

        <Route path="/trips" element={<TripList />} />
        <Route path="/trips/add" element={<AddTrip />} />
        <Route path="/trips/edit/:id" element={<EditTrip />} />

        <Route path="/maintenance" element={<MaintenanceList />} />
        <Route path="/maintenance/add" element={<AddMaintenance />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;