const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { sequelize } = require("./models");
const { userRouter } = require("./routes/userRoutes");
const { chatRouter } = require("./routes/chatRouter");
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/auth", userRouter);
app.use("/chat", chatRouter);

app.use("*", (req, res) => {
  res.status(404).json({ message: "Not found" });
});

class dbConnect {
  static async connect() {
    try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }
}

app.listen(port, async () => {
  await dbConnect.connect();
  console.log(`app listening at http://localhost:${port}`);
});
