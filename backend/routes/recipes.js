const express = require("express");
const Recipe = require("../models/Recipe");
const auth = require("../middleware/auth");

const router = express.Router();

// Get all recipes
router.get("/", async (req, res) => {
  const recipes = await Recipe.find({});
  res.json(recipes);
});

// Leftover to Recipe search
router.get("/search", async (req, res) => {
  const ingredients = req.query.ingredients?.split(",") || [];

  const recipes = await Recipe.find({
    ingredients: { $all: ingredients.map(i => i.trim().toLowerCase()) }
  });

  res.json(recipes);
});

// Get single recipe
router.get("/:id", async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  res.json(recipe);
});

module.exports = router;
