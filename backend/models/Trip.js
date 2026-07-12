const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema(
  {
    vehicleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vehicle',
      required: [true, 'Vehicle ID is required'],
    },
    driver: {
      name: {
        type: String,
        required: [true, 'Driver name is required'],
        trim: true,
      },
      licenseNumber: {
        type: String,
        required: [true, 'Driver license number is required'],
        trim: true,
      },
      contactNumber: {
        type: String,
        trim: true,
      },
    },
    source: {
      type: String,
      required: [true, 'Source location is required'],
      trim: true,
    },
    destination: {
      type: String,
      required: [true, 'Destination location is required'],
      trim: true,
    },
    startTime: {
      type: Date,
      required: [true, 'Start time is required'],
    },
    endTime: {
      type: Date,
    },
    status: {
      type: String,
      enum: ['scheduled', 'ongoing', 'completed', 'cancelled'],
      default: 'scheduled',
    },
    distance: {
      type: Number,
      min: [0, 'Distance cannot be negative'],
      default: 0,
    },
    passengerCount: {
      type: Number,
      min: [0, 'Passenger count cannot be negative'],
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Trip', tripSchema);