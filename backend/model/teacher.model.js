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
  college: {
    type: String,
  },
});

const teacherSchema = new mongoose.Schema({
  name:{
    type:String,
  },
  email: {
    type: String,
  },
  image: {
    type: String,
  },
  subjects: {
    type: [String],
  },
  country: {
    type: String,
  },
  description: String,
  designation:{
    type: String,
  },
  teachingExp:{
    type: Number,
    default: 0,
  },
  experience: {
    type: Number,
    default: 0,
  },
  workingHrs: {
    type: Number,
    default: 0,
  },
  degrees: String,
  address: String,
  fees: {
    type: Number,
    default: 0,
  },
  teachesOnline: {
    type: String,
    enum: ["Yes", "No"],
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Transgender"],
  },
  homeworkHelp: {
    type: String,
    enum: ["Yes", "No"],
  },
});

const Teacher = mongoose.model("Teacher", teacherSchema);

module.exports = { Teacher };
