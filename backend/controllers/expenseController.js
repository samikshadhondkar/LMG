const mongoose = require("mongoose");
const Expense = require("../models/Expense");

// @desc    Get all expense records
// @route   GET /expenses
exports.getExpenses = async (req, res) => {
  try {
    let query = Expense.find().sort({ expenseDate: -1, createdAt: -1 });

    // Populate vehicle only if the Vehicle model is registered (teammate's module)
    if (mongoose.modelNames().includes("Vehicle")) {
      query = query.populate("vehicle", "name registrationNumber");
    }

    // Populate trip only if the Trip model is registered (teammate's module)
    if (mongoose.modelNames().includes("Trip")) {
      query = query.populate("trip");
    }

    const expenseRecords = await query;

    return res.status(200).json({
      success: true,
      message: "Expense records fetched successfully",
      data: expenseRecords,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch expense records",
      error: error.message,
    });
  }
};

// @desc    Create a new expense record
// @route   POST /expenses
exports.createExpense = async (req, res) => {
  try {
    const { vehicle, trip, category, amount, expenseDate, description } =
      req.body;

    // Validate required fields
    if (!vehicle || !category || !amount || !expenseDate) {
      return res.status(400).json({
        success: false,
        message: "Vehicle, category, amount and expense date are required",
        error: "Missing required fields",
      });
    }

    // Validate expenseDate
    if (isNaN(Date.parse(expenseDate))) {
      return res.status(400).json({
        success: false,
        message: "Invalid expense date",
        error: "expenseDate must be a valid date",
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

    const newExpense = await Expense.create({
      vehicle,
      trip: trip || null,
      category,
      amount,
      expenseDate,
      description,
    });

    return res.status(201).json({
      success: true,
      message: "Expense record created successfully",
      data: newExpense,
    });
  } catch (error) {
    // Handle mongoose validation errors distinctly (e.g. invalid category enum)
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        error: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to create expense record",
      error: error.message,
    });
  }
};