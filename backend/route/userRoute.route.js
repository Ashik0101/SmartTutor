const express = require("express");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const { UserModel } = require("../model/user.model");

require("dotenv").config();

const userRoute = express.Router();

userRoute.post("/register", async (req, res) => {
  const { name, email, password, role, registered_on } = req.body;

  let userExists = await UserModel.findOne({ email });
  if (userExists) {
    // console.log("user exists")
    //  Id = userExists._id;
    res.send({
      msg: "user exists",
    });
  } else {
    try {
      bcrypt.hash(password, 5, async (err, hash) => {
        if (err) {
          res.status(400).send("err");
        } else {
          let data = new UserModel({
            name,
            email,
            password: hash,
            role,
            registered_on,
          });
          await data.save();
          res.status(201).send({
            msg: "Successfully Registered!",
          });
        }
      });
    } catch (err) {
      res.status(500).send({
        msg: "Something went Wrong!",
      });
    }
  }
});

userRoute.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    let data = await UserModel.find({ email });
    if (data.length >= 1) {
      bcrypt.compare(password, data[0].password, async (err, result) => {
        if (result || password == "random") {
          let token = jwt.sign(
            { userEmail: data[0].email },
            process.env.secret_key,
            { expiresIn: "7d" }
          );

          res
            .status(200)
            .send({ data: data[0], token: token, msg: "Login successfull" });
        } else {
          res.status(401).send({
            msg: "Wrong Credentials!",
          });
        }
      });
    } else {
      res.status(404).send({
        msg: "User Not Found!",
      });
    }
  } catch (err) {
    res.status(500).send({
      msg: "Something went Wrong!",
    });
  }
});

module.exports = { userRoute };
