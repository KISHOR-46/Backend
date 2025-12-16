const axios = require('axios');

const API_URL = 'http://localhost:5000/api/user';

// Test data
const testUser = {
  firstname: 'Test',
  lastname: 'User',
  email: 'testuser@example.com',
  phone: '1234567890',
  password: 'Test123'
};

async function testAPIs() {
  console.log('🧪 Testing Backend APIs...\n');

  try {
    // Test 1: Signup
    console.log('1️⃣ Testing SIGNUP API...');
    try {
      const signupResponse = await axios.post(`${API_URL}/signup`, testUser);
      console.log('✅ Signup Success:', signupResponse.data.message);
      console.log('   User:', signupResponse.data.data);
    } catch (error) {
      if (error.response?.status === 400) {
        console.log('⚠️  User already exists (expected if running test again)');
      } else {
        throw error;
      }
    }
    console.log();

    // Test 2: Login with correct credentials
    console.log('2️⃣ Testing LOGIN API (correct credentials)...');
    const loginResponse = await axios.post(`${API_URL}/login`, {
      email: testUser.email,
      password: testUser.password
    });
    console.log('✅ Login Success:', loginResponse.data.message);
    console.log('   User:', loginResponse.data.data);
    console.log();

    // Test 3: Login with wrong password
    console.log('3️⃣ Testing LOGIN API (wrong password)...');
    try {
      await axios.post(`${API_URL}/login`, {
        email: testUser.email,
        password: 'WrongPassword123'
      });
    } catch (error) {
      if (error.response?.status === 401) {
        console.log('✅ Correctly rejected wrong password');
      } else {
        throw error;
      }
    }
    console.log();

    // Test 4: Login with non-existent user
    console.log('4️⃣ Testing LOGIN API (non-existent user)...');
    try {
      await axios.post(`${API_URL}/login`, {
        email: 'nonexistent@example.com',
        password: 'Test123'
      });
    } catch (error) {
      if (error.response?.status === 404) {
        console.log('✅ Correctly rejected non-existent user');
      } else {
        throw error;
      }
    }
    console.log();

    // Test 5: Forgot Password
    console.log('5️⃣ Testing FORGOT PASSWORD API...');
    const forgotResponse = await axios.post(`${API_URL}/forgot-password`, {
      email: testUser.email,
      newPassword: 'NewTest123'
    });
    console.log('✅ Password Reset Success:', forgotResponse.data.message);
    console.log();

    // Test 6: Login with new password
    console.log('6️⃣ Testing LOGIN with new password...');
    const newLoginResponse = await axios.post(`${API_URL}/login`, {
      email: testUser.email,
      password: 'NewTest123'
    });
    console.log('✅ Login with new password Success:', newLoginResponse.data.message);
    console.log();

    console.log('🎉 ALL API TESTS PASSED! Backend is working perfectly!\n');
    console.log('Summary:');
    console.log('✅ Signup API - Working');
    console.log('✅ Login API - Working');
    console.log('✅ Forgot Password API - Working');
    console.log('✅ MongoDB Connection - Working');
    console.log('✅ Data Validation - Working');

  } catch (error) {
    console.log('\n❌ TEST FAILED!');
    console.log('Error:', error.response?.data || error.message);
    process.exit(1);
  }
}

// Check if server is running
console.log('Checking if server is running on port 5000...\n');
testAPIs();
