const mongoose = require('mongoose');
require('dotenv').config();
const Admin = require('./models/adminModel');

async function updateAdminPassword() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URL);
    console.log('✅ Connected to MongoDB\n');

    const email = 'suryasekar626@gmail.com';
    const newPassword = 'surya@123';

    const admin = await Admin.findOneAndUpdate(
      { email },
      { password: newPassword, name: 'Surya Sekar' },
      { new: true }
    );

    if (admin) {
      console.log('✅ Admin updated successfully!');
      console.log('   Name:', admin.name);
      console.log('   Email:', admin.email);
      console.log('   Password:', newPassword);
      console.log('\n🎉 Admin can now login with these credentials!');
    } else {
      console.log('❌ Admin not found');
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

updateAdminPassword();
