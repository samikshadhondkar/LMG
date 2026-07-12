const { validationResult } = require('express-validator');
const Trip = require('../models/Trip');
const Vehicle = require('../models/Vehicle');
const Driver = require('../models/Driver');

/**
 * @desc    Create a new trip
 * @route   POST /api/trips
 *
 * BUSINESS RULES:
 * 1. Vehicle referenced by vehicleId must exist.
 * 2. Vehicle must not be under maintenance or already on another trip.
 * 3. Driver referenced by driver.licenseNumber must exist.
 * 4. Driver must be available (not already on_trip or on leave).
 * 5. Once the trip is created, the Vehicle and Driver are both marked on_trip
 *    so they can't be double-booked by another trip while this one is active.
 */
const createTrip = async (req, res) => {
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

    // --- RULE 2: Vehicle must be free to assign ---
    if (vehicle.status === 'maintenance') {
      return res.status(400).json({
        success: false,
        message: 'Vehicle is under maintenance.',
      });
    }

    if (vehicle.status === 'on_trip') {
      return res.status(400).json({
        success: false,
        message: 'Vehicle is already on another trip.',
      });
    }

    // --- RULE 3: Driver must exist (looked up by embedded licenseNumber) ---
    const driver = await Driver.findOne({
      licenseNumber: req.body.driver.licenseNumber,
    });

    if (!driver) {
      return res.status(404).json({
        success: false,
        message: 'Driver not found',
      });
    }

    // --- RULE 4: Driver must be available ---
    if (driver.status !== 'available') {
      return res.status(400).json({
        success: false,
        message: 'Driver is not available.',
      });
    }

    // All checks passed — create the trip.
    // Trip still stores the driver as an embedded snapshot (name, licenseNumber,
    // contactNumber) exactly as before; we only used the Driver collection to
    // validate availability, we did not change the Trip schema or its request body.
    const trip = await Trip.create(req.body);

    // --- RULE 5: Lock the vehicle and driver so they can't be double-booked ---
    vehicle.status = 'on_trip';
    await vehicle.save();

    driver.status = 'on_trip';
    await driver.save();

    return res.status(201).json({
      success: true,
      message: 'Trip created successfully',
      data: trip,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to create trip',
      error: error.message,
    });
  }
};

/**
 * @desc    Get all trips (supports optional ?status= filter)
 * @route   GET /api/trips
 */
const getAllTrips = async (req, res) => {
  try {
    const filter = {};
    if (req.query.status) {
      filter.status = req.query.status;
    }

    const trips = await Trip.find(filter).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: trips.length,
      data: trips,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch trips',
      error: error.message,
    });
  }
};

/**
 * @desc    Get a single trip by ID
 * @route   GET /api/trips/:id
 */
const getTripById = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: 'Trip not found',
      });
    }

    return res.status(200).json({
      success: true,
      data: trip,
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid trip ID format',
      });
    }
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch trip',
      error: error.message,
    });
  }
};

/**
 * @desc    Update a trip by ID
 * @route   PUT /api/trips/:id
 *
 * BUSINESS RULE:
 * When a trip's status transitions INTO "completed" (i.e. it wasn't already
 * completed before this update), the associated Vehicle and Driver are freed
 * up by setting their status back to "available".
 * This only fires on the transition, so re-saving an already-completed trip
 * won't repeatedly touch Vehicle/Driver documents.
 */
const updateTrip = async (req, res) => {
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

    // Fetch the trip first so we know its status BEFORE this update is applied.
    const existingTrip = await Trip.findById(req.params.id);

    if (!existingTrip) {
      return res.status(404).json({
        success: false,
        message: 'Trip not found',
      });
    }

    const wasAlreadyCompleted = existingTrip.status === 'completed';

    // Same update behavior as before: findByIdAndUpdate with validators.
    const trip = await Trip.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    // --- BUSINESS RULE: free up Vehicle & Driver on completion ---
    const isNowCompleted = trip.status === 'completed';

    if (isNowCompleted && !wasAlreadyCompleted) {
      // Release the vehicle, if it still exists.
      const vehicle = await Vehicle.findById(trip.vehicleId);
      if (vehicle) {
        vehicle.status = 'available';
        await vehicle.save();
      }

      // Release the driver, matched by the embedded licenseNumber, if still exists.
      const driver = await Driver.findOne({
        licenseNumber: trip.driver.licenseNumber,
      });
      if (driver) {
        driver.status = 'available';
        await driver.save();
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Trip updated successfully',
      data: trip,
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid trip ID format',
      });
    }
    return res.status(500).json({
      success: false,
      message: 'Failed to update trip',
      error: error.message,
    });
  }
};

/**
 * @desc    Delete a trip by ID
 * @route   DELETE /api/trips/:id
 */
const deleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findByIdAndDelete(req.params.id);

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: 'Trip not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Trip deleted successfully',
      data: trip,
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid trip ID format',
      });
    }
    return res.status(500).json({
      success: false,
      message: 'Failed to delete trip',
      error: error.message,
    });
  }
};

module.exports = {
  createTrip,
  getAllTrips,
  getTripById,
  updateTrip,
  deleteTrip,
};