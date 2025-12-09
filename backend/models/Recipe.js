const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
  name: String,
  ingredients: [String],
  instructions: String,
  cookingTime: String,
  imageUrl: String,
  youtubeLink: String
});

module.exports = mongoose.model("Recipe", RecipeSchema);
