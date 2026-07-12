import { useState } from "react";
import { createFuel } from "@/services/fuelService";

const initialFormState = {
  vehicle: "",
  trip: "",
  quantity: "",
  cost: "",
  odometerReading: "",
  fuelDate: "",
  fuelStation: "",
  notes: "",
};

const FuelForm = ({ onSuccess }) => {
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

      await createFuel({
        ...formData,
        trip: formData.trip || undefined,
        quantity: Number(formData.quantity),
        cost: Number(formData.cost),
        odometerReading: Number(formData.odometerReading),
      });

      setFormData(initialFormState);
      if (onSuccess) onSuccess();
    } catch (err) {
      setSubmitError(
        err?.response?.data?.message || "Failed to add fuel entry"
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
      <h3 className="text-base font-semibold text-foreground">Add Fuel Entry</h3>

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
          <label className="text-sm text-muted-foreground" htmlFor="quantity">
            Quantity (L)
          </label>
          <input
            id="quantity"
            name="quantity"
            type="number"
            step="0.01"
            min="0.01"
            value={formData.quantity}
            onChange={handleChange}
            required
            className="border border-border rounded-md px-3 py-2 text-sm bg-background"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-muted-foreground" htmlFor="cost">
            Cost
          </label>
          <input
            id="cost"
            name="cost"
            type="number"
            step="0.01"
            min="0"
            value={formData.cost}
            onChange={handleChange}
            required
            className="border border-border rounded-md px-3 py-2 text-sm bg-background"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-muted-foreground" htmlFor="odometerReading">
            Odometer Reading
          </label>
          <input
            id="odometerReading"
            name="odometerReading"
            type="number"
            min="0"
            value={formData.odometerReading}
            onChange={handleChange}
            required
            className="border border-border rounded-md px-3 py-2 text-sm bg-background"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-muted-foreground" htmlFor="fuelDate">
            Fuel Date
          </label>
          <input
            id="fuelDate"
            name="fuelDate"
            type="date"
            value={formData.fuelDate}
            onChange={handleChange}
            required
            className="border border-border rounded-md px-3 py-2 text-sm bg-background"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-muted-foreground" htmlFor="fuelStation">
          Fuel Station (optional)
        </label>
        <input
          id="fuelStation"
          name="fuelStation"
          value={formData.fuelStation}
          onChange={handleChange}
          className="border border-border rounded-md px-3 py-2 text-sm bg-background"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-muted-foreground" htmlFor="notes">
          Notes (optional)
        </label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
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
        {submitting ? "Saving..." : "Add Fuel Entry"}
      </button>
    </form>
  );
};

export default FuelForm;