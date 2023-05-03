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
  image:{
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
  },
  teachesOnline:{
    type: String,
    enum: ["Yes", "No"],
  },
  gender:{
    type: String,
    enum: ["Male","Female","Transgender"],
  },
  homeworkHelp:{
    type: String,
    enum: ["Yes","No"],
  }

});

const Teacher = mongoose.model("Teacher", teacherSchema);

module.exports = { Teacher };
