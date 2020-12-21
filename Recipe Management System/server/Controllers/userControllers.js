const bcrypt = require("bcrypt");
const mysqlConnection = require("../DB/dbConnection");

exports.getUserById = async (req, res, next, id) => {
  try {
    const user = await mysqlConnection.query(
      "select * from users where user_id=?",
      [id]
    );

    if (user[0][0].length === 0) {
      const error = new Error("User not found");
      error.statusCode = 400;
      throw error;
    }

    req.profile = user[0][0];
    next();
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getAUser = (req, res) => {
  return res.status(200).json(req.profile);
};

exports.resetPassword = async (req, res, next) => {
  let { password } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    let user = await mysqlConnection.query(
      "update users set password=? where user_id=?",
      [password, req.params.userId]
    );

    if (user[0].affectedRows !== 1) {
      errors = new Error("password reset failed");
      errors.statusCode = 400;
      throw errors;
    }
    res.status(200).json("updation success");
  } catch (err) {
    console.log(err);
  }
};
