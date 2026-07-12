const ExpenseCard = ({ record }) => {
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
          {record?.expenseDate ? new Date(record.expenseDate).toLocaleDateString() : "—"}
        </span>
      </div>
      <div className="text-sm text-muted-foreground">
        Category: <span className="text-foreground">{record?.category ?? "—"}</span>
      </div>
      <div className="text-sm text-muted-foreground">
        Amount: <span className="text-foreground">{record?.amount ?? "—"}</span>
      </div>
      {record?.description && (
        <div className="text-sm text-muted-foreground">
          Notes: <span className="text-foreground">{record.description}</span>
        </div>
      )}
    </div>
  );
};

export default ExpenseCard;