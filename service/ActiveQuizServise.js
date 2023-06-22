// activeQuizService.js
const activeQuizDAL = require('../dal/activeQuizDAL');
const quizDAL = require('../dal/quizDAL');
const quizService = require('../service/QuizService');

// async function activateQuiz(quizId) {
//   const quiz = await quizDAL.getQuizById(quizId);
//   if (!quiz) {
//     throw new Error('Quiz not found');
//   }
//   const code = generateUniqueCode();
//   const activeQuizData = {
//     quiz: quiz._id,
//     code,
//     players: []
//   };
//   const activeQuiz = await activeQuizDAL.createActiveQuiz(activeQuizData);
//   return activeQuiz;
// }


async function activateQuiz(quizId) {
  const quiz = await quizDAL.getQuizById(quizId);
  if (!quiz) {
    throw new Error('Quiz not found');
  }
  const code = generateUniqueCode();
  const startTime = new Date(Date.now() + 60000); // Set the start time to 60 seconds from the current date and time
  const activeQuizData = {
    quiz: quiz._id,
    code,
    startTime,
    players: []
  };
  const activeQuiz = await activeQuizDAL.createActiveQuiz(activeQuizData);
  return activeQuiz;
}

// Helper function to generate a unique code
function generateUniqueCode() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 4; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
}

async function getActiveQuizById(activeQuizId) {
  return activeQuizDAL.getActiveQuizById(activeQuizId);
}


async function getAllActiveQuizzes() {
  return activeQuizDAL.getAllActiveQuizzes();
}

async function deleteActiveQuiz(activeQuizId) {
  return activeQuizDAL.deleteActiveQuiz(activeQuizId);
}

async function signInUser(code, username) {
    try {
      return await activeQuizDAL.signInUser(code, username);
    } catch (error) {
      throw new Error('Failed to sign in user');
    }
  }
  
  // async function registerAnswer(activeQuizId, player, questionId, answer) {
  //   try{
  //       const activeQuiz = await getActiveQuizById(activeQuizId);
  //       const actualQuiz = await quizService.getQuizById(activeQuiz.quiz);
  //       const playerInGame = await findPlayerById(activeQuizId,player);
  //       const currentQuestion = await quizService.findQuestionById(actualQuiz.id, questionId);
  //       if (!activeQuiz || !actualQuiz || !playerInGame || !currentQuestion) {
  //         throw new Error('Invalid one or all of the parameters are wrong!');
  //       }
  //       console.log(playerInGame.answers)
  //       const newAnswer = {
  //         questionId: questionId,
  //         answer: answer,
  //         timestamp: Date.now()
  //       };
  //       // Find the index of the player in the active quiz
  //       const playerIndex = activeQuiz.players.findIndex(p => p._id.toString() === playerInGame._id.toString());
  //       // Find the index of the answer in the player's answers array
  //       const answerIndex = playerInGame.answers.findIndex(a => a.questionId.toString() === questionId.toString());
  //       if (answerIndex !== -1) {
  //         // If the player has already answered this question, update the existing answer
  //         activeQuiz.players[playerIndex].answers[answerIndex].answer = answer;
  //         activeQuiz.players[playerIndex].answers[answerIndex].timestamp = Date.now();
  //       } else {
  //         // If the player has not answered this question, add a new answer
  //         activeQuiz.players[playerIndex].answers.push(newAnswer);
  //       }
  //       // Save the changes to the active quiz
  //       await activeQuiz.save();
  //       return { 
  //         message: 'Answer registered successfully',
  //       };
  //   }
  //    catch (error) {
  //     throw new Error('Failed to register answer');
  //   }
  // }

  //working with score !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//   async function registerAnswer(activeQuizId, player, questionId, answer) {
//     try {
//       const activeQuiz = await getActiveQuizById(activeQuizId);
//       const actualQuiz = await quizService.getQuizById(activeQuiz.quiz);
//       const playerInGame = await findPlayerById(activeQuizId,player);
//       const currentQuestion = await quizService.findQuestionById(actualQuiz.id, questionId);
  
//       if (!activeQuiz || !actualQuiz || !playerInGame || !currentQuestion) {
//         throw new Error('Invalid one or all of the parameters are wrong!');
//       }
  
//       const newAnswer = {
//         questionId: questionId,
//         answer: answer,
//         timestamp: Date.now()
//       };
  
//       // Find the index of the player in the active quiz
//       const playerIndex = activeQuiz.players.findIndex(p => p._id.toString() === playerInGame._id.toString());
  
//       // Find the index of the answer in the player's answers array
//       const answerIndex = playerInGame.answers.findIndex(a => a.questionId.toString() === questionId.toString());
  
//       if (answerIndex !== -1) {
//         // If the player has already answered this question, update the existing answer
//         activeQuiz.players[playerIndex].answers[answerIndex].answer = answer;
//         activeQuiz.players[playerIndex].answers[answerIndex].timestamp = Date.now();
//       } else {
//         // If the player has not answered this question, add a new answer
//         activeQuiz.players[playerIndex].answers.push(newAnswer);
//       }
  
//      // Check if the answer is correct
// if (currentQuestion.correct === answer) {
//   // If the answer is correct, increment the player's score
//  // console.log(activeQuiz.players[playerIndex].score);  // Log the score before incrementing
//   activeQuiz.players[playerIndex].score += 1;
//  // console.log(activeQuiz.players[playerIndex].score);  // Log the score after incrementing
//   activeQuiz.markModified(`players.${playerIndex}.score`);
//   await activeQuiz.save();
// }
  
//       // Save the changes to the active quiz
//       await activeQuiz.save();
  
//       return { 
//         message: 'Answer registered successfully',
//       };
  
//     } catch (error) {
//       throw new Error('Failed to register answer');
//     }
//   }
  

async function registerAnswer(activeQuizId, player, questionId, answer) {
  try {
    const activeQuiz = await getActiveQuizById(activeQuizId);
    const actualQuiz = await quizService.getQuizById(activeQuiz.quiz);
    const playerInGame = await findPlayerById(activeQuizId, player);
    const currentQuestion = await quizService.findQuestionById(actualQuiz.id, questionId);

    if (!activeQuiz || !actualQuiz || !playerInGame || !currentQuestion) {
      throw new Error('Invalid one or all of the parameters are wrong!');
    }

    const newAnswer = {
      questionId: questionId,
      answer: answer,
      timestamp: Date.now(),
    };

    // Find the index of the player in the active quiz
    const playerIndex = activeQuiz.players.findIndex(p => p._id.toString() === playerInGame._id.toString());

    // Find the index of the answer in the player's answers array
    const answerIndex = playerInGame.answers.findIndex(a => a.questionId.toString() === questionId.toString());

    if (answerIndex !== -1) {
      // If the player has already answered this question, update the existing answer
      activeQuiz.players[playerIndex].answers[answerIndex] = newAnswer;
    } else {
      // If the player has not answered this question, add a new answer
      activeQuiz.players[playerIndex].answers.push(newAnswer);
    }

    // Check if the answer is correct
    if (currentQuestion.correct === answer) {
      // If the answer is correct, get all players who answered this question
      const playersWhoAnswered = activeQuiz.players.filter(p =>
        p.answers.some(a => a.questionId.toString() === questionId.toString())
      );

      // Sort the players by the timestamp of their answers
      playersWhoAnswered.sort((a, b) =>
        Date.parse(a.answers.find(ans => ans.questionId.toString() === questionId.toString()).timestamp) -
        Date.parse(b.answers.find(ans => ans.questionId.toString() === questionId.toString()).timestamp)
      );

      // Find the position of the current player in the sorted array
      const scoreIncrement = playersWhoAnswered.findIndex(p => p._id.toString() === playerInGame._id.toString()) + 1;

      // Increment the player's score
      activeQuiz.players[playerIndex].score += scoreIncrement;
      activeQuiz.markModified(`players.${playerIndex}.score`);
    }

    // Save the changes to the active quiz
    await activeQuiz.save();

    return { 
      message: 'Answer registered successfully',
    };

  } catch (error) {
    throw new Error('Failed to register answer');
  }
}


  async function calculateScore(activeQuizId) {
    try {
      const activeQuiz = await getActiveQuizById(activeQuizId);
      const actualQuiz = await quizService.getQuizById(activeQuiz.quiz);
  
      if (!activeQuiz || !actualQuiz) {
        throw new Error('Invalid active quiz or actual quiz');
      }
      const quizQuestions = actualQuiz.questions;
      // Iterate through each player in the active quiz
      for (const player of activeQuiz.players) {
        const playerAnswers = player.answers;
        let score = 0;
        // Iterate through each question and answer
        for (const question of quizQuestions) {
          const correspondingAnswer = playerAnswers.find(answer => answer.questionId.toString() === question._id.toString());
          // Check if the answer is correct
          if (correspondingAnswer && correspondingAnswer.answer === question.correct) {
            score += 100; // Increment score by 100 for correct answer
          }
        }
        // Update the player's score
        player.score = score;
      }
      await activeQuiz.save();
      // Create an array of scores for all players
      const scores = activeQuiz.players.map(player => ({
        player: player.username,
        score: player.score
      }));
      return {
        message: 'Scores calculated successfully',
        scores: scores
      };
    } catch (error) {
      throw new Error('Failed to calculate scores: ' + error.message);
    }
  }
  
  
  
   

  
  async function getActiveQuizByQuizId(quizId) {
    return activeQuizDAL.getActiveQuizByQuizId(quizId);
  }

async function getActiveQuizByCode(code) {
    return activeQuizDAL.getActiveQuizByCode(code);
  }
  async function findPlayerById(activeQuizId, playerId) {
    return activeQuizDAL.findPlayerById(activeQuizId, playerId);
  }
  async function updateGameStarted(activeQuizId) {
    return activeQuizDAL.updateGameStarted(activeQuizId);
  }

  async function getUserIDByUsername(activeQuizId, username) {
    return activeQuizDAL.getUserIDByUsername(activeQuizId, username);
  }

  async function getPlayersForQuiz(quizId) {
    if (!quizId) {
        throw new Error('QuizId is required');
    }
    return activeQuizDAL.getPlayersForQuiz(quizId);
}

async function getUserIDByUsername(activeQuizId, username) {
  return activeQuizDAL.getUserIDByUsername(activeQuizId, username);
}
async function getTopThreePlayersService(quizCode) {
  try {
    const players = await activeQuizDAL.getTopThreePlayers(quizCode);
    return players;
  } catch (error) {
    throw new Error('Failed to get top three players');
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
  calculateScore,
  updateGameStarted,
  getUserIDByUsername,
  getPlayersForQuiz,
  getUserIDByUsername,
  getTopThreePlayersService,
  
};
