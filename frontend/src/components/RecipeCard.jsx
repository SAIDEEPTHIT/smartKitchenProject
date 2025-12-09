import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api";

const RecipeCard = ({ recipe }) => {
  const { user } = useAuth();

  const addToFavorites = async () => {
    if (!user) {
      alert("Please login to save favorites.");
      return;
    }

    try {
      await api.post("/favorites", { recipeId: recipe._id });
      alert("Added to Favorites ❤️");
    } catch (err) {
      console.error(err?.response?.data || err);
      alert("Could not add to favorites.");
    }
  };

  return (
    <div className="recipe-card">
      <img
        src={recipe.imageUrl}
        alt={recipe.name}
        className="recipe-img"
        onError={(e) => {
          e.target.src =
            "https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=800&q=60";
        }}
      />

      <div className="recipe-body">
        <h3>{recipe.name}</h3>
        <p className="recipe-meta">{recipe.cookingTime || " "}</p>

        <div className="recipe-card-buttons">
          <Link to={`/recipe/${recipe._id}`} className="btn btn-small btn-solid">
            View Recipe
          </Link>

          <button
            type="button"
            className="btn btn-small btn-outline"
            onClick={addToFavorites}
          >
            ❤️ Favorite
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
