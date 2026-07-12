// Computes category-wise totals client-side from the fetched expense list.
// No backend summary/aggregation endpoint exists for this, so totals are
// derived here rather than assuming one.

const ExpenseSummary = ({ expenses }) => {
  if (!expenses || expenses.length === 0) return null;

  const totalsByCategory = expenses.reduce((acc, entry) => {
    const category = entry?.category ?? "Other";
    const amount = Number(entry?.amount) || 0;
    acc[category] = (acc[category] || 0) + amount;
    return acc;
  }, {});

  const grandTotal = Object.values(totalsByCategory).reduce(
    (sum, val) => sum + val,
    0
  );

  return (
    <div className="rounded-lg border border-border p-4">
      <h2 className="text-lg font-semibold text-foreground mb-3">
        Expense Summary
      </h2>
      <ul className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {Object.entries(totalsByCategory).map(([category, total]) => (
          <li key={category} className="flex flex-col">
            <span className="text-sm text-muted-foreground">{category}</span>
            <span className="text-base font-medium text-foreground">
              {total.toFixed(2)}
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-3 pt-3 border-t border-border flex justify-between">
        <span className="text-sm text-muted-foreground">Total</span>
        <span className="text-base font-semibold text-foreground">
          {grandTotal.toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default ExpenseSummary;