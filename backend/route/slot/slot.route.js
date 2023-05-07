const express = require("express");

const { SlotModel } = require("../../model/slot.model");
const slotRoute = express.Router();
const { authenticate } = require("../authenticate");

/*creating the slot here */
slotRoute.post("/create", authenticate, async (req, res) => {
  const { userEmail, dateMonthName, slot_timing, isBooked } = req.body;
  try {
    const slot = new SlotModel({
      userEmail,
      dateMonthName,
      slot_timing,
      isBooked,
    });
    await slot.save();
    res.send({
      msg: `Slot Created for ${dateMonthName}, from ${slot_timing[0]} to ${slot_timing[1]} ! `,
    });
    console.log(slot);
  } catch (error) {
    res.send({ msg: "Some Error in creating the slot", error: error.message });
    console.log(`Some Error in creating the slot : ${error}`);
  }
});

/* Get the slots of a particular tutor here */
slotRoute.get("/one-tutor/all", authenticate, async (req, res) => {
  const userEmail = req.body.userEmail;
  try {
    const slots = await SlotModel.find({ userEmail: userEmail });
    return res.send(slots);
  } catch (error) {
    res.send({
      msg: "Some Error in getting the slot",
      error: error.message,
    });
    console.log(`Some Error in getting all the slot : ${error}`);
  }
});

/* Get one slot of a particular tutor here */
slotRoute.get("/one-tutor/one/:id", authenticate, async (req, res) => {
  const userEmail = req.body.userEmail;
  const slotId = req.params.id;
  try {
    const data = await SlotModel.findOne({ _id: slotId });
    if (!data) {
      return res.send({ msg: `No Slot Available for id ${slotId}` });
    }
    if (data.userEmail !== userEmail) {
      return res.send({ msg: "You are not authorized !" });
    }
    return res.send(data);
  } catch (error) {
    res.send({
      msg: "Some Error in getting the slot",
      error: error.message,
    });
    console.log(`Some Error in getting all the slot : ${error}`);
  }
});

/* Deleting the slots here */
slotRoute.delete("/delete/:id", authenticate, async (req, res) => {
  const slotId = req.params.id;
  const userEmail = req.body.userEmail;
  try {
    const data = await SlotModel.findOne({ _id: slotId });
    if (!data) {
      return res.send({ msg: "No Slots Available with this ID" });
    }
    if (data.userEmail !== userEmail) {
      return res.send({ msg: "You are not authorized to delete this slot !" });
    }
    const deletedSlot = await SlotModel.findByIdAndDelete({ _id: slotId });
    res.status(200).send({
      msg: `Slot deleted !!`,
      deletedSlot: {
        dateMonthName: deletedSlot.dateMonthName,
        slot_timing: deletedSlot.slot_timing,
      },
    });
  } catch (error) {
    res.status(500).send({
      msg: "Something went Wrong !",
    });
    console.log("some error while deleting the slot :", error);
  }
});

/* Updating the slots here */
slotRoute.patch("/update/:id", authenticate, async (req, res) => {
  const slotId = req.params.id;
  const userEmail = req.body.userEmail;
  let obj = {};

  if (!req.body.dateMonthName && !req.body.slot_timing) {
    return res.send({ msg: "Please privide required fields" });
  }
  if (req.body.dateMonthName) {
    obj.dateMonthName = req.body.dateMonthName;
  }
  if (req.body.slot_timing) {
    obj.slot_timing = req.body.slot_timing;
  }
  try {
    const data = await SlotModel.findOne({ _id: slotId });
    if (!data) {
      return res.send({ msg: "No Slots Available with this ID" });
    }
    if (data.userEmail !== userEmail) {
      return res.send({ msg: "You are not authorized to update this slot !" });
    }
    const updatedSlot = await SlotModel.findByIdAndUpdate({ _id: slotId }, obj);
    res.status(200).send({
      msg: `Slot Updated !!`,
      updatedSlot: {
        dateMonthName: req.body.dateMonthName,
        slot_timing: req.body.slot_timing,
      },
    });
  } catch (error) {
    res.status(500).send({
      msg: "Something went Wrong !",
    });
    console.log("some error while updating the slot :", error);
  }
});

/*get All the the slot here without authenctication(will be useful for admin) */
slotRoute.get("/get-all", async (req, res) => {
  try {
    const slots = await SlotModel.find();
    res.send(slots);
  } catch (error) {
    res.send({
      msg: "Some Error in getting all the slot",
      error: error.message,
    });
    console.log(`Some Error in getting all the slot : ${error}`);
  }
});
module.exports = { slotRoute };
