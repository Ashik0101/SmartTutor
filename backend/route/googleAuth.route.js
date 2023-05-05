const express = require("express")
const googleRouter = express()
const passport = require("../configs/googleAuth")
const cors = require('cors');
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
       console.log(req.user)
       
       res.send("welcome to smartTutor")
    }
    catch(err){
        console.log(err)
    }
}
  )
// googleRouter.listen(9090,()=>{
//     console.log("server running")
// })

module.exports={googleRouter}