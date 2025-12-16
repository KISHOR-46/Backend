const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/signupmodels');
const Product = require('./models/productModel');
const Order = require('./models/orderModel');

async function verifyDatabase() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URL);
    console.log('✅ Connected to MongoDB Atlas\n');

    console.log('📊 Database: gadgetstore\n');
    console.log('=' .repeat(50));

    // Check Users
    const userCount = await User.countDocuments();
    console.log('👥 USERS TABLE:');
    console.log(`   Total Users: ${userCount}`);
    if (userCount > 0) {
      const sampleUser = await User.findOne({}, 'firstname email');
      console.log(`   Sample: ${sampleUser.firstname} (${sampleUser.email})`);
    }
    console.log();

    // Check Products
    const productCount = await Product.countDocuments();
    console.log('📦 PRODUCTS TABLE:');
    console.log(`   Total Products: ${productCount}`);
    const categories = await Product.distinct('category');
    console.log(`   Categories: ${categories.join(', ')}`);
    console.log();

    // Check Orders
    const orderCount = await Order.countDocuments();
    console.log('🛒 ORDERS TABLE:');
    console.log(`   Total Orders: ${orderCount}`);
    const pending = await Order.countDocuments({ status: 'Pending' });
    const shipped = await Order.countDocuments({ status: 'Shipped' });
    const delivered = await Order.countDocuments({ status: 'Delivered' });
    console.log(`   Pending: ${pending}`);
    console.log(`   Shipped: ${shipped}`);
    console.log(`   Delivered: ${delivered}`);
    console.log();

    console.log('=' .repeat(50));
    console.log('✅ All tables verified successfully!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

verifyDatabase();
