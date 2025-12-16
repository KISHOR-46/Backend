const Admin = require("../models/adminModel");
const User = require("../models/signupmodels");
const Product = require("../models/productModel");
const Order = require("../models/orderModel");

// Get dashboard statistics
const getDashboardStats = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalUsers = await User.countDocuments();
    const pendingOrders = await Order.countDocuments({ status: 'Pending' });
    const shippedOrders = await Order.countDocuments({ status: 'Shipped' });
    const deliveredOrders = await Order.countDocuments({ status: 'Delivered' });

    // Category-wise product count
    const categoryStats = await Product.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } }
    ]);

    // Recent orders
    const recentOrders = await Order.find().sort({ orderDate: -1 }).limit(5);

    res.status(200).json({
      success: true,
      data: {
        totalProducts,
        totalOrders,
        totalUsers,
        pendingOrders,
        shippedOrders,
        deliveredOrders,
        categoryStats,
        recentOrders
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching dashboard stats",
      error: error.message
    });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-password').sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching users",
      error: error.message
    });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "User deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting user",
      error: error.message
    });
  }
};

// Update order status
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Order status updated",
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating order",
      error: error.message
    });
  }
};

// Delete order
const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    await Order.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Order deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting order",
      error: error.message
    });
  }
};

// Create new admin
const createAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: "Admin already exists"
      });
    }
    const newAdmin = new Admin({ name, email, password });
    await newAdmin.save();
    res.status(201).json({
      success: true,
      message: "Admin created successfully",
      data: { name: newAdmin.name, email: newAdmin.email }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating admin",
      error: error.message
    });
  }
};

// Get all admins
const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find({}, '-password');
    res.status(200).json({
      success: true,
      count: admins.length,
      data: admins
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching admins",
      error: error.message
    });
  }
};

// Check if admin exists
const checkAdmin = async (req, res) => {
  try {
    const { email } = req.params;
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found"
      });
    }
    res.status(200).json({
      success: true,
      data: { name: admin.name, email: admin.email, password: admin.password }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error checking admin",
      error: error.message
    });
  }
};

module.exports = {
  getDashboardStats,
  getAllUsers,
  deleteUser,
  updateOrderStatus,
  deleteOrder,
  createAdmin,
  getAllAdmins,
  checkAdmin
};
