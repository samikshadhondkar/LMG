const Vehicle = require('../models/Vehicle');
const { validationResult } = require('express-validator');

// @desc    Get all vehicles
// @route   GET /api/vehicles
// @access  Private
const getVehicles = async (req, res, next) => {
  try {
    const { status, vehicleType, search } = req.query;
    const filter = {};

    if (status) filter.status = status;
    if (vehicleType) filter.vehicleType = vehicleType;
    if (search) {
      filter.$or = [
        { vehicleNumber: { $regex: search, $options: 'i' } },
        { registrationNumber: { $regex: search, $options: 'i' } },
      ];
    }

    const vehicles = await Vehicle.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: 'Vehicles fetched successfully',
      data: vehicles,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single vehicle
// @route   GET /api/vehicles/:id
// @access  Private
const getVehicleById = async (req, res, next) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: 'Vehicle not found',
        errors: [],
      });
    }

    res.status(200).json({
      success: true,
      message: 'Vehicle fetched successfully',
      data: vehicle,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create vehicle
// @route   POST /api/vehicles
// @access  Private
const createVehicle = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array().map((e) => e.msg),
      });
    }

    const existing = await Vehicle.findOne({
      registrationNumber: req.body.registrationNumber?.toUpperCase(),
    });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'A vehicle with this registration number already exists',
        errors: [],
      });
    }

    const vehicle = await Vehicle.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Vehicle created successfully',
      data: vehicle,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update vehicle
// @route   PUT /api/vehicles/:id
// @access  Private
const updateVehicle = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array().map((e) => e.msg),
      });
    }

    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: 'Vehicle not found',
        errors: [],
      });
    }

    // If registration number is being changed, ensure it's still unique
    if (
      req.body.registrationNumber &&
      req.body.registrationNumber.toUpperCase() !== vehicle.registrationNumber
    ) {
      const existing = await Vehicle.findOne({
        registrationNumber: req.body.registrationNumber.toUpperCase(),
      });
      if (existing) {
        return res.status(400).json({
          success: false,
          message: 'A vehicle with this registration number already exists',
          errors: [],
        });
      }
    }

    Object.assign(vehicle, req.body);
    await vehicle.save();

    res.status(200).json({
      success: true,
      message: 'Vehicle updated successfully',
      data: vehicle,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete vehicle
// @route   DELETE /api/vehicles/:id
// @access  Private
const deleteVehicle = async (req, res, next) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: 'Vehicle not found',
        errors: [],
      });
    }

    if (vehicle.status === 'On Trip') {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete a vehicle that is currently on a trip',
        errors: [],
      });
    }

    await vehicle.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Vehicle deleted successfully',
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getVehicles,
  getVehicleById,
  createVehicle,
  updateVehicle,
  deleteVehicle,
};