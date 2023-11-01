const express = require("express");
const { authenticate } = require("../middleware/authentication");
const { chatControllers } = require("../controllers/chatControllers");
const e = require("express");

const Router = express.Router();

Router.post("/", authenticate, chatControllers.createChat);

exports.chatRouter = Router;
