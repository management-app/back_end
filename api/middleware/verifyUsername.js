const User = require("../routes/users/user-model");

const verifyUsername = async (req, res, next) => {
  const user = await User.findBy("user_email", req.body.user_email);
  if (!user) {
    next();
  } else {
    next({ status: 402, message: "Username Taken" });
  }
};

module.exports = {
  verifyUsername,
};
