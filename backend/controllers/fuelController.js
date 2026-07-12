const mongoose = require("mongoose");
const Fuel = require("../models/Fuel");

// @desc    Get all fuel records
// @route   GET /fuel
exports.getFuel = async (req, res) => {
  try {
    let query = Fuel.find().sort({
  fuelDate: -1,
  createdAt: -1,
});

    // Populate vehicle only if the Vehicle model is registered (teammate's module)
    if (mongoose.modelNames().includes("Vehicle")) {
      query = query.populate("vehicle", "name registrationNumber");
    }

    // Populate trip only if the Trip model is registered (teammate's module)
    if (mongoose.modelNames().includes("Trip")) {
      query = query.populate("trip");
    }

    const fuelRecords = await query;

    return res.status(200).json({
      success: true,
      message: "Fuel records fetched successfully",
      data: fuelRecords,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch fuel records",
      error: error.message,
    });
  }
};

// @desc    Create a new fuel record
// @route   POST /fuel
exports.createFuel = async (req, res) => {
  try {
    const {
      vehicle,
      trip,
      quantity,
      cost,
      odometerReading,
      fuelDate,
      fuelStation,
      notes,
    } = req.body;

    // Validate required fields before saving
    if (!vehicle || !quantity || !cost || !odometerReading || !fuelDate) {
      return res.status(400).json({
        success: false,
        message:
          "Vehicle, quantity, cost, odometer reading and fuel date are required",
        error: "Missing required fields",
      });
    }

    // Validate fuel date
if (isNaN(Date.parse(fuelDate))) {
  return res.status(400).json({
    success: false,
    message: "Invalid fuel date",
    error: "fuelDate must be a valid date",
  });
}

    // Validate vehicle ObjectId
    if (!mongoose.Types.ObjectId.isValid(vehicle)) {
      return res.status(400).json({
        success: false,
        message: "Invalid vehicle ID",
        error: "vehicle must be a valid ObjectId",
      });
    }

    // Validate trip ObjectId only if provided
    if (trip && !mongoose.Types.ObjectId.isValid(trip)) {
      return res.status(400).json({
        success: false,
        message: "Invalid trip ID",
        error: "trip must be a valid ObjectId",
      });
    }

    const newFuel = await Fuel.create({
  vehicle,
  trip: trip || null,
  quantity,
  cost,
  odometerReading,
  fuelDate,
  fuelStation,
  notes,
});

return res.status(201).json({
  success: true,
  message: "Fuel record created successfully",
  data: newFuel,
});
  } catch (error) {
    // Handle mongoose validation errors distinctly
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        error: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to create fuel record",
      error: error.message,
    });
  }
};