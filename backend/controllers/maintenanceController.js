const { validationResult } = require('express-validator');
const Maintenance = require('../models/Maintenance');

/**
 * @desc    Create a new maintenance record
 * @route   POST /api/maintenance
 */
const createMaintenance = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array(),
      });
    }

    const maintenance = await Maintenance.create(req.body);

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
 */
const updateMaintenance = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array(),
      });
    }

    const record = await Maintenance.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!record) {
      return res.status(404).json({
        success: false,
        message: 'Maintenance record not found',
      });
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