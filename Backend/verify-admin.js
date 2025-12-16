const mongoose = require('mongoose');
require('dotenv').config();
const Admin = require('./models/adminModel');

async function verifyAdmin() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URL);
    console.log('✅ Connected to MongoDB\n');

    const email = 'suryasekar626@gmail.com';
    const admin = await Admin.findOne({ email });

    if (admin) {
      console.log('✅ Admin found in database!');
      console.log('   Name:', admin.name);
      console.log('   Email:', admin.email);
      console.log('   Password:', admin.password);
      console.log('   Role:', admin.role);
      console.log('   Active:', admin.isActive);
    } else {
      console.log('❌ Admin not found in database');
    }

    console.log('\n📊 All Admins in database:');
    const allAdmins = await Admin.find({});
    allAdmins.forEach((a, i) => {
      console.log(`   ${i + 1}. ${a.name} (${a.email})`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

verifyAdmin();
