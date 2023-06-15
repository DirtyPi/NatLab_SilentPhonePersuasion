const express = require('express');
const quizController = require('../controllers/QuizController');
const router = express.Router();

// GET /quizzes
router.get('/', quizController.listAllQuizzes);

// POST /quizzes
router.post('/', quizController.createAQuiz);

// GET /quizzes/:quizId
router.get('/:quizId', quizController.readAQuiz);

// POST /quizzes/:quizId
router.put('/:quizId', quizController.updateAQuiz);

// DELETE /quizzes/:quizId
router.delete('/:quizId', quizController.deleteAQuiz);

// // POST /quizzes/:quizId/activate
// router.post('/:quizId/activate', quizController.activateQuiz);

module.exports = router;
