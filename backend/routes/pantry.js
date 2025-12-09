// backend/routes/pantry.js
const express = require("express");
const auth = require("../middleware/auth");
const PantryItem = require("../models/PantryItem");

const router = express.Router();

// GET /api/pantry - list items for current user
router.get("/", auth, async (req, res) => {
  try {
    const items = await PantryItem.find({ userId: req.user.id }).sort({ name: 1 });
    res.json(items);
  } catch (err) {
    console.error("Pantry GET error:", err);
    res.status(500).json({ message: "Could not load pantry" });
  }
});

// POST /api/pantry - add item
router.post("/", auth, async (req, res) => {
  try {
    const { name, quantity, expiryDate } = req.body;
    const item = await PantryItem.create({
      userId: req.user.id,
      name,
      quantity,
      expiryDate: expiryDate || null,
    });
    res.status(201).json(item);
  } catch (err) {
    console.error("Pantry POST error:", err);
    res.status(500).json({ message: "Could not add item" });
  }
});

// PUT /api/pantry/:id - update item  <<< IMPORTANT
router.put("/:id", auth, async (req, res) => {
  try {
    const { name, quantity, expiryDate } = req.body;

    const updated = await PantryItem.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { name, quantity, expiryDate: expiryDate || null },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json(updated);
  } catch (err) {
    console.error("Pantry PUT error:", err);
    res.status(500).json({ message: "Could not update item" });
  }
});

// DELETE /api/pantry/:id - remove item
router.delete("/:id", auth, async (req, res) => {
  try {
    await PantryItem.deleteOne({ _id: req.params.id, userId: req.user.id });
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error("Pantry DELETE error:", err);
    res.status(500).json({ message: "Could not delete item" });
  }
});

module.exports = router;
