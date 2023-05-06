const express = require("express");
const cors = require("cors");
const { connection } = require("./configs/connection");
const { userRoute } = require("./route/userRoute.route");
const { teacherRoute } = require("./route/teacherRoute.route");
const { googleRouter } = require("./route/googleAuth.route");
const { slotRoute } = require("./route/slot/slot.route");

require("dotenv").config();

const app = express();
app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to SkillSphere!");
});

app.use("/users", userRoute);
app.use("/teachers", teacherRoute);
app.use("/", googleRouter);
app.use("/slot", slotRoute);
app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Server is connected to the Database!");
  } catch (err) {
    console.log("Could not connect to the server..");
    console.log(err);
  }
  console.log(`Server is running at the port ${process.env.port}`);
});
