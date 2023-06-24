const quizService = require('../service/QuizService');

async function listAllQuizzes(req, res) {
  try {
    const quizzes = await quizService.getAllQuizzes();
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function createAQuiz(req, res) {
  try {
    const newQuiz = await quizService.createQuiz(req.body);
    res.json(newQuiz);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function readAQuiz(req, res) {
  try {
    const quiz = await quizService.getQuizById(req.params.quizId);
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateAQuiz(req, res) {
  try {
    const updatedQuiz = await quizService.updateQuiz(req.params.quizId, req.body);
    res.json(updatedQuiz);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteAQuiz(req, res) {
  try {
    await quizService.deleteQuiz(req.params.quizId);
    res.json({
      message: 'Quiz successfully deleted',
      _id: req.params.quizId
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// async function activateQuiz(req, res) {
//     try {
//       const quizId = req.params.quizId;
//       const activeQuiz = await quizService.activateQuiz(quizId);
//       res.json(activeQuiz);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   }

module.exports = {
  listAllQuizzes,
  createAQuiz,
  readAQuiz,
  updateAQuiz,
  deleteAQuiz,
  //activateQuiz,
};
