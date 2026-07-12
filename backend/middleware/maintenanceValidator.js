const { body, param } = require('express-validator');

const maintenanceValidationRules = [
  body('vehicleId')
    .notEmpty().withMessage('vehicleId is required')
    .isMongoId().withMessage('vehicleId must be a valid Mongo ID'),

  body('maintenanceType')
    .notEmpty().withMessage('Maintenance type is required'),

  body('description')
    .optional()
    .isString().withMessage('Description must be a string'),

  body('serviceDate')
    .notEmpty().withMessage('Service date is required')
    .isISO8601().withMessage('Service date must be a valid date'),

  body('nextServiceDate')
    .optional()
    .isISO8601().withMessage('Next service date must be a valid date'),

  body('cost')
    .optional()
    .isFloat({ min: 0 }).withMessage('Cost must be a positive number'),

  body('status')
    .optional()
    .isIn(['scheduled', 'completed', 'pending'])
    .withMessage('Status must be one of: scheduled, completed, pending'),

  body('mechanic.name')
    .optional()
    .isString().withMessage('Mechanic name must be a string'),

  body('mechanic.contactNumber')
    .optional()
    .isString().withMessage('Mechanic contact number must be a string'),
];

const maintenanceIdValidationRule = [
  param('id').isMongoId().withMessage('Invalid maintenance ID format'),
];

module.exports = {
  maintenanceValidationRules,
  maintenanceIdValidationRule,
};