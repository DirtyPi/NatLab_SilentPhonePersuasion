const mongoose = require('mongoose');
const { Schema } = mongoose;

const QuizSchema = new Schema({
  name: {
    type: String,
    required: 'Quiz name cannot be blank'
  },
  questions: [{
    question: String,
    answers: {
      a: String,
      b: String,
      c: String,
      d: String,
    },
    correct: String
  }]
}, { collection: 'quiz' });

module.exports = mongoose.model('Quiz', QuizSchema);
