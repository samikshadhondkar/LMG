const FuelCard = ({ record }) => {
  if (!record) return null;

  return (
    <div className="rounded-lg border border-border p-4 flex flex-col gap-1">
      {/* TODO: record.vehicle may be a raw ObjectId string until the Vehicle
          module (auth-vehicle-driver branch) is merged. */}
      <div className="flex justify-between">
        <span className="text-sm font-medium text-foreground">
          {record?.vehicle?.name ?? record?.vehicle ?? "—"}
        </span>
        <span className="text-sm text-muted-foreground">
          {record?.fuelDate ? new Date(record.fuelDate).toLocaleDateString() : "—"}
        </span>
      </div>
      <div className="text-sm text-muted-foreground">
        Quantity: <span className="text-foreground">{record?.quantity ?? "—"}</span> L
      </div>
      <div className="text-sm text-muted-foreground">
        Cost: <span className="text-foreground">{record?.cost ?? "—"}</span>
      </div>
      <div className="text-sm text-muted-foreground">
        Odometer: <span className="text-foreground">{record?.odometerReading ?? "—"}</span>
      </div>
      {record?.fuelStation && (
        <div className="text-sm text-muted-foreground">
          Station: <span className="text-foreground">{record.fuelStation}</span>
        </div>
      )}
    </div>
  );
};

export default FuelCard;