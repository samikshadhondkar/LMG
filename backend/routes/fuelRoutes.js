const express = require("express");
const router = express.Router();
const { getFuel, createFuel } = require("../controllers/fuelController");

router.get("/", getFuel);
router.post("/", createFuel);

module.exports = router;