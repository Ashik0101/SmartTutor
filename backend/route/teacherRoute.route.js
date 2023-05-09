const express = require("express");
const { Teacher } = require("../model/teacher.model");
const { UserModel } = require("../model/user.model");

const teacherRoute = express.Router();

teacherRoute.post("/", async (req, res) => {
  const data = req.body;

  // let email = data.email
  try {
    // let user = await UserModel.findOne({email})
    // let teacher ={
    //   password:user.password,
    //   role:user.role,
    //   registered_on:user.registered_on,
    //   ...data
    // }
    // console.log(teacher)


    let addDetails = new Teacher(data);
    await addDetails.save();
    res.send({
      msg: "added successfully",
      addDetails,
    });
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
    res.send("ji");
  }
});

teacherRoute.patch("/update", async (req, res) => {
  try {
    const data = req.body;
    const id = res.cookie("userId");

    await Teacher.findByIdAndUpdate({ _id: id }, data);

    res.status(200).send({ ok: true, msg: "Profile Updated" });
  } catch (err) {
    res.status(500).send({
      msg: "Something went Wrong!",
    });
  }
});

teacherRoute.get("/one/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let data = await Teacher.find({ _id: id });
    res.status(200).send({
      data: data,
    });
  } catch (err) {
    res.status(404).send({
      msg: "Tutor Not Found!",
    });
  }
});


teacherRoute.delete('/remove/:id',async(req,res)=>{
  try{
      let id = req.params.id;
      await Teacher.findByIdAndDelete({_id:id});
      res.send(await Teacher.find());
  }catch(err){
      res.send(err)
  }
})

module.exports = { teacherRoute };
