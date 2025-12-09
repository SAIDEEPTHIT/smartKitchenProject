// backend/server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const authRoutes = require("./routes/auth");
const recipeRoutes = require("./routes/recipes");
const pantryRoutes = require("./routes/pantry");
const favoriteRoutes = require("./routes/favorites");

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: false }));
app.use(express.json());

// base path: /api
app.use("/api/auth", authRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/pantry", pantryRoutes);
app.use("/api/favorites", favoriteRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
});
