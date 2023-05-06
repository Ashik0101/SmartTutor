const express = require("express");
const { SlotModel } = require("../../model/slot.model");
const slotRoute = express.Router();

/*creating the slot here */
slotRoute.post("/create", async (req, res) => {
  const { email, day, date, month, year, startTime, endTime } = req.body;
  try {
    const slot = new SlotModel({
      email,
      day,
      date,
      month,
      year,
      startTime,
      endTime,
    });
    await slot.save();
    res.send({ msg: `Slot Created for ${day},${date} ${month}, ${year} ! ` });
    console.log(slot);
  } catch (error) {
    res.send({ msg: "Some Error in creating the slot", error: error.message });
    console.log(`Some Error in creating the slot : ${error}`);
  }
});

/*get the slot here */
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
