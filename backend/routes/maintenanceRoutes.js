const express = require('express');
const router = express.Router();

const {
  createMaintenance,
  getAllMaintenance,
  getMaintenanceById,
  updateMaintenance,
  deleteMaintenance,
} = require('../controllers/maintenanceController');

const {
  maintenanceValidationRules,
  maintenanceIdValidationRule,
} = require('../middleware/maintenanceValidator');

// POST /api/maintenance
router.post('/', maintenanceValidationRules, createMaintenance);

// GET /api/maintenance
router.get('/', getAllMaintenance);

// GET /api/maintenance/:id
router.get('/:id', maintenanceIdValidationRule, getMaintenanceById);

// PUT /api/maintenance/:id
router.put('/:id', maintenanceIdValidationRule, maintenanceValidationRules, updateMaintenance);

// DELETE /api/maintenance/:id
router.delete('/:id', maintenanceIdValidationRule, deleteMaintenance);

module.exports = router;