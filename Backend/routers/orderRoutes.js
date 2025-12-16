const express = require("express");
const router = express.Router();
const { createOrder, getAllOrders, getOrdersByEmail } = require("../controllers/orderController");

router.post("/", createOrder);
router.get("/", getAllOrders);
router.get("/user/:email", getOrdersByEmail);

module.exports = router;
