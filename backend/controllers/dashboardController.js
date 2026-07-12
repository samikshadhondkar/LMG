const mongoose = require("mongoose");
const Fuel = require("../models/Fuel");
const Expense = require("../models/Expense");

// @desc    Get dashboard KPIs
// @route   GET /dashboard
exports.getDashboardSummary = async (req, res) => {
  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    const registeredModels = mongoose.modelNames();
    const hasVehicle = registeredModels.includes("Vehicle");
    const hasDriver = registeredModels.includes("Driver");
    const hasTrip = registeredModels.includes("Trip");
    const hasMaintenance = registeredModels.includes("Maintenance");

    const Vehicle = hasVehicle ? mongoose.model("Vehicle") : null;
    const Driver = hasDriver ? mongoose.model("Driver") : null;
    const Trip = hasTrip ? mongoose.model("Trip") : null;
    const Maintenance = hasMaintenance ? mongoose.model("Maintenance") : null;

    const [
      totalVehicles,
      totalDrivers,
      fuelCostResult,
      monthlyExpensesResult,
    ] = await Promise.all([
      hasVehicle ? Vehicle.countDocuments() : Promise.resolve(0),
      hasDriver ? Driver.countDocuments() : Promise.resolve(0),
      Fuel.aggregate([
        { $match: { fuelDate: { $gte: startOfMonth, $lt: startOfNextMonth } } },
        { $group: { _id: null, total: { $sum: "$cost" } } },
      ]),
      Expense.aggregate([
        { $match: { expenseDate: { $gte: startOfMonth, $lt: startOfNextMonth } } },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ]),
    ]);

    const fuelCost = fuelCostResult.length > 0 ? fuelCostResult[0].total : 0;
    const monthlyExpenses =
      monthlyExpensesResult.length > 0 ? monthlyExpensesResult[0].total : 0;

    // TODO: availableVehicles, vehiclesOnTrip, vehiclesInShop depend on the
    // Vehicle model's status field (owned by auth-vehicle-driver branch).
    // Returning 0 until that schema/enum is available to reference.
    const availableVehicles = 0;
    const vehiclesOnTrip = 0;
    const vehiclesInShop = 0;

    // TODO: activeTrips depends on the Trip model's status field
    // (owned by trips-maintenance branch). Returning 0 until available.
    const activeTrips = 0;

    // TODO: maintenanceCost depends on the Maintenance model's cost/date
    // fields (owned by trips-maintenance branch). Returning 0 until available.
    const maintenanceCost = 0;

    return res.status(200).json({
      success: true,
      data: {
        totalVehicles,
        availableVehicles,
        vehiclesOnTrip,
        vehiclesInShop,
        totalDrivers,
        activeTrips,
        fuelCost,
        maintenanceCost,
        monthlyExpenses,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard summary",
      error: error.message,
    });
  }
};