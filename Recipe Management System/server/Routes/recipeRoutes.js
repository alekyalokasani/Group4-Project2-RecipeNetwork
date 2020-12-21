const express = require("express");

const {
  getRecipeById,
  getRecipe,
} = require("../Controllers/recipeControllers");

const router = express.Router();
router.param("recipeId", getRecipeById);
router.get("/:recipeId", getRecipe);

module.exports = router;
