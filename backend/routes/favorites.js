// backend/routes/favorites.js
const express = require("express");
const auth = require("../middleware/auth");
const Favorite = require("../models/Favorite");
const Recipe = require("../models/Recipe");

const router = express.Router();

// GET /api/favorites - list current user's favorites (with recipe data)
router.get("/", auth, async (req, res) => {
  try {
    const favs = await Favorite.find({ userId: req.user.id }).populate("recipeId");

    const recipes = favs
      .filter((f) => f.recipeId) // ignore broken refs
      .map((f) => ({
        _id: f.recipeId._id,
        name: f.recipeId.name,
        imageUrl: f.recipeId.imageUrl,
        cookingTime: f.recipeId.cookingTime,
        ingredients: f.recipeId.ingredients,
      }));

    res.json(recipes);
  } catch (err) {
    console.error("Favorites GET error:", err);
    res.status(500).json({ message: "Could not load favorites" });
  }
});

// POST /api/favorites - add favorite
router.post("/", auth, async (req, res) => {
  try {
    const { recipeId } = req.body;
    if (!recipeId) {
      return res.status(400).json({ message: "recipeId is required" });
    }

    // avoid duplicates
    const existing = await Favorite.findOne({
      userId: req.user.id,
      recipeId,
    });
    if (existing) {
      return res.status(200).json({ message: "Already in favorites" });
    }

    const fav = await Favorite.create({
      userId: req.user.id,
      recipeId,
    });

    res.status(201).json({ message: "Added to favorites", id: fav._id });
  } catch (err) {
    console.error("Favorites POST error:", err);
    res.status(500).json({ message: "Could not add to favorites" });
  }
});

// DELETE /api/favorites/:id - remove favorite by recipe id
router.delete("/:id", auth, async (req, res) => {
  try {
    const recipeId = req.params.id;
    await Favorite.deleteOne({ userId: req.user.id, recipeId });
    res.json({ message: "Removed from favorites" });
  } catch (err) {
    console.error("Favorites DELETE error:", err);
    res.status(500).json({ message: "Could not remove favorite" });
  }
});

module.exports = router;
