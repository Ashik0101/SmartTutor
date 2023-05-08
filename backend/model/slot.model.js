const mongoose = require("mongoose");

const slotSchema = mongoose.Schema({
  userEmail: {
    type: String,
    required: true,
  },
  dateMonthName: { type: String },
  slot_timing: [String],
  isBooked: { type: Boolean, default: false },
  studentEmail: { type: String, default: null },
});

const SlotModel = mongoose.model("slots", slotSchema);
module.exports = { SlotModel };
