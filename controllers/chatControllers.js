const manager = require("../train-model");
const { Chats, Clients } = require("../models");

class chatControllers {
  static async createChat(req, res) {
    const { question } = req.body;
    const { id } = req.currentUser;
    await manager.train();
    manager.save();
    let respone = await manager.process("en", question);
    await Chats.create({
      question: question,
      answer: respone.answer,
      client_id: id,
    });
    const chats = await Chats.findAll({
      where: { client_id: id },
      include: [
        {
          model: Clients,
          attributes: ["name", "email"],
        },
      ],
    });
    return res.status(201).json(chats);
  }
}
exports.chatControllers = chatControllers;
