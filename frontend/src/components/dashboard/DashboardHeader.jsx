const DashboardHeader = ({
  title = "Dashboard",
  subtitle = "Fleet overview and key metrics",
}) => {
  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
      <p className="text-sm text-muted-foreground">{subtitle}</p>
    </div>
  );
};

export default DashboardHeader;