import { useEffect, useState } from "react";
import { getExpenses } from "@/services/expenseService";
import PageHeader from "@/components/layout/PageHeader";
import Loader from "@/components/shared/Loader";
import EmptyState from "@/components/shared/EmptyState";
import ExpenseForm from "@/components/expense/ExpenseForm";
import ExpenseSummary from "@/components/expense/ExpenseSummary";
import ExpenseTable from "@/components/expense/ExpenseTable";
import ExpenseCard from "@/components/expense/ExpenseCard";

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getExpenses();
      setExpenses(response?.data ?? []);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to load expenses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {/* TODO: Confirm PageHeader's actual prop signature (assuming title/subtitle). */}
      <PageHeader title="Expenses" subtitle="Track non-fuel costs across your fleet" />

      <ExpenseForm onSuccess={fetchExpenses} />

      {loading ? (
        // TODO: Confirm Loader's expected prop names/usage.
        <Loader />
      ) : error ? (
        <p className="text-sm text-destructive">{error}</p>
      ) : expenses.length === 0 ? (
        // TODO: Confirm EmptyState's actual prop signature.
        <EmptyState
          title="No expenses found"
          description="Add an expense to get started."
        />
      ) : (
        <>
          <ExpenseSummary expenses={expenses} />

          {/* Desktop/tablet view */}
          <div className="hidden sm:block">
            <ExpenseTable expenses={expenses} />
          </div>

          {/* Mobile view */}
          <div className="flex flex-col gap-3 sm:hidden">
            {expenses.map((entry) => (
              <ExpenseCard key={entry?._id} record={entry} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ExpenseList;