import { useState } from "react";
import { createExpense } from "@/services/expenseService";

const EXPENSE_CATEGORIES = ["Toll", "Parking", "Repair", "Other"];

const initialFormState = {
  vehicle: "",
  trip: "",
  category: EXPENSE_CATEGORIES[0],
  amount: "",
  expenseDate: "",
  description: "",
};

const ExpenseForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState(initialFormState);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      setSubmitError(null);

      await createExpense({
        ...formData,
        trip: formData.trip || undefined,
        amount: Number(formData.amount),
      });

      setFormData(initialFormState);
      if (onSuccess) onSuccess();
    } catch (err) {
      setSubmitError(
        err?.response?.data?.message || "Failed to add expense"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border border-border p-4 flex flex-col gap-3"
    >
      <h3 className="text-base font-semibold text-foreground">Add Expense</h3>

      {/* TODO: Replace with shared SearchSelect sourced from vehicleService.js
          once the Vehicle module (auth-vehicle-driver branch) API is confirmed. */}
      <div className="flex flex-col gap-1">
        <label className="text-sm text-muted-foreground" htmlFor="vehicle">
          Vehicle ID
        </label>
        <input
          id="vehicle"
          name="vehicle"
          value={formData.vehicle}
          onChange={handleChange}
          required
          className="border border-border rounded-md px-3 py-2 text-sm bg-background"
        />
      </div>

      {/* TODO: Replace with shared SearchSelect sourced from tripService.js
          once the Trip module (trips-maintenance branch) API is confirmed. */}
      <div className="flex flex-col gap-1">
        <label className="text-sm text-muted-foreground" htmlFor="trip">
          Trip ID (optional)
        </label>
        <input
          id="trip"
          name="trip"
          value={formData.trip}
          onChange={handleChange}
          className="border border-border rounded-md px-3 py-2 text-sm bg-background"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-sm text-muted-foreground" htmlFor="category">
            Category
          </label>
          {/* TODO: Replace with shared SelectField once its API is confirmed. */}
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="border border-border rounded-md px-3 py-2 text-sm bg-background"
          >
            {EXPENSE_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-muted-foreground" htmlFor="amount">
            Amount
          </label>
          <input
            id="amount"
            name="amount"
            type="number"
            step="0.01"
            min="0.01"
            value={formData.amount}
            onChange={handleChange}
            required
            className="border border-border rounded-md px-3 py-2 text-sm bg-background"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-muted-foreground" htmlFor="expenseDate">
            Expense Date
          </label>
          <input
            id="expenseDate"
            name="expenseDate"
            type="date"
            value={formData.expenseDate}
            onChange={handleChange}
            required
            className="border border-border rounded-md px-3 py-2 text-sm bg-background"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-muted-foreground" htmlFor="description">
          Description (optional)
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={2}
          className="border border-border rounded-md px-3 py-2 text-sm bg-background"
        />
      </div>

      {submitError && (
        <p className="text-sm text-destructive">{submitError}</p>
      )}

      {/* TODO: Replace with shared FormActions component once its API is confirmed. */}
      <button
        type="submit"
        disabled={submitting}
        className="self-start rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium disabled:opacity-50"
      >
        {submitting ? "Saving..." : "Add Expense"}
      </button>
    </form>
  );
};

export default ExpenseForm;