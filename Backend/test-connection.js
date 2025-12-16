const mongoose = require('mongoose');
require('dotenv').config();

console.log('Testing MongoDB Atlas Connection...');
console.log('Connection String:', process.env.MONGO_URL.replace(/\/\/.*@/, '//<credentials>@'));

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('✅ MongoDB connected successfully!');
    console.log('Database:', mongoose.connection.name);
    console.log('Host:', mongoose.connection.host);
    process.exit(0);
  })
  .catch((err) => {
    console.log('❌ Connection failed!');
    console.log('Error:', err.message);
    process.exit(1);
  });
