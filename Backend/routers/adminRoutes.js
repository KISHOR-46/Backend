const express = require("express");
const router = express.Router();
const {
  getDashboardStats,
  getAllUsers,
  deleteUser,
  updateOrderStatus,
  deleteOrder,
  createAdmin,
  getAllAdmins,
  checkAdmin
} = require("../controllers/adminController");

router.get("/dashboard", getDashboardStats);
router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);
router.put("/orders/:id", updateOrderStatus);
router.delete("/orders/:id", deleteOrder);
router.post("/create-admin", createAdmin);
router.get("/admins", getAllAdmins);
router.get("/check-admin/:email", checkAdmin);

module.exports = router;
