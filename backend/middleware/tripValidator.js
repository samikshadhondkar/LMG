const { body, param } = require('express-validator');

const tripValidationRules = [
  body('vehicleId')
    .notEmpty().withMessage('vehicleId is required')
    .isMongoId().withMessage('vehicleId must be a valid Mongo ID'),

  body('driver.name')
    .notEmpty().withMessage('Driver name is required')
    .isString().withMessage('Driver name must be a string'),

  body('driver.licenseNumber')
    .notEmpty().withMessage('Driver license number is required'),

  body('driver.contactNumber')
    .optional()
    .isString().withMessage('Driver contact number must be a string'),

  body('source')
    .notEmpty().withMessage('Source is required'),

  body('destination')
    .notEmpty().withMessage('Destination is required'),

  body('startTime')
    .notEmpty().withMessage('Start time is required')
    .isISO8601().withMessage('Start time must be a valid date'),

  body('endTime')
    .optional()
    .isISO8601().withMessage('End time must be a valid date'),

  body('status')
    .optional()
    .isIn(['scheduled', 'ongoing', 'completed', 'cancelled'])
    .withMessage('Status must be one of: scheduled, ongoing, completed, cancelled'),

  body('distance')
    .optional()
    .isFloat({ min: 0 }).withMessage('Distance must be a positive number'),

  body('passengerCount')
    .optional()
    .isInt({ min: 0 }).withMessage('Passenger count must be a positive integer'),
];

const tripIdValidationRule = [
  param('id').isMongoId().withMessage('Invalid trip ID format'),
];

module.exports = {
  tripValidationRules,
  tripIdValidationRule,
};