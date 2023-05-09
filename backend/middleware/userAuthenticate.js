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
      res.send({ msg: "Please login first, wrong token!!!" });
    }
  } else {
    res.send({ msg: "Please login first means need a token!!!" });
  }
};

module.exports = { userAuthenticate };
