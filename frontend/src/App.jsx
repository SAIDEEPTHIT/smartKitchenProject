import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import LeftoverSearch from "./pages/LeftoverSearch.jsx";
import RecipeExplorer from "./pages/RecipeExplorer.jsx";
import RecipeDetails from "./pages/RecipeDetails.jsx";
import Pantry from "./pages/Pantry.jsx";
import Favorites from "./pages/Favorites.jsx";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* main app pages */}
          <Route path="/leftovers" element={<LeftoverSearch />} />
          <Route path="/recipes" element={<RecipeExplorer />} />
          {/* DETAIL ROUTE – singular /recipe/:id */}
          <Route path="/recipe/:id" element={<RecipeDetails />} />

          <Route path="/pantry" element={<Pantry />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
