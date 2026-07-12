// TODO: Shared chart components (AreaChart, BarChart, LineChart, PieChart)
// exist in src/components/charts/, but their prop APIs are unknown. Wire
// this placeholder to the real chart component once props are confirmed.

const ReportChart = ({ title, data }) => {
  if (!data || data.length === 0) return null;

  return (
    <div className="rounded-lg border border-border p-4 flex flex-col items-center justify-center min-h-[220px]">
      <h3 className="text-base font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">Chart coming soon</p>
    </div>
  );
};

export default ReportChart;