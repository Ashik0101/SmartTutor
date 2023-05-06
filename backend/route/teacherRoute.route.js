const express = require("express");
const { Teacher } = require("../model/teacher.model");

const teacherRoute = express.Router();

teacherRoute.post("/", async (req, res) => {
  const data = req.body;
  try {
    let addDetails = new Teacher(data);
    await addDetails.save();
    res.send(addDetails);
  } catch (err) {
    res.status(500).send({
      msg: "Something went Wrong!",
    });
  
  }
});

teacherRoute.get("/find", async (req, res) => {
  const email = req.body;
  try {
    let user = await Teacher.findOne(email);
    if (!user) {
      res.send("No one");
    }
    res.send(user);
  } catch (err) {
    res.status(500).send({
      msg: "Something went Wrong!",
    });
  }
});

teacherRoute.get("/all", async (req, res) => {
  try {
    let user = await Teacher.find();
    res.send(user);
  } catch (err) {
    // res.status(500).send({
    //   msg: "Something went Wrong!",
    // });
    res.send("ji")
  }
});

module.exports = { teacherRoute };
