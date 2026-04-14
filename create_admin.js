const mongoose = require('mongoose');
const User = require('./backend/models/User');

const mongoURI = 'mongodb+srv://saloni:KEjr7FehAX3oaC8C@neighbourhood-security.kcujzhs.mongodb.net/security_db?retryWrites=true&w=majority';

async function createAdmin() {
  try {
    await mongoose.connect(mongoURI);
    console.log('✅ Connected to MongoDB');

    const adminEmail = 'admin@test.com';
    const existing = await User.findOne({email: adminEmail});
    if (existing) {
      console.log('👤 Admin already exists');
      process.exit(0);
    }

    const admin = new User({
      name: 'Admin User',
      email: adminEmail,
      password: 'password123',
      location: 'Test Location',
      role: 'admin'
    });

    await admin.save();
    console.log('✅ Admin created: admin@test.com / password123');
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    mongoose.connection.close();
  }
}

createAdmin();
