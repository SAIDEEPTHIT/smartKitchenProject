import React, { useState } from "react";
import api from "../api";
import IngredientChipsInput from "../components/IngredientChipsInput";
import RecipeCard from "../components/RecipeCard";

const LeftoverSearch = () => {
  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const search = async () => {
    setLoading(true);
    try {
      const res = await api.get(
        `/recipes/search?ingredients=${ingredients.join(",")}`
      );
      setRecipes(res.data);
    } catch {
      alert("Search error");
    }
    setLoading(false);
  };

  return (
    <div className="page">
      <h2>Leftovers → Recipe</h2>

      <div className="panel">
        <IngredientChipsInput onChange={setIngredients} />
        <button className="btn btn-solid" onClick={search}>
          {loading ? "Searching…" : "Find Recipes"}
        </button>
      </div>

      <div className="cards-grid">
        {recipes.map((r) => (
          <RecipeCard key={r._id} recipe={r} showMatch />
        ))}
      </div>
    </div>
  );
};

export default LeftoverSearch;
