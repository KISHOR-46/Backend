const mongoose = require('mongoose');
require('dotenv').config();
const Order = require('./models/orderModel');

async function clearOrders() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URL);
    console.log('✅ Connected to MongoDB\n');

    console.log('🗑️  Clearing all sample orders...');
    const result = await Order.deleteMany({});
    console.log(`✅ Deleted ${result.deletedCount} orders\n`);

    console.log('🎉 Orders table cleared! Only user-created orders will be saved now.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

clearOrders();
