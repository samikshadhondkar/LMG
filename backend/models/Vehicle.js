const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema(
  {
    vehicleNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    vehicleType: {
      type: String,
      required: true,
      enum: ['Bus', 'Van', 'Mini Bus'],
    },
    capacity: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['available', 'on_trip', 'maintenance'],
      default: 'available',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Vehicle', vehicleSchema);