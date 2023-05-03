const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  level: {
    type: String,
    enum: ["Beginner", "Intermediate"],
  },
});

const degreeSchema = mongoose.Schema({
  name: String,
  college : {
    type : String
  }
});

const teacherSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  subjects: {
    type: [subjectSchema],
  },
  description: String,
  experience: {
    type: Number,
    default: 0,
  },
  degrees: [degreeSchema],
  address : String,
  fees : {
    type : Number,
    default : 0
  }
  // If required
});

const Teacher = mongoose.model("Teacher", teacherSchema);

module.exports = { Teacher };
