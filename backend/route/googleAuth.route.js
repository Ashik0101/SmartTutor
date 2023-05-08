const express = require("express");
const googleRouter = express();
const passport = require("../configs/googleAuth");
const { UserModel } = require("../model/user.model");
const cors = require("cors");
googleRouter.use(cors());

// googleRouter.use(express.json())

googleRouter.get("/googleerr", (req, res) => {
  res.status(400).json({
    error: "Something went wrong in Google",
    success: false,
  });
});

googleRouter.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

googleRouter.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/googleerr",
    session: false,
  }),
  async function (req, res) {
    try {
      if (!req.user) {
        return res.status(400).json({
          error: "google valid error",
          success: false,
        });
      }

      console.log(req.user._json);

      //  let Id ;
      let email = req.user._json.email;
      let name = req.user._json.name;
      let userExists = await UserModel.findOne({ email });
      if (userExists) {
        console.log("user exists");
        //  Id = userExists._id;
        res.redirect("http://127.0.0.1:5501/frontend/signup.html");
      } else {
        let newUser = new UserModel({
          name,
          email,
          password: "random",
          registered_on: Date.now(),
        });
        let data = await newUser.save();
        //  Id = data._id
        console.log(data);
        res.redirect("http://127.0.0.1:5501/frontend/index.html");
      }

      //  res.send("welcome to smartTutor")
    } catch (err) {
      console.log(err);
    }
  }
);
// googleRouter.listen(9090,()=>{
//     console.log("server running")
// })

module.exports = { googleRouter };
