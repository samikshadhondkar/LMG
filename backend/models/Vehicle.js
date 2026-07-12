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
      required: [true, 'Vehicle number is required'],
      trim: true,
    },
    registrationNumber: {
      type: String,
      required: [true, 'Registration number is required'],
      unique: true,
      trim: true,
      uppercase: true,
    },
    vehicleType: {
      type: String,
      required: [true, 'Vehicle type is required'],
      trim: true,
    },
    capacity: {
      type: Number,
      required: [true, 'Maximum load capacity is required'],
      min: [1, 'Capacity must be greater than 0'],
    },
    odometer: {
      type: Number,
      default: 0,
      min: 0,
    },
    acquisitionCost: {
      type: Number,
      default: 0,
      min: 0,
    },
    status: {
      type: String,
      enum: ['Available', 'On Trip', 'In Shop', 'Retired'],
      default: 'Available',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Vehicle', vehicleSchema);