const mongoose = require('mongoose');
const { Schema } = mongoose;

const AnswerSchema = new Schema({
  questionId: {
    type: Schema.Types.ObjectId,
    ref: 'Question',
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const PlayerSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    default: 0,
  },
  answers: [AnswerSchema], // Array of player answers
});

const ActiveQuizSchema = new Schema({
  quiz: {
    type: Schema.Types.ObjectId,
    ref: 'Quiz',
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  gameStarted: {
    type: Boolean,
    required: true,
    default: false,
  },
  players: [PlayerSchema],
});

module.exports = mongoose.model('ActiveQuiz', ActiveQuizSchema);


