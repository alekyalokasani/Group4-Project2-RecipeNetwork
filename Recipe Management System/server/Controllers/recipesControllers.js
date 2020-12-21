const mysqlConnection = require("../DB/dbConnection");

exports.getCompleteRecipes = async (req, res, next) => {
  try {
    let all_recipes = await mysqlConnection.query(
      " select *  from all_recipes LEFT JOIN users ON users.user_id = all_recipes.user_id"
    );

    if (all_recipes[0][0].length === 0) {
      const error = new Error("Recipes not found");
      error.statusCode = 400;
      throw error;
    }

    res.status(200).json(all_recipes[0]);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.createRecipe = async (req, res, next) => {
  try {
    let newRecipe = await mysqlConnection.query(`insert into all_recipes(user_id, recipe_title, recipe_ingredients,
      recipe_description, recipe_type) values('${req.params.userId}','${req.body.recipe_title}','${req.body.recipe_ingredients}','${req.body.recipe_description}','${req.body.recipe_type}'); select * from all_recipes where recipe_title='${req.body.recipe_title}'`);

    if (newRecipe[0][0].affectedRows !== 1) {
      errors = new Error("Recipe creation failed");
      errors.statusCode = 400;
      throw errors;
    }

    res.status(200).json(newRecipe[0][1]);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getUserRecipes = async (req, res, next) => {
  try {
    let allrecipes = await mysqlConnection.query(
      `SELECT * FROM all_recipes where user_id=${req.params.userId}`
    );
    if (allrecipes[0].length === 0) {
      errors = new Error("No recipes found, please create some");
      errors.statusCode = 400;
      throw errors;
    }

    res.status(200).json(allrecipes[0]);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteARecipe = async (req, res, next) => {
  try {
    let deletedRecipe = await mysqlConnection.query(
      `delete from all_recipes where recipe_id='${req.params.recipeId}'`
    );

    if (deletedRecipe[0][0].affectedRows !== 1) {
      errors = new Error("recipe deletion failed");
      errors.statusCode = 400;
      throw errors;
    }

    res.status(200).json("deletion success");
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
