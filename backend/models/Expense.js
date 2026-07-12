const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      required: [true, "Vehicle is required"],
    },
    trip: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trip",
      default: null,
    },
    category: {
      type: String,
      required: [true, "Expense category is required"],
      enum: {
        values: ["Toll", "Parking", "Maintenance", "Other"],
        message: "Category must be one of: Toll, Parking, Repair, Other",
      },
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [0.01, "Amount must be greater than 0"],
    },
    expenseDate: {
      type: Date,
      required: [true, "Expense date is required"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Expense", expenseSchema);
