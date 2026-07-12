
require("dns").setDefaultResultOrder("ipv4first");
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const tripRoutes = require('./routes/tripRoutes');
const maintenanceRoutes = require('./routes/maintenanceRoutes');

const app = express();

// Connect to MongoDB
console.log("Mongo URI:", process.env.MONGO_URI);
connectDB();

// Core middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'TransitOps API is running',
  });
});

// Routes
app.use('/api/trips', tripRoutes);
app.use('/api/maintenance', maintenanceRoutes);

// 404 handler (unmatched routes)
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// Global error handler (catches anything unexpected that slips past controllers)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong on the server',
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`TransitOps server running on port ${PORT}`);
});