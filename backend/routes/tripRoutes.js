const express = require('express');
const router = express.Router();

const {
  createTrip,
  getAllTrips,
  getTripById,
  updateTrip,
  deleteTrip,
} = require('../controllers/tripController');

const {
  tripValidationRules,
  tripIdValidationRule,
} = require('../middleware/tripValidator');

// POST /api/trips
router.post('/', tripValidationRules, createTrip);

// GET /api/trips
router.get('/', getAllTrips);

// GET /api/trips/:id
router.get('/:id', tripIdValidationRule, getTripById);

// PUT /api/trips/:id
router.put('/:id', tripIdValidationRule, tripValidationRules, updateTrip);

// DELETE /api/trips/:id
router.delete('/:id', tripIdValidationRule, deleteTrip);

module.exports = router;