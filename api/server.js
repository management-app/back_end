const express = require("express");
const cors = require("cors");

const handleError = require("./middleware/error_handling");
const authRouter = require("./routes/auth/auth-router");
const userRouter = require("./routes/users/user-router");

const server = express();
server.use(express.json());
server.use(cors());

server.use("/auth", authRouter);
server.use("/user", userRouter);

server.use(function (req, res, next) {
  next(createError(404));
});

server.use(handleError);

module.exports = server;
