const DashboardCharts = ({ summary }) => {
  if (!summary) return null;

  // TODO: Shared chart components (AreaChart, BarChart, LineChart, PieChart)
  // already exist in src/components/charts/, but their prop APIs are unknown.
  // Wire these placeholders to the real chart components once their expected
  // props (e.g. data, xKey, yKey) are confirmed, rather than guessing here.

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="rounded-lg border border-border p-4 flex flex-col items-center justify-center min-h-[220px]">
        <h3 className="text-base font-semibold text-foreground mb-2">
          Fuel Cost Trend
        </h3>
        <p className="text-sm text-muted-foreground">Chart coming soon</p>
      </div>

      <div className="rounded-lg border border-border p-4 flex flex-col items-center justify-center min-h-[220px]">
        <h3 className="text-base font-semibold text-foreground mb-2">
          Expense Breakdown
        </h3>
        <p className="text-sm text-muted-foreground">Chart coming soon</p>
      </div>
    </div>
  );
};

export default DashboardCharts;