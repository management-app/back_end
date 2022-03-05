const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../users/user-model");
const bcrypt = require("bcrypt");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token === null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

const generateToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "600" });
};

const validateCredentials = async (req, res, next) => {
  const user = await User.findBy("user_email", req.body.user_email);
  if (
    user &&
    (await bcrypt.compare(req.body.user_password, user.user_password))
  ) {
    next();
  } else {
    res.status(401).json({ message: "Invalid Credentials" });
  }
};

module.exports = {
  authenticateToken,
  generateToken,
  validateCredentials,
};
