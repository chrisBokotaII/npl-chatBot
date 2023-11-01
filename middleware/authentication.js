const jwt = require("jsonwebtoken");
require("dotenv").config();
const { Clients } = require("../models");
const authenticate = async (req, res, next) => {
  const header = req.headers.authorization;
  const token = header && header.split(" ")[1];
  console.log(token);
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const decode = jwt.verify(token, process.env.JWT_SECRET);
  console.log(decode.id);
  const user = await Clients.findOne({ where: { id: decode.id } });
  console.log(user);
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  req.currentUser = user;
  next();
};

exports.authenticate = authenticate;
