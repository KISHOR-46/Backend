const mongoose = require('mongoose');
require('dotenv').config();
const Order = require('./models/orderModel');

const sampleOrders = [
  {
    orderId: "ORD001",
    customer: "John Doe",
    email: "john@example.com",
    product: "Samsung S23 Ultra",
    quantity: 1,
    total: "₹79,999",
    status: "Pending",
    orderDate: new Date("2024-01-15")
  },
  {
    orderId: "ORD002",
    customer: "Jane Smith",
    email: "jane@example.com",
    product: "MacBook Pro M3",
    quantity: 1,
    total: "₹2,49,900",
    status: "Shipped",
    orderDate: new Date("2024-01-14")
  },
  {
    orderId: "ORD003",
    customer: "Mike Johnson",
    email: "mike@example.com",
    product: "Sony WH-1000XM5",
    quantity: 2,
    total: "₹59,980",
    status: "Delivered",
    orderDate: new Date("2024-01-13")
  },
  {
    orderId: "ORD004",
    customer: "Sarah Williams",
    email: "sarah@example.com",
    product: "Apple AirPods Pro 2",
    quantity: 1,
    total: "₹24,900",
    status: "Pending",
    orderDate: new Date("2024-01-12")
  },
  {
    orderId: "ORD005",
    customer: "David Brown",
    email: "david@example.com",
    product: "iPhone 15 Pro Max",
    quantity: 1,
    total: "₹1,34,900",
    status: "Shipped",
    orderDate: new Date("2024-01-11")
  }
];

async function populateOrders() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URL);
    console.log('✅ Connected to MongoDB\n');

    console.log('🗑️  Clearing existing orders...');
    await Order.deleteMany({});
    console.log('✅ Cleared existing orders\n');

    console.log('📦 Inserting sample orders...');
    await Order.insertMany(sampleOrders);
    console.log(`✅ Successfully inserted ${sampleOrders.length} orders!\n`);

    console.log('📊 Orders Summary:');
    const pending = sampleOrders.filter(o => o.status === 'Pending').length;
    const shipped = sampleOrders.filter(o => o.status === 'Shipped').length;
    const delivered = sampleOrders.filter(o => o.status === 'Delivered').length;
    console.log(`   Pending: ${pending}`);
    console.log(`   Shipped: ${shipped}`);
    console.log(`   Delivered: ${delivered}`);

    console.log('\n🎉 Orders table populated successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

populateOrders();
