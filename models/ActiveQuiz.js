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
  startTime: {
    type: Date,
    default: () => new Date(Date.now() + 60000), // Set the default start time to 60 seconds from the current date and time
  },
  players: [PlayerSchema],
});

// const ActiveQuizSchema = new Schema({
//   quiz: {
//     type: Schema.Types.ObjectId,
//     ref: 'Quiz',
//     required: true,
//   },
//   code: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   gameStarted: {
//     type: Boolean,
//     required: true,
//     default: false,
//   },
//   players: [PlayerSchema],
// });

module.exports = mongoose.model('ActiveQuiz', ActiveQuizSchema);


