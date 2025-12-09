import React, { useEffect, useState } from "react";
import api from "../api";
import RecipeCard from "../components/RecipeCard";

const RecipeExplorer = () => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    api.get("/recipes").then((res) => setRecipes(res.data));
  }, []);

  const filtered = recipes.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page">
      <h2>Recipe Explorer</h2>
      <input
        className="search-bar"
        placeholder="Search recipes…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="cards-grid">
        {filtered.map((r) => (
          <RecipeCard key={r._id} recipe={r} />
        ))}
      </div>
    </div>
  );
};

export default RecipeExplorer;
