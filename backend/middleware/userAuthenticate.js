const jwt = require("jsonwebtoken");
require("dotenv").config();
const { UserModel } = require("../model/user.model");
const userAuthenticate = async (req, res, next) => {
  console.log("inside the userAuth bhai");
  const token = req.headers?.authorization?.split(" ")[1];
  // console.log("token is :", typeof token);
  if (!token) {
    // If token is not present, send a 401 Unauthorized response with a custom message
    return res.status(401).send({ msg: "Please Login First" });
  }

  try {
    const decoded = jwt.verify(token, process.env.secret_key);
    if (!decoded) {
      return res.send({ msg: "Please Login First" });
    }
    req.body.studentEmail = decoded.userEmail;
    console.log(decoded);

    const user = await UserModel.find({ email: decoded.userEmail });
    req.user = user[0];
    next();
  } catch (err) {
    // If token is invalid, send a 401 Unauthorized response with a custom message
    return res.status(401).send({ msg: "Invalid Token" });
  }
};

module.exports = { userAuthenticate };
