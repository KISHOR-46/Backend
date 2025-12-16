const Order = require("../models/orderModel");

// Create new order
const createOrder = async (req, res) => {
  try {
    const { customer, email, items, total } = req.body;

    // Generate order ID
    const orderCount = await Order.countDocuments();
    const orderId = `ORD${String(orderCount + 1).padStart(3, '0')}`;

    // Create orders for each item
    const orders = items.map(item => ({
      orderId: `${orderId}-${item.id}`,
      customer,
      email,
      product: item.title,
      quantity: item.quantity,
      total: item.price,
      status: 'Pending',
      orderDate: new Date()
    }));

    await Order.insertMany(orders);

    res.status(201).json({
      success: true,
      message: "Order placed successfully!",
      orderId: orderId,
      totalItems: items.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error placing order",
      error: error.message
    });
  }
};

// Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).sort({ orderDate: -1 });
    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching orders",
      error: error.message
    });
  }
};

// Get orders by email
const getOrdersByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const orders = await Order.find({ email }).sort({ orderDate: -1 });
    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching orders",
      error: error.message
    });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrdersByEmail
};
