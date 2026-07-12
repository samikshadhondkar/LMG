const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Contact number is required'],
      trim: true,
    },
    licenseNumber: {
      type: String,
      required: [true, 'License number is required'],
      unique: true,
      trim: true,
      uppercase: true,
    },
    licenseCategory: {
      type: String,
      trim: true,
      default: '',
    },
    licenseExpiry: {
      type: Date,
      required: [true, 'License expiry date is required'],
    },
    safetyScore: {
      type: Number,
      min: 0,
      max: 100,
      default: 100,
    },
    status: {
      type: String,
      enum: ['Available', 'On Trip', 'Off Duty', 'Suspended'],
      default: 'Available',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Driver', driverSchema);