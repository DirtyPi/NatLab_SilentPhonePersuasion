// activeQuizRoutes.js
const express = require('express');
const activeQuizController = require('../controllers/activeQuizController');
const router = express.Router();

// POST /active-quizzes/:quizId/activate
router.post('/:quizId/activate', activeQuizController.activateQuiz);

// GET /active-quizzes/:activeQuizId
router.get('/:activeQuizId', activeQuizController.getActiveQuizById);
// GET /active-quizzes/:activeQuizId


// GET /active-quizzes
router.get('/', activeQuizController.getAllActiveQuizzes);

// DELETE /active-quizzes/:activeQuizId
router.delete('/:activeQuizId', activeQuizController.deleteActiveQuiz);

// sign in user with uniq game code
router.post('/signin/:code', activeQuizController.signInUser);

//register answer
router.post('/aq/:activeQuizId/p/:playerId/qq/:questionId/answer', activeQuizController.registerAnswer);

router.get('/quizid/:quizId', activeQuizController.getActiveQuizByQuizId);
// Add the new route to find active quiz by code
router.get('/code/:code', activeQuizController.getActiveQuizByCode);

router.post('/:activeQuizId/player/:playerId/score', activeQuizController.calculatePlayerScore);

router.put('/:activeQuizId/start-game', activeQuizController.startGame);
router.get('/:activeQuizId/players/username/:username/userid', activeQuizController.getUserIDByUsername);
module.exports = router;
