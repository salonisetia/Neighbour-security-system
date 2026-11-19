const path = require('path');
const { createRequire } = require('module');
const backendRequire = createRequire(path.join(__dirname, '..', 'package.json'));
const mongoose = backendRequire('mongoose');
const User = require('../models/User');
backendRequire('dotenv').config({ path: path.join(__dirname, '..', '.env') });

async function createAdmin() {
  try {
    const mongoURI = process.env.MONGO_URI;
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!mongoURI) {
      throw new Error('MONGO_URI must be set in backend/.env or the environment');
    }
    if (!adminPassword) {
      throw new Error('Set ADMIN_PASSWORD in the environment before creating or updating the admin');
    }

    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');

    const adminEmail = (process.env.ADMIN_EMAIL || 'admin@test.com').trim().toLowerCase();
    await User.findOneAndUpdate(
      { email: adminEmail },
      {
        $set: {
          name: 'Admin User',
          email: adminEmail,
          password: adminPassword,
          location: 'Test Location',
          role: 'admin'
        }
      },
      { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
    );
    console.log(`Admin account created or updated: ${adminEmail}`);
  } catch (error) {
    console.error(' Error:', error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
}

createAdmin();
