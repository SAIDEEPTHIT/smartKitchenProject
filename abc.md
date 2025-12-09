smart-kitchen-app/
│
├── backend/
│   ├── server.js
│   ├── config/
│   │   └── db.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Recipe.js
│   │   ├── PantryItem.js
│   │   └── Favorite.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── recipes.js
│   │   ├── pantry.js
│   │   └── favorites.js
│   ├── sample/
│   │   └── seedRecipes.js
│   └── .env
│
└── frontend/
    ├── public/
    │   └── index.html
    └── src/
        ├── App.js
        ├── index.js
        ├── api.js
        ├── components/
        │   ├── Navbar.js
        │   ├── RecipeCard.js
        │   ├── ProtectedRoute.js
        ├── pages/
        │   ├── Home.js
        │   ├── Login.js
        │   ├── Register.js
        │   ├── LeftoverSearch.js
        │   ├── Recipes.js
        │   ├── RecipeDetails.js
        │   ├── Pantry.js
        │   ├── GroceryList.js
        │   └── Favorites.js
        └── styles/
            └── styles.css


frontend/
│── public/
│   └── index.html
│
│── src/
│   ├── api/
│   │    └── axiosConfig.js
│   │
│   ├── components/
│   │    ├── Navbar.js
│   │    ├── ProtectedRoute.js
│   │    └── RecipeCard.js
│   │
│   ├── context/
│   │    └── AuthContext.js
│   │
│   ├── pages/
│   │   ├── Home.js
│   │   ├── Login.js
│   │   ├── Register.js
│   │   ├── LeftoverToRecipe.js
│   │   ├── RecipeExplorer.js
│   │   ├── RecipeDetails.js
│   │   ├── Pantry.js
│   │   └── Favorites.js
│   │
│   ├── App.js
│   ├── index.js
│   └── App.css
│
└── package.json

