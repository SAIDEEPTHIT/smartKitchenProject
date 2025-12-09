const mongoose = require("mongoose");

const PantryItemSchema = new mongoose.Schema({
  userId: String,
  name: String,
  quantity: String,
  expiry: String
});

module.exports = mongoose.model("PantryItem", PantryItemSchema);
