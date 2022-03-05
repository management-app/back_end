const router = require("express").Router();
const User = require("./user-model");

router.get("/", (req, res, next) => {
  User.getAll()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch(next);
});

module.exports = router;
