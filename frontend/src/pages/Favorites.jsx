import React, { useEffect, useState } from "react";
import api from "../api";
import RecipeCard from "../components/RecipeCard";
import { useAuth } from "../context/AuthContext";

const Favorites = () => {
  const { user } = useAuth();
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      const res = await api.get("/favorites");
      setRecipes(res.data);
      setError("");
    } catch (err) {
      // 401 means not logged in or token missing
      if (err?.response?.status === 401) {
        setError("Please login to view favorites.");
      } else {
        setError("Could not load favorites.");
      }
    }
  };

  useEffect(() => {
    if (user) {
      load();
    } else {
      setRecipes([]);
      setError("Please login to view favorites.");
    }
  }, [user]);

  if (!user) {
    return (
      <div className="page">
        <h2>Favorites</h2>
        <p className="muted">Please login to view favorites.</p>
      </div>
    );
  }

  return (
    <div className="page">
      <h2>Your Favorites</h2>

      {error && <p className="muted">{error}</p>}

      <div className="cards-grid">
        {recipes.map((r) => (
          <RecipeCard key={r._id} recipe={r} />
        ))}
        {recipes.length === 0 && !error && (
          <p className="muted">No favorites yet. Open a recipe and save it.</p>
        )}
      </div>
    </div>
  );
};

export default Favorites;
