const mongoose = require('mongoose');
require('dotenv').config();
const Admin = require('./models/adminModel');

async function addAdmin() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URL);
    console.log('✅ Connected to MongoDB\n');

    const adminData = {
      name: 'Surya Sekar',
      email: 'suryasekar626@gmail.com',
      password: 'surya@123',
      role: 'admin',
      isActive: true
    };

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: adminData.email });
    if (existingAdmin) {
      console.log('⚠️  Admin already exists!');
      console.log('   Name:', existingAdmin.name);
      console.log('   Email:', existingAdmin.email);
    } else {
      const newAdmin = new Admin(adminData);
      await newAdmin.save();
      console.log('✅ Admin created successfully!');
      console.log('   Name:', adminData.name);
      console.log('   Email:', adminData.email);
      console.log('   Password:', adminData.password);
    }

    console.log('\n🎉 Admin can now login at /login');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

addAdmin();
