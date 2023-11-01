const { encrypt } = require("../helpers/encrpyt");
const { Clients } = require("../models");

class userController {
  static async createUser(req, res) {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        return res.status(400).json({ message: "Please enter all fields" });
      }
      const hashpass = await encrypt.encryptPassword(password);
      console.log(hashpass);
      const user = await Clients.create({ name, email, password: hashpass });
      const token = encrypt.generateToken({ id: user.id });

      res.status(201).json({
        message: "User created successfully",
        user,
        token,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  static login(req, res) {
    const { email, password } = req.body;
    const user = Clients.findOne({ where: { email } });
    const comparePassword = encrypt.comparePassword(password, user.password);
    if (!user || !comparePassword) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = encrypt.generateToken({ id: user.id });

    return res.status(200).json({ message: "login success", token });
  }
}

exports.userController = userController;
