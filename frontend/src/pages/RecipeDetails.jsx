import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [grocery, setGrocery] = useState(null);

  useEffect(() => {
    api.get(`/recipes/${id}`).then((res) => setRecipe(res.data));
  }, [id]);

  const generateList = async () => {
    try {
      const pantry = await api.get("/pantry");

      const have = [];
      const need = [];

      const pantryNames = pantry.data.map((i) =>
        i.name.toLowerCase().trim()
      );

      recipe.ingredients.forEach((ing) => {
        const i = ing.toLowerCase();
        if (pantryNames.some((p) => p.includes(i))) have.push(ing);
        else need.push(ing);
      });

      setGrocery({ have, need });
    } catch {
      alert("Login required");
    }
  };

  if (!recipe) return <p>Loading…</p>;

  return (
    <div className="page recipe-details-page">
      <img src={recipe.imageUrl} className="details-img" />

      <h2>{recipe.name}</h2>
      <h3>Ingredients:</h3>
      <ul>
        {recipe.ingredients.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
      <br></br>

      <h3>Instructions:</h3>
      <p>{recipe.instructions}</p>
      <br></br>

      <button className="btn btn-solid" onClick={generateList}>
        Generate Grocery List
      </button>

      {grocery && (
        <div className="grocery-card">
          <h3>Grocery List</h3>
          <p><u>You already have:</u></p>
          <ul>{grocery.have.map((i) => <li key={i}>{i}</li>)}</ul>

          <p><u>You need to buy:</u></p>
          <ul>{grocery.need.map((i) => <li key={i}>{i}</li>)}</ul>
        </div>
      )}
    </div>
  );
};

export default RecipeDetails;
