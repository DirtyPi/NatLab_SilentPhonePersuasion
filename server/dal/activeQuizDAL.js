// activeQuizDAL.js
const ActiveQuiz = require('../models/ActiveQuiz');

async function createActiveQuiz(activeQuizData) {
  const activeQuiz = new ActiveQuiz(activeQuizData);
  await activeQuiz.save();
  return activeQuiz;
}

async function getActiveQuizById(activeQuizId) {
  return ActiveQuiz.findById(activeQuizId).exec();
}


async function getAllActiveQuizzes() {
  return ActiveQuiz.find({}).exec();
}

async function deleteActiveQuiz(activeQuizId) {
  return ActiveQuiz.findByIdAndDelete(activeQuizId).exec();
}

async function signInUser(code, username) {
    try {
      const activeQuiz = await ActiveQuiz.findOne({ code });
  
      if (!activeQuiz) {
        throw new Error('Game not found');
      }
  
      activeQuiz.players.push({ username });
      await activeQuiz.save();
  
      return { message: 'User signed in successfully' };
    } catch (error) {
      throw new Error('Failed to sign in user');
    }
  }
  async function updateActiveQuiz(activeQuiz) {
    const updatedActiveQuiz = await activeQuiz.save();
    return updatedActiveQuiz;
  }
  async function getActiveQuizByQuizId(quizId) {
    return ActiveQuiz.findOne({ quiz: quizId }).exec();
  }
  async function getActiveQuizByCode(code) {
    return ActiveQuiz.findOne({ code }).exec();
  }
  async function findPlayerById(activeQuizId, playerId) {
    const activeQuiz = await getActiveQuizById(activeQuizId);
    if (!activeQuiz) {
      throw new Error('Active Quiz not found');
    }
   
  
    const player = activeQuiz.players.find(p => p._id.toString() === playerId);
    if (!player) {
      throw new Error('Player not found');
    }
  
    return player;
  }
  async function updateGameStarted(activeQuizId) {
    return ActiveQuiz.findOneAndUpdate(
      { _id: activeQuizId },
      { $set: { gameStarted: true } },
      { new: false }
    ).exec();
  }
  async function getUserIDByUsername(activeQuizId, username) {
    const activeQuiz = await ActiveQuiz.findById(activeQuizId).exec();
    if (!activeQuiz) {
      throw new Error('Active Quiz not found');
    }
  
    const player = activeQuiz.players.find((p) => p.username === username);
    if (player) {
      return player._id;
    } else {
      throw new Error('Player not found');
    }
  }
  
 
module.exports = {
  createActiveQuiz,
  getActiveQuizById,
  getAllActiveQuizzes,
  deleteActiveQuiz,
  signInUser,
  updateActiveQuiz,
  getActiveQuizByQuizId,
  getActiveQuizByCode,
  findPlayerById,
  updateGameStarted,
  getUserIDByUsername
};
