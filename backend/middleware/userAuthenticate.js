const jwt = require("jsonwebtoken");
require("dotenv").config();
const userAuthenticate = (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1];
  if (token) {
    const decoded = jwt.verify(token, process.env.secret_key);
    if (decoded) {
      req.body.studentEmail = decoded.userEmail;
      next();
    } else {
      res.send({ msg: "Please login first!!!" });
    }
  } else {
    res.send({ msg: "Please login first!!!" });
  }
};

module.exports = { userAuthenticate };
