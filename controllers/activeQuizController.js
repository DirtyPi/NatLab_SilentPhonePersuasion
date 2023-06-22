const activeQuizService = require('../service/ActiveQuizServise');


async function activateQuiz(req, res) {
    try {
      const quizId = req.params.quizId;
      const activeQuiz = await activeQuizService.activateQuiz(quizId);
      res.json(activeQuiz);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

async function getActiveQuizById(req, res) {
  try {
    const activeQuiz = await activeQuizService.getActiveQuizById(req.params.activeQuizId);
    res.json(activeQuiz);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}



async function getAllActiveQuizzes(req, res) {
  try {
    const activeQuizzes = await activeQuizService.getAllActiveQuizzes();
    res.json(activeQuizzes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteActiveQuiz(req, res) {
  try {
    await activeQuizService.deleteActiveQuiz(req.params.activeQuizId);
    res.json({
      message: 'Active Quiz successfully deleted',
      _id: req.params.activeQuizId,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function signInUser(req, res) {
    try {
      const code = req.params.code;
      const username = req.body.username;
  
      const result = await activeQuizService.signInUser(code, username);
  
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async function registerAnswer(req, res) {
    try {
      const activeQuizId = req.params.activeQuizId;
      const playerId = req.params.playerId;
      const questionId = req.params.questionId;
      const answer = req.body.answer;
  
      const result = await activeQuizService.registerAnswer(activeQuizId, playerId, questionId, answer);
  
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async function getActiveQuizByQuizId(req, res) {
    try {
      const quizId = req.params.quizId;
      const activeQuiz = await activeQuizService.getActiveQuizByQuizId(quizId);
      res.json(activeQuiz);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async function getActiveQuizByCode(req, res) {
    try {
      const code = req.params.code;
      const activeQuiz = await activeQuizService.getActiveQuizByCode(code);
      res.json(activeQuiz);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  


async function calculatePlayerScore(req, res) {
  try {
    const activeQuizId = req.params.activeQuizId;
    const playerId = req.params.playerId;

    const score = await activeQuizService.calculateScore(activeQuizId, playerId);

    res.json({ score });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  calculatePlayerScore,
};

async function startGame(req, res) {
  try {
    const activeQuizId = req.params.activeQuizId;

    await activeQuizService.updateGameStarted(activeQuizId);

    res.json({ message: 'Game started successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
async function getUserIDByUsername(req, res) {
  try {
    const activeQuizId = req.params.activeQuizId;
    const username = req.params.username;
    const userID = await activeQuizService.getUserIDByUsername(activeQuizId, username);
    res.json({ userID });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


async function getPlayersForQuiz(req, res, next) {
  try {
      const players = await activeQuizService.getPlayersForQuiz(req.params.quizId);
      return res.status(200).json(players);
  } catch (err) {
      return next(err);
  }
}
async function getUserIDByUsername(req, res) {
  try {
    const activeQuizId = req.params.activeQuizId;
    const username = req.params.username;
    const userID = await activeQuizService.getUserIDByUsername(activeQuizId, username);
    res.json({ userID });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
async function getTopThreePlayersController(req, res) {
  try {
    const players = await activeQuizService.getTopThreePlayersService(req.params.code);
    return res.status(200).json(players);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

module.exports = {
    activateQuiz,
  getActiveQuizById,
  getAllActiveQuizzes,
  deleteActiveQuiz,
  signInUser,
  registerAnswer,
  getActiveQuizByQuizId,
  getActiveQuizByCode,
  calculatePlayerScore,
  startGame,
  getUserIDByUsername,
  getPlayersForQuiz,
  getUserIDByUsername,
  getTopThreePlayersController
};
