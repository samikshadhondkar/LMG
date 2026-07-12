require('dotenv').config();
const mongoose = require('mongoose');
const Vehicle = require('../models/Vehicle');
const Driver = require('../models/Driver');
const Trip = require('../models/Trip');
const Maintenance = require('../models/Maintenance');

const uri = process.env.MONGO_URI;

const vehicles = [
  {
    vehicleNumber: 'TR-1001',
    vehicleType: 'Bus',
    capacity: 40,
    status: 'available',
  },
  {
    vehicleNumber: 'TR-1002',
    vehicleType: 'Van',
    capacity: 14,
    status: 'available',
  },
  {
    vehicleNumber: 'TR-1003',
    vehicleType: 'Mini Bus',
    capacity: 22,
    status: 'maintenance',
  },
];

const drivers = [
  {
    name: 'Priya Singh',
    licenseNumber: 'DL-12345678',
    contactNumber: '+91-9876543210',
    status: 'available',
  },
  {
    name: 'Ravi Patel',
    licenseNumber: 'DL-87654321',
    contactNumber: '+91-9123456780',
    status: 'available',
  },
  {
    name: 'Anjali Kumar',
    licenseNumber: 'DL-11223344',
    contactNumber: '+91-9988776655',
    status: 'leave',
  },
];

const seed = async () => {
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB for seeding');

    await Vehicle.deleteMany({});
    await Driver.deleteMany({});
    await Trip.deleteMany({});
    await Maintenance.deleteMany({});

    const createdVehicles = await Vehicle.create(vehicles);
    const createdDrivers = await Driver.create(drivers);

    const demoTrip = await Trip.create({
      vehicleId: createdVehicles[0]._id,
      driver: {
        name: createdDrivers[0].name,
        licenseNumber: createdDrivers[0].licenseNumber,
        contactNumber: createdDrivers[0].contactNumber,
      },
      source: 'Airport Terminal',
      destination: 'City Center',
      startTime: new Date().toISOString(),
      endTime: new Date(Date.now() + 45 * 60000).toISOString(),
      distance: 18,
      passengerCount: 25,
      status: 'scheduled',
    });

    const demoMaintenance = await Maintenance.create({
      vehicleId: createdVehicles[2]._id,
      maintenanceType: 'Engine service',
      description: 'Engine diagnostics and tune-up',
      serviceDate: new Date().toISOString(),
      nextServiceDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      cost: 1200,
      status: 'pending',
      mechanic: {
        name: 'Rohit Sharma',
        contactNumber: '+91-9988123456',
      },
    });

    console.log('Seed data created:');
    console.log('Vehicle IDs:', createdVehicles.map((v) => ({ id: v._id.toString(), number: v.vehicleNumber, status: v.status })));
    console.log('Driver IDs:', createdDrivers.map((d) => ({ id: d._id.toString(), license: d.licenseNumber, status: d.status })));
    console.log('Demo Trip:', demoTrip);
    console.log('Demo Maintenance:', demoMaintenance);

    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seed();