const express = require('express');
const { body } = require('express-validator');
const {
  getVehicles,
  getVehicleById,
  createVehicle,
  updateVehicle,
  deleteVehicle,
} = require('../controllers/vehicleController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Full validation — required for creating a new vehicle
const createValidation = [
  body('vehicleNumber').trim().notEmpty().withMessage('Vehicle number is required'),
  body('registrationNumber').trim().notEmpty().withMessage('Registration number is required'),
  body('vehicleType').trim().notEmpty().withMessage('Vehicle type is required'),
  body('capacity').isFloat({ gt: 0 }).withMessage('Capacity must be greater than 0'),
];

// Partial validation — only checks fields IF they are present, for updates
const updateValidation = [
  body('vehicleNumber').optional().trim().notEmpty().withMessage('Vehicle number cannot be empty'),
  body('registrationNumber').optional().trim().notEmpty().withMessage('Registration number cannot be empty'),
  body('vehicleType').optional().trim().notEmpty().withMessage('Vehicle type cannot be empty'),
  body('capacity').optional().isFloat({ gt: 0 }).withMessage('Capacity must be greater than 0'),
  body('status')
    .optional()
    .isIn(['Available', 'On Trip', 'In Shop', 'Retired'])
    .withMessage('Invalid status value'),
];

router.use(protect); // all vehicle routes require login

router.get('/', getVehicles);
router.get('/:id', getVehicleById);
router.post('/', createValidation, createVehicle);
router.put('/:id', updateValidation, updateVehicle);
router.delete('/:id', deleteVehicle);

module.exports = router;