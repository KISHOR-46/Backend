const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.json({
    message: '🎉 GadgetHub API is running!',
    status: 'active',
    endpoints: {
      users: '/api/user',
      products: '/api/products',
      orders: '/api/orders',
      admin: '/api/admin'
    },
    version: '1.0.0'
  });
});

// API Routes
try {
  const userRoutes = require('./routers/signuprouters');
  const productRoutes = require('./routers/productRoutes');
  const orderRoutes = require('./routers/orderRoutes');
  const adminRoutes = require('./routers/adminRoutes');
  app.use('/api/user', userRoutes);
  app.use('/api/products', productRoutes);
  app.use('/api/orders', orderRoutes);
  app.use('/api/admin', adminRoutes);
  console.log('✅ Routes loaded successfully');
} catch (error) {
  console.error('❌ Error loading routes:', error.message);
}

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.log("Connection failed ", err);
  });

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
