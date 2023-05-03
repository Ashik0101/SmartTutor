const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  name: {
    type: String
  },
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate']
  },
});

const teacherSchema = new mongoose.Schema({
  email: {
    type: String
  },
  subjects: {
    type: [subjectSchema]
  },
  description: String,
  
});

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = {Teacher};
