const express = require("express");

const {
  getCompleteRecipes,
  createRecipe,
  getUserRecipes,
  deleteARecipe,
} = require("../Controllers/recipesControllers");

const { getRecipeById } = require("../Controllers/recipeControllers");
const { getUserById } = require("../Controllers/userControllers");
const router = express.Router();

router.param("userId", getUserById);
router.param("recipeId", getRecipeById);
router.get("/allrecipes", getCompleteRecipes);
router.get("/getuserrecipes/:userId", getUserRecipes);
router.post("/newrecipe/:userId", createRecipe);
router.delete("/deleteRecipe/:recipeId", deleteARecipe);

module.exports = router;
