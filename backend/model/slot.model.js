const mongoose = require("mongoose");

const slotSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  dateMonthName: { type: String },
  slot_timing: [String],
  isBooked: { type: Boolean, default: false },
});

const SlotModel = mongoose.model("slots", slotSchema);
module.exports = { SlotModel };
