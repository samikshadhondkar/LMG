import { useState } from "react";

// TODO: Backend filtering (date range, category, vehicle) is not yet
// implemented on GET /reports/fuel or /reports/expenses. This filter
// currently operates on already-fetched data client-side only.

const ReportFilter = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...filters, [name]: value };
    setFilters(updated);
    if (onFilterChange) onFilterChange(updated);
  };

  return (
    <div className="rounded-lg border border-border p-4 flex flex-col sm:flex-row gap-3 sm:items-end">
      <div className="flex flex-col gap-1">
        <label className="text-sm text-muted-foreground" htmlFor="startDate">
          Start Date
        </label>
        <input
          id="startDate"
          name="startDate"
          type="date"
          value={filters.startDate}
          onChange={handleChange}
          className="border border-border rounded-md px-3 py-2 text-sm bg-background"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-muted-foreground" htmlFor="endDate">
          End Date
        </label>
        <input
          id="endDate"
          name="endDate"
          type="date"
          value={filters.endDate}
          onChange={handleChange}
          className="border border-border rounded-md px-3 py-2 text-sm bg-background"
        />
      </div>

      {/* TODO: Replace with shared SelectField once its API is confirmed. */}
      <div className="flex flex-col gap-1">
        <label className="text-sm text-muted-foreground" htmlFor="category">
          Category (Expenses only)
        </label>
        <select
          id="category"
          name="category"
          value={filters.category}
          onChange={handleChange}
          className="border border-border rounded-md px-3 py-2 text-sm bg-background"
        >
          <option value="">All</option>
          <option value="Toll">Toll</option>
          <option value="Parking">Parking</option>
          <option value="Repair">Repair</option>
          <option value="Other">Other</option>
        </select>
      </div>
    </div>
  );
};

export default ReportFilter;