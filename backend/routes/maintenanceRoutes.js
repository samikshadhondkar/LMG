const express = require("express");
const router = express.Router();

const {
createMaintenance,
getMaintenance
} = require("../controllers/maintenanceController");


router.post("/", createMaintenance);
router.get("/", getMaintenance);


module.exports = router;