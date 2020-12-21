const bcrypt = require("bcrypt");
const expressJwt = require("express-jwt");
const { check, validationResult } = require("express-validator");
const nodemailer = require("nodemailer");
const sendGrid = require("nodemailer-sendgrid-transport");

const mysqlConnection = require("../DB/dbConnection");
const generateToken = require("../Utils/tokenGeneration");

const transport = nodemailer.createTransport(
  sendGrid({
    auth: {
      api_key: process.env.SENDGRID_API,
    },
  })
);

exports.register = async (req, res, next) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array()[0].msg });
  }
  let { name, email, password } = req.body;
  try {
    // first check user exists or not
    let userexists = await mysqlConnection.query(
      `select * from users where email='${req.body.email}'`
      // ,
      // [email]
    );

    if (userexists[0].length !== 0) {
      errors = new Error("User already registered");
      errors.statusCode = 400;
      throw errors;
    }

    // encrypt the password
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);

    let newUser = await mysqlConnection.query(
      `INSERT INTO users(name, email,password) values('${req.body.name}', '${req.body.email}' ,'${req.body.password}') ;  select * from users where email='${req.body.email}' `
    );

    if (newUser[0][0].affectedRows !== 1) {
      errors = new Error("User registration failed");
      errors.statusCode = 400;
      throw errors;
    }

    res.status(200).json(newUser[0][1]);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.login = async (req, res, next) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array()[0].msg });
  }
  const { email, password } = req.body;

  try {
    let userexists = await mysqlConnection.query(
      `select * from users where email='${req.body.email}'`
    );

    if (userexists[0].length === 0) {
      errors = new Error("User not found, please register first");
      errors.statusCode = 400;
      throw errors;
    }

    let checkpassword = await bcrypt.compare(
      password,
      userexists[0][0].password
    );

    if (!checkpassword) {
      errors = new Error("email or password incorrect");
      errors.statusCode = 400;
      throw errors;
    }

    userexists[0][0].password = undefined;
    const newLogin = await mysqlConnection.query(
      `insert into login_history(user_id) values(${userexists[0][0].user_id})`
    );

    res.status(200).json({
      data: userexists[0][0],
      token: generateToken(userexists[0][0].user_id),
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.isSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  userProperty: "auth",
});

exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile.user_id == req.auth.id;
  if (!checker) {
    return res.status(400).json({
      error: "ACCESS DENIED!",
    });
  }

  next();
};
