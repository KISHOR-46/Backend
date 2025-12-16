const express = require("express");
const router = express.Router();
const { getAllProducts, getProductsByCategory, getProductById, createProduct, updateProduct, deleteProduct } = require("../controllers/productController");

router.get("/", getAllProducts);
router.post("/", createProduct);
router.get("/category/:category", getProductsByCategory);
router.get("/:id", getProductById);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
