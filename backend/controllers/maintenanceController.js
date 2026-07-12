const { validationResult } = require('express-validator');
const Maintenance = require('../models/Maintenance');
const Vehicle = require('../models/Vehicle');

/**
 * @desc    Create a new maintenance record
 * @route   POST /api/maintenance
 *
 * BUSINESS RULES:
 * 1. Vehicle referenced by vehicleId must exist.
 * 2. Once the maintenance record is created, the Vehicle is marked as
 *    "maintenance" so it can't be booked for a trip while being serviced.
 */
const createMaintenance = async (req, res) => {
  try {
    // Existing express-validator checks (untouched)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array(),
      });
    }

    // --- RULE 1: Vehicle must exist ---
    const vehicle = await Vehicle.findById(req.body.vehicleId);
    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: 'Vehicle not found',
      });
    }

    const maintenance = await Maintenance.create(req.body);

    // --- RULE 2: Put the vehicle into maintenance state ---
    vehicle.status = 'maintenance';
    await vehicle.save();

    return res.status(201).json({
      success: true,
      message: 'Maintenance record created successfully',
      data: maintenance,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to create maintenance record',
      error: error.message,
    });
  }
};

/**
 * @desc    Get all maintenance records (supports optional ?status= filter)
 * @route   GET /api/maintenance
 */
const getAllMaintenance = async (req, res) => {
  try {
    const filter = {};
    if (req.query.status) {
      filter.status = req.query.status;
    }

    const records = await Maintenance.find(filter).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: records.length,
      data: records,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch maintenance records',
      error: error.message,
    });
  }
};

/**
 * @desc    Get a single maintenance record by ID
 * @route   GET /api/maintenance/:id
 */
const getMaintenanceById = async (req, res) => {
  try {
    const record = await Maintenance.findById(req.params.id);

    if (!record) {
      return res.status(404).json({
        success: false,
        message: 'Maintenance record not found',
      });
    }

    return res.status(200).json({
      success: true,
      data: record,
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid maintenance ID format',
      });
    }
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch maintenance record',
      error: error.message,
    });
  }
};

/**
 * @desc    Update a maintenance record by ID
 * @route   PUT /api/maintenance/:id
 *
 * BUSINESS RULE:
 * When a maintenance record's status transitions INTO "completed" (i.e. it
 * wasn't already completed before this update), the associated Vehicle is
 * freed up by setting its status back to "available".
 * This only fires on the transition, so re-saving an already-completed
 * record won't repeatedly touch the Vehicle document.
 */
const updateMaintenance = async (req, res) => {
  try {
    // Existing express-validator checks (untouched)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array(),
      });
    }

    // Fetch the record first so we know its status BEFORE this update is applied.
    const existingRecord = await Maintenance.findById(req.params.id);

    if (!existingRecord) {
      return res.status(404).json({
        success: false,
        message: 'Maintenance record not found',
      });
    }

    const wasAlreadyCompleted = existingRecord.status === 'completed';

    // Same update behavior as before: findByIdAndUpdate with validators.
    const record = await Maintenance.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    // --- BUSINESS RULE: free up the Vehicle on completion ---
    const isNowCompleted = record.status === 'completed';

    if (isNowCompleted && !wasAlreadyCompleted) {
      const vehicle = await Vehicle.findById(record.vehicleId);
      if (vehicle) {
        vehicle.status = 'available';
        await vehicle.save();
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Maintenance record updated successfully',
      data: record,
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid maintenance ID format',
      });
    }
    return res.status(500).json({
      success: false,
      message: 'Failed to update maintenance record',
      error: error.message,
    });
  }
};

/**
 * @desc    Delete a maintenance record by ID
 * @route   DELETE /api/maintenance/:id
 */
const deleteMaintenance = async (req, res) => {
  try {
    const record = await Maintenance.findByIdAndDelete(req.params.id);

    if (!record) {
      return res.status(404).json({
        success: false,
        message: 'Maintenance record not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Maintenance record deleted successfully',
      data: record,
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid maintenance ID format',
      });
    }
    return res.status(500).json({
      success: false,
      message: 'Failed to delete maintenance record',
      error: error.message,
    });
  }
};

module.exports = {
  createMaintenance,
  getAllMaintenance,
  getMaintenanceById,
  updateMaintenance,
  deleteMaintenance,
};