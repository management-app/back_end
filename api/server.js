const express = require("express");
const cors = require("cors");
const authRouter = require("./routes/auth/auth-router");

const server = express();
server.use(express.json());
server.use(cors());

server.use("/auth", authRouter);

module.exports = server;
