const mongoose = require("mongoose");

const fuelSchema = new mongoose.Schema(
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
    quantity: {
      type: Number,
      required: [true, "Fuel quantity is required"],
      min: [0.01, "Fuel quantity must be greater than 0"],
    },
    cost: {
      type: Number,
      required: [true, "Fuel cost is required"],
      min: [0, "Fuel cost cannot be negative"],
    },
    odometerReading: {
      type: Number,
      required: [true, "Odometer reading is required"],
      min: [0, "Odometer reading cannot be negative"],
    },
    fuelDate: {
      type: Date,
      required: [true, "Fuel date is required"],
    },
    fuelStation: {
      type: String,
      trim: true,
      maxlength: [100, "Fuel station name cannot exceed 100 characters"],
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [500, "Notes cannot exceed 500 characters"],
    },
  },
  { timestamps: true }
);
fuelSchema.index({ vehicle: 1, fuelDate: -1 });
module.exports = mongoose.model("Fuel", fuelSchema);