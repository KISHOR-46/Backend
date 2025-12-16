const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  img: { type: String, required: true },
  desc: { type: String, required: true },
  price: { type: String, required: true },
  category: { type: String, required: true }
}, {
  timestamps: true
});

module.exports = mongoose.model("Product", productSchema);
