// TODO: Swap this semantic table for the shared DataTable component once its
// prop API (columns/data shape) is confirmed.

const ExpenseTable = ({ expenses }) => {
  return (
    <div className="rounded-lg border border-border overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="border-b border-border">
            <th className="py-2 px-4 font-medium text-muted-foreground">Vehicle</th>
            <th className="py-2 px-4 font-medium text-muted-foreground">Category</th>
            <th className="py-2 px-4 font-medium text-muted-foreground">Amount</th>
            <th className="py-2 px-4 font-medium text-muted-foreground">Date</th>
            <th className="py-2 px-4 font-medium text-muted-foreground">Description</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((entry) => (
            <tr key={entry?._id} className="border-b border-border last:border-0">
              {/* TODO: entry.vehicle may be a raw ObjectId string until the
                  Vehicle module (auth-vehicle-driver branch) is merged and
                  the backend populate resolves it to { name, registrationNumber }. */}
              <td className="py-2 px-4 text-foreground">
                {entry?.vehicle?.name ?? entry?.vehicle ?? "—"}
              </td>
              <td className="py-2 px-4 text-foreground">{entry?.category ?? "—"}</td>
              <td className="py-2 px-4 text-foreground">{entry?.amount ?? "—"}</td>
              <td className="py-2 px-4 text-foreground">
                {entry?.expenseDate ? new Date(entry.expenseDate).toLocaleDateString() : "—"}
              </td>
              <td className="py-2 px-4 text-foreground">{entry?.description ?? "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseTable;