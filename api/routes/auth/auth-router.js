const router = require("express").Router();
require("dotenv").config();
const bcrypt = require("bcrypt");
const User = require("../users/user-model");
const { validateCredentials, generateToken } = require("./auth_Middleware");
const { verifyUsername } = require("../../middleware/verifyUsername");

router.post("/register", verifyUsername, async (req, res, next) => {
  const hashedPassword = await bcrypt.hash(
    req.body.user_password,
    parseInt(process.env.BCRYPT_ROUNDS)
  );
  const user = {
    user_email: req.body.user_email,
    user_password: hashedPassword,
  };

  User.registerUser(user)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch(next);
});

router.post("/login", validateCredentials, async (req, res, next) => {
  const user = { email: req.body.user_email };
  const accessToken = generateToken(user);
  res.status(201).json({ accessToken, message: "Log in successful" });
});

module.exports = router;
