const mysqlConnection = require("../DB/dbConnection");

exports.getRecipeById = async (req, res, next, id) => {
  try {
    const recipe = await mysqlConnection.query(
      " select *  from all_recipes LEFT JOIN users ON users.user_id = all_recipes.user_id where recipe_id=?",
      [id]
    );

    if (recipe[0][0].length === 0) {
      const error = new Error("recipe not found");
      error.statusCode = 400;
      throw error;
    }

    req.recipe = recipe[0][0];
    next();
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getRecipe = (req, res) => {
  return res.status(200).json(req.recipe);
};
