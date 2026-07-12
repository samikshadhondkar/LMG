const express = require('express');
const { body } = require('express-validator');
const {
  getDrivers,
  getDriverById,
  createDriver,
  updateDriver,
  deleteDriver,
} = require('../controllers/driverController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

const createValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('phone').trim().notEmpty().withMessage('Contact number is required'),
  body('licenseNumber').trim().notEmpty().withMessage('License number is required'),
  body('licenseExpiry').notEmpty().withMessage('License expiry date is required')
    .isISO8601().withMessage('License expiry must be a valid date'),
];

const updateValidation = [
  body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
  body('phone').optional().trim().notEmpty().withMessage('Contact number cannot be empty'),
  body('licenseNumber').optional().trim().notEmpty().withMessage('License number cannot be empty'),
  body('licenseExpiry').optional().isISO8601().withMessage('License expiry must be a valid date'),
  body('status')
    .optional()
    .isIn(['Available', 'On Trip', 'Off Duty', 'Suspended'])
    .withMessage('Invalid status value'),
];

router.use(protect);

router.get('/', getDrivers);
router.get('/:id', getDriverById);
router.post('/', createValidation, createDriver);
router.put('/:id', updateValidation, updateDriver);
router.delete('/:id', deleteDriver);

module.exports = router;