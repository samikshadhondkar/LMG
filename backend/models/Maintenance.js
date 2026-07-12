const mongoose = require('mongoose');

const maintenanceSchema = new mongoose.Schema(
  {
    vehicleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vehicle',
      required: [true, 'Vehicle ID is required'],
    },
    maintenanceType: {
      type: String,
      required: [true, 'Maintenance type is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    serviceDate: {
      type: Date,
      required: [true, 'Service date is required'],
    },
    nextServiceDate: {
      type: Date,
    },
    cost: {
      type: Number,
      min: [0, 'Cost cannot be negative'],
      default: 0,
    },
    status: {
      type: String,
      enum: ['scheduled', 'completed', 'pending'],
      default: 'pending',
    },
    mechanic: {
      name: {
        type: String,
        trim: true,
      },
      contactNumber: {
        type: String,
        trim: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Maintenance', maintenanceSchema);