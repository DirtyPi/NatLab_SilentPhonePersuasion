const quizDAL = require('../dal/quizDAL');
// const activeQuizDAL = require('../dal/activeQuizDAL');

async function getAllQuizzes() {
  return quizDAL.getAllQuizzes();
}

async function createQuiz(quizData) {
  return quizDAL.createQuiz(quizData);
}

async function getQuizById(quizId) {
  return quizDAL.getQuizById(quizId);
}


async function updateQuiz(quizId, updatedData) {
  return quizDAL.updateQuiz(quizId, updatedData);
}

async function deleteQuiz(quizId) {
  return quizDAL.deleteQuiz(quizId);
}
async function findQuestionById(quizId, questionId) {
  return quizDAL.findQuestionById(quizId, questionId);
}

module.exports = {
  getAllQuizzes,
  createQuiz,
  getQuizById,
  updateQuiz,
  deleteQuiz,
  findQuestionById,
};
