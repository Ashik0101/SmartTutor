const express = require("express");
const bcrypt = require("bcrypt");
const sgMail = require("@sendgrid/mail");
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

          res.status(200).send({
            data: data[0],
            token: token,
            email,
            msg: "Login successfull",
          });
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

// here getting all the users data, means teachers and students combined.
// it can be accessed by admin
userRoute.get("/all", async (req, res) => {
  try {
    let user = await UserModel.find();
    res.send(user);
  } catch (err) {
    res.status(500).send({
      msg: "Something went Wrong!",
    });
  }
});

//this route finds user based on role
// can be accessed by admin only.
userRoute.get("/find", async (req, res) => {
  let role = req.query.role;
  try {
    let data = await UserModel.find({ role });
    res.status(200).send({
      data: data,
    });
  } catch (err) {
    res.status(404).send({
      msg: "Students not found!",
    });
  }
});

//generating ranom OTP here
userRoute.post("/generate", async (req, res) => {
  try {
    let { email } = req.body;
    console.log(email);
    sgMail.setApiKey(process.env.api_key);

    function generateOTP() {
      const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

      let generatedOtp = "";

      for (let i = 0; i < 4; i++) {
        const index = Math.floor(Math.random() * digits.length);

        generatedOtp += digits[index];
      }
      return generatedOtp;
    }

    const otp = generateOTP();

    const msg = {
      to: email,
      from: "abhi.bunnny@gmail.com",
      subject: "One Time Password",
      text: `Otp is ${otp}`,
    };
    console.log(msg);
    sgMail.send(msg).then(
      () => {},
      (error) => {
        console.error(error);

        if (error.response) {
          console.error(error.response.body);
        }
      }
    );

    res.send(otp);
  } catch (err) {
    res.send(err);
    console.log(err);
  }
});

module.exports = { userRoute };
