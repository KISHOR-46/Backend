const axios = require('axios');

const API_URL = 'http://localhost:5000/api/orders';

async function testOrderAPI() {
  console.log('🧪 Testing Order API...\n');

  try {
    // Test: Create Order
    console.log('1️⃣ Testing CREATE ORDER...');
    const orderData = {
      customer: 'Test Customer',
      email: 'test@example.com',
      items: [
        { id: 's23', title: 'Samsung S23 Ultra', quantity: 1, price: '₹79,999' },
        { id: 'airpods', title: 'Apple AirPods Pro 2', quantity: 2, price: '₹24,900' }
      ],
      total: 129799
    };

    const response = await axios.post(API_URL, orderData);
    console.log('✅ Order Created:', response.data.message);
    console.log('   Order ID:', response.data.orderId);
    console.log('   Total Items:', response.data.totalItems);
    console.log();

    // Test: Get All Orders
    console.log('2️⃣ Testing GET ALL ORDERS...');
    const allOrders = await axios.get(API_URL);
    console.log(`✅ Found ${allOrders.data.count} orders`);
    console.log();

    console.log('🎉 Order API working perfectly!');
  } catch (error) {
    console.log('❌ Error:', error.message);
    if (error.code === 'ECONNREFUSED') {
      console.log('\n⚠️  Backend server is not running!');
    }
  }
}

testOrderAPI();
