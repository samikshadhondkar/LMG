const Driver = require('../models/Driver');
const { validationResult } = require('express-validator');

// @desc    Get all drivers
// @route   GET /api/drivers
// @access  Private
const getDrivers = async (req, res, next) => {
  try {
    const { status, search } = req.query;
    const filter = {};

    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { licenseNumber: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
      ];
    }

    const drivers = await Driver.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: 'Drivers fetched successfully',
      data: drivers,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single driver
// @route   GET /api/drivers/:id
// @access  Private
const getDriverById = async (req, res, next) => {
  try {
    const driver = await Driver.findById(req.params.id);

    if (!driver) {
      return res.status(404).json({
        success: false,
        message: 'Driver not found',
        errors: [],
      });
    }

    res.status(200).json({
      success: true,
      message: 'Driver fetched successfully',
      data: driver,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create driver
// @route   POST /api/drivers
// @access  Private
const createDriver = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array().map((e) => e.msg),
      });
    }

    const existing = await Driver.findOne({
      licenseNumber: req.body.licenseNumber?.toUpperCase(),
    });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'A driver with this license number already exists',
        errors: [],
      });
    }

    // Business rule: license expiry must be a future date
    if (new Date(req.body.licenseExpiry) < new Date()) {
      return res.status(400).json({
        success: false,
        message: 'License expiry date must be in the future',
        errors: [],
      });
    }

    const driver = await Driver.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Driver created successfully',
      data: driver,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update driver
// @route   PUT /api/drivers/:id
// @access  Private
const updateDriver = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array().map((e) => e.msg),
      });
    }

    const driver = await Driver.findById(req.params.id);
    if (!driver) {
      return res.status(404).json({
        success: false,
        message: 'Driver not found',
        errors: [],
      });
    }

    // If license number is being changed, ensure it's still unique
    if (
      req.body.licenseNumber &&
      req.body.licenseNumber.toUpperCase() !== driver.licenseNumber
    ) {
      const existing = await Driver.findOne({
        licenseNumber: req.body.licenseNumber.toUpperCase(),
      });
      if (existing) {
        return res.status(400).json({
          success: false,
          message: 'A driver with this license number already exists',
          errors: [],
        });
      }
    }

    if (req.body.licenseExpiry && new Date(req.body.licenseExpiry) < new Date()) {
      return res.status(400).json({
        success: false,
        message: 'License expiry date must be in the future',
        errors: [],
      });
    }

    Object.assign(driver, req.body);
    await driver.save();

    res.status(200).json({
      success: true,
      message: 'Driver updated successfully',
      data: driver,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete driver
// @route   DELETE /api/drivers/:id
// @access  Private
const deleteDriver = async (req, res, next) => {
  try {
    const driver = await Driver.findById(req.params.id);
    if (!driver) {
      return res.status(404).json({
        success: false,
        message: 'Driver not found',
        errors: [],
      });
    }

    if (driver.status === 'On Trip') {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete a driver who is currently on a trip',
        errors: [],
      });
    }

    await driver.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Driver deleted successfully',
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDrivers,
  getDriverById,
  createDriver,
  updateDriver,
  deleteDriver,
};