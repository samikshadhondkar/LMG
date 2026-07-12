const mongoose = require("mongoose");
const Fuel = require("../models/Fuel");
const Expense = require("../models/Expense");

// @desc    Get fuel report (all fuel records)
// @route   GET /reports/fuel
exports.getFuelReport = async (req, res) => {
  try {
    let query = Fuel.find().sort({ fuelDate: -1 });

    // Populate vehicle only if the Vehicle model is registered (teammate's module)
    if (mongoose.modelNames().includes("Vehicle")) {
      query = query.populate("vehicle", "name registrationNumber");
    }

    // Populate trip only if the Trip model is registered (teammate's module)
    if (mongoose.modelNames().includes("Trip")) {
      query = query.populate("trip");
    }

    const fuelReport = await query;

    return res.status(200).json({
      success: true,
      message: "Fuel report fetched successfully",
      data: fuelReport,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch fuel report",
      error: error.message,
    });
  }
};

// @desc    Get expense report (all expense records)
// @route   GET /reports/expenses
exports.getExpenseReport = async (req, res) => {
  try {
    let query = Expense.find().sort({ expenseDate: -1 });

    // Populate vehicle only if the Vehicle model is registered (teammate's module)
    if (mongoose.modelNames().includes("Vehicle")) {
      query = query.populate("vehicle", "name registrationNumber");
    }

    // Populate trip only if the Trip model is registered (teammate's module)
    if (mongoose.modelNames().includes("Trip")) {
      query = query.populate("trip");
    }

    const expenseReport = await query;

    return res.status(200).json({
      success: true,
      message: "Expense report fetched successfully",
      data: expenseReport,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch expense report",
      error: error.message,
    });
  }
};