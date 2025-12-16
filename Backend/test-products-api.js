const axios = require('axios');

async function testProductsAPI() {
  console.log('🧪 Testing Products API...\n');

  try {
    // Test 1: Get all products
    console.log('1️⃣ Testing GET /api/products');
    const allProducts = await axios.get('http://localhost:5000/api/products');
    console.log(`✅ Success! Found ${allProducts.data.count} products`);
    console.log(`   Sample: ${allProducts.data.data[0].title}\n`);

    // Test 2: Get products by category
    console.log('2️⃣ Testing GET /api/products/category/phone');
    const phones = await axios.get('http://localhost:5000/api/products/category/phone');
    console.log(`✅ Success! Found ${phones.data.count} phones`);
    console.log(`   Sample: ${phones.data.data[0].title}\n`);

    // Test 3: Get single product
    console.log('3️⃣ Testing GET /api/products/s23');
    const product = await axios.get('http://localhost:5000/api/products/s23');
    console.log(`✅ Success! Product: ${product.data.data.title}`);
    console.log(`   Price: ${product.data.data.price}\n`);

    console.log('🎉 All Product APIs working perfectly!');
  } catch (error) {
    console.log('❌ Error:', error.message);
    if (error.code === 'ECONNREFUSED') {
      console.log('\n⚠️  Backend server is not running!');
      console.log('   Start it with: node server.js');
    }
  }
}

testProductsAPI();
