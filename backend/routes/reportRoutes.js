const express = require("express");
const router = express.Router();
const {
  getFuelReport,
  getExpenseReport,
} = require("../controllers/reportController");

router.get("/fuel", getFuelReport);
router.get("/expenses", getExpenseReport);

module.exports = router;