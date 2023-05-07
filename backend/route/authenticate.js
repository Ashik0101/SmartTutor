const jwt = require("jsonwebtoken");
require("dotenv").config();
const authenticate = (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1];
  if (token) {
    const decoded = jwt.verify(token, process.env.secret_key);
    if (decoded) {
      req.body.userEmail = decoded.userEmail;
      next();
    } else {
      res.send("Please login first!!!");
    }
  } else {
    res.send("Please login first!!!");
  }
};

module.exports = { authenticate };
