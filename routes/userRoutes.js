const express = require("express");
const { userController } = require("../controllers/userControllers");
const Router = express.Router();

Router.post("/login", userController.login);
Router.post("/register", userController.createUser);

exports.userRouter = Router;
