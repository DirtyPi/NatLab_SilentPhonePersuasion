const Quiz = require('../models/Quiz');

function getAllQuizzes() {
  return Quiz.find({}).exec();
}

function createQuiz(quizData) {
  const quiz = new Quiz(quizData);
  return quiz.save();
}

function getQuizById(quizId) {
  return Quiz.findById(quizId).exec();
}

function updateQuiz(quizId, updatedData) {
  return Quiz.findByIdAndUpdate(quizId, updatedData, { new: true }).exec();
}

function deleteQuiz(quizId) {
  return Quiz.findByIdAndDelete(quizId).exec();
}
async function findQuestionById(quizId, questionId) {
  const quiz = await Quiz.findById(quizId).exec();
  if (!quiz) {
    throw new Error('Quiz not found');
  }

  const question = quiz.questions.find(q => q._id.toString() === questionId);
  if (!question) {
    throw new Error('Question not found');
  }

  return question;
}

module.exports = {
  getAllQuizzes,
  createQuiz,
  getQuizById,
  updateQuiz,
  deleteQuiz,
  findQuestionById,
};
