import { useEffect, useState } from "react";
import { getFuelReport, getExpenseReport } from "@/services/reportService";
import PageHeader from "@/components/layout/PageHeader";
import Loader from "@/components/shared/Loader";
import EmptyState from "@/components/shared/EmptyState";
import ReportFilter from "@/components/reports/ReportFilter";
import ReportChart from "@/components/reports/ReportChart";
import ReportTable from "@/components/reports/ReportTable";
import ExportButton from "@/components/reports/ExportButton";

const fuelColumns = [
  { key: "vehicle", label: "Vehicle", render: (row) => row?.vehicle?.name ?? row?.vehicle ?? "—" },
  { key: "fuelDate", label: "Date", render: (row) => row?.fuelDate ? new Date(row.fuelDate).toLocaleDateString() : "—" },
  { key: "quantity", label: "Quantity (L)" },
  { key: "cost", label: "Cost" },
];

const expenseColumns = [
  { key: "vehicle", label: "Vehicle", render: (row) => row?.vehicle?.name ?? row?.vehicle ?? "—" },
  { key: "category", label: "Category" },
  { key: "amount", label: "Amount" },
  { key: "expenseDate", label: "Date", render: (row) => row?.expenseDate ? new Date(row.expenseDate).toLocaleDateString() : "—" },
];

// Client-side filtering applied on top of fetched data.
// TODO: Move this filtering server-side once /reports/fuel and
// /reports/expenses support query params.
const applyClientFilters = (rows, filters, dateField) => {
  return rows.filter((row) => {
    const rowDate = row?.[dateField] ? new Date(row[dateField]) : null;

    if (filters.startDate && rowDate && rowDate < new Date(filters.startDate)) {
      return false;
    }
    if (filters.endDate && rowDate && rowDate > new Date(filters.endDate)) {
      return false;
    }
    if (filters.category && row?.category && row.category !== filters.category) {
      return false;
    }
    return true;
  });
};

const Reports = () => {
  const [fuelData, setFuelData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const [filters, setFilters] = useState({ startDate: "", endDate: "", category: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReports = async () => {
    try {
      setLoading(true);
      setError(null);
      const [fuelRes, expenseRes] = await Promise.all([
        getFuelReport(),
        getExpenseReport(),
      ]);
      setFuelData(fuelRes?.data ?? []);
      setExpenseData(expenseRes?.data ?? []);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Failed to load reports. The Reports backend endpoints may not be available yet."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const filteredFuel = applyClientFilters(fuelData, filters, "fuelDate");
  const filteredExpenses = applyClientFilters(expenseData, filters, "expenseDate");

  if (loading) {
    // TODO: Confirm Loader's expected prop names/usage.
    return <Loader />;
  }

  if (error) {
    return <p className="text-sm text-destructive">{error}</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      {/* TODO: Confirm PageHeader's actual prop signature (assuming title/subtitle). */}
      <PageHeader title="Reports" subtitle="Fuel and expense reporting" />

      <ReportFilter onFilterChange={setFilters} />

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Fuel Report</h2>
          <ExportButton columns={fuelColumns} rows={filteredFuel} filename="fuel-report.csv" />
        </div>
        {filteredFuel.length === 0 ? (
          <EmptyState title="No fuel data" description="No fuel records match the current filters." />
        ) : (
          <>
            <ReportChart title="Fuel Cost Trend" data={filteredFuel} />
            <ReportTable columns={fuelColumns} rows={filteredFuel} />
          </>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Expense Report</h2>
          <ExportButton columns={expenseColumns} rows={filteredExpenses} filename="expense-report.csv" />
        </div>
        {filteredExpenses.length === 0 ? (
          <EmptyState title="No expense data" description="No expense records match the current filters." />
        ) : (
          <>
            <ReportChart title="Expense Breakdown" data={filteredExpenses} />
            <ReportTable columns={expenseColumns} rows={filteredExpenses} />
          </>
        )}
      </div>
    </div>
  );
};

export default Reports;