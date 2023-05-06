const mongoose = require("mongoose");

const slotOnAParticularDateSchema = mongoose.Schema({
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  day: { type: String, required: true },
  date: { type: Number, required: true },
  month: { type: String, required: true },
  year: { type: Number, required: true },
  isBooked: { type: Boolean, default: false },
});

const slotSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  slotOnAParticularDate: {
    type: [slotOnAParticularDateSchema],
  },
});

const SlotModel = mongoose.model("slots", slotSchema);
module.exports = { SlotModel };
