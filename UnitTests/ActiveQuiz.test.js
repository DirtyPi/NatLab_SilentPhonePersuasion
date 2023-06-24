const sinon = require('sinon');
const { expect } = require('chai');
const ActiveQuiz = require('../models/ActiveQuiz');
const Quiz = require('../models/Quiz');
const activeQuizDAL = require('../dal/activeQuizDAL');
const quizDAL = require('../dal/quizDAL');
const activeQuizService = require('../service/ActiveQuizServise');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

describe('ActiveQuizService', () => {
    afterEach(() => {
        sinon.restore();
    });

    // Test for activateQuiz method
    it('should activate a quiz', async () => {
        // Prepare mock data
        const mockQuiz = { _id: '12345', title: 'Test Quiz' };
        const mockActiveQuizData = {
            quiz: mockQuiz._id,
            code: 'ABCD',
            startTime: new Date(Date.now() + 60000),
            players: [],
        };
        const mockActiveQuiz = new ActiveQuiz(mockActiveQuizData);
        
        // Stub dependencies
        sinon.stub(quizDAL, 'getQuizById').resolves(mockQuiz);
        sinon.stub(activeQuizDAL, 'createActiveQuiz').resolves(mockActiveQuiz);

        const result = await activeQuizService.activateQuiz(mockQuiz._id);
        expect(result).to.equal(mockActiveQuiz);
    });

    it('should throw an error when activating a non-existing quiz', async () => {
        const quizId = 'nonExistingQuizId';
        
        sinon.stub(quizDAL, 'getQuizById').resolves(null);

        try {
            await activeQuizService.activateQuiz(quizId);
        } catch (error) {
            expect(error).to.exist;
            expect(error.message).to.equal('Quiz not found');
        }
    });

    it('should get an active quiz by ID', async () => {
        // Prepare mock data
        const mockActiveQuizId = '12345';
        const mockActiveQuiz = { _id: mockActiveQuizId, code: 'ABCD' };

        // Stub dependencies
        sinon.stub(activeQuizDAL, 'getActiveQuizById').resolves(mockActiveQuiz);

        const result = await activeQuizService.getActiveQuizById(mockActiveQuizId);
        expect(result).to.equal(mockActiveQuiz);
    });

    it('should throw an error when getting a non-existing active quiz', async () => {
        const activeQuizId = 'nonExistingActiveQuizId';

        sinon.stub(activeQuizDAL, 'getActiveQuizById').resolves(null);

        try {
            await activeQuizService.getActiveQuizById(activeQuizId);
        } catch (error) {
            expect(error).to.exist;
            expect(error.message).to.equal('Active quiz not found');
        }
    });
    it('should get all active quizzes', async () => {
        // Prepare mock data
        const mockActiveQuizzes = [
          { _id: '1', code: 'ABC' },
          { _id: '2', code: 'DEF' },
        ];
    
        // Stub the database interaction
        sinon.stub(activeQuizDAL, 'getAllActiveQuizzes').resolves(mockActiveQuizzes);
    
        const result = await activeQuizService.getAllActiveQuizzes();
        expect(result).to.deep.equal(mockActiveQuizzes);
      });
    
      it('should throw an error when getting all active quizzes fails', async () => {
        // Stub the database interaction to throw an error
        sinon.stub(activeQuizDAL, 'getAllActiveQuizzes').throws();
    
        try {
          await activeQuizService.getAllActiveQuizzes();
        } catch (error) {
          expect(error).to.exist;
        }
      });

       // Happy Path
    it('should delete an active quiz by ID', async () => {
        // Prepare mock data
        const mockActiveQuizId = '12345';

        // Stub dependencies to simulate successful deletion
        sinon.stub(activeQuizDAL, 'deleteActiveQuiz').resolves({ _id: mockActiveQuizId });

        const result = await activeQuizService.deleteActiveQuiz(mockActiveQuizId);

        expect(result).to.exist;
        expect(result._id).to.equal(mockActiveQuizId);
    });

    // Unhappy Path
    it('should return null when deleting a non-existing active quiz', async () => {
        const activeQuizId = 'nonExistingActiveQuizId';

        // Stub dependencies to simulate quiz not found
        sinon.stub(activeQuizDAL, 'deleteActiveQuiz').resolves(null);

        const result = await activeQuizService.deleteActiveQuiz(activeQuizId);
        expect(result).to.be.null;
    });

    it('should throw an error when deletion fails', async () => {
        const activeQuizId = '12345';

        // Stub dependencies to simulate failure
        sinon.stub(activeQuizDAL, 'deleteActiveQuiz').throws(new Error('Failed to delete quiz'));

        try {
            await activeQuizService.deleteActiveQuiz(activeQuizId);
        } catch (error) {
            expect(error).to.exist;
            expect(error.message).to.equal('Failed to delete quiz');
        }
    });

    // Happy Path
    it('should sign in a user', async () => {
        // Prepare mock data
        const code = 'ABCD';
        const username = 'testUser';

        // Stub dependencies to simulate successful operation
        sinon.stub(activeQuizDAL, 'signInUser').resolves({ message: 'User signed in successfully' });

        const result = await activeQuizService.signInUser(code, username);

        expect(result).to.exist;
        expect(result.message).to.equal('User signed in successfully');
    });

    // Unhappy Path
    it('should throw an error when the game does not exist', async () => {
        const code = 'ABCD';
        const username = 'testUser';

        sinon.stub(activeQuizDAL, 'signInUser').rejects(new Error('Failed to sign in user'));

        try {
            await activeQuizService.signInUser(code, username);
        } catch (error) {
            expect(error).to.exist;
            expect(error.message).to.equal('Failed to sign in user');
        }
    });

    it('should get players for a quiz', async () => {
        const mockQuizId = 'mockQuizId';
        const mockPlayers = [
          {
            username: 'user1',
            score: 0,
            answers: [
              {
                questionId: 'mockQuestionId',
                answer: 'Some answer',
                timestamp: Date.now(),
              },
            ],
          },
        ];
    
        sinon.stub(activeQuizDAL, 'getActiveQuizByQuizId').resolves(mockPlayers);
    
        const result = await activeQuizService.getActiveQuizByQuizId(mockQuizId);
        expect(result).to.deep.equal(mockPlayers);
      });
    
      it('should throw an error when the quiz does not exist', async () => {
        const nonExistingQuizId = 'nonExistingQuizId';
        const errorMessage = 'Game not found';
    
        sinon.stub(activeQuizDAL, 'getActiveQuizByQuizId').throws(new Error(errorMessage));
    
        try {
          await activeQuizService.getActiveQuizByQuizId(nonExistingQuizId);
        } catch (error) {
          expect(error).to.exist;
          expect(error.message).to.equal(errorMessage);
        }
      });

      it('should return an active quiz for a given code', async () => {
        // Prepare mock data
        const mockQuizCode = 'ABCD';
        const mockActiveQuiz = { code: mockQuizCode, gameStarted: true };
    
        // Stub dependencies
        sinon.stub(activeQuizDAL, 'getActiveQuizByCode').resolves(mockActiveQuiz);
    
        const result = await activeQuizService.getActiveQuizByCode(mockQuizCode);
        expect(result).to.deep.equal(mockActiveQuiz);
    });
    it('should return null when there is no active quiz with the given code', async () => {
        const quizCode = 'ABCD';
    
        // Stub dependencies to simulate quiz not found
        sinon.stub(activeQuizDAL, 'getActiveQuizByCode').resolves(null);
    
        const result = await activeQuizService.getActiveQuizByCode(quizCode);
        expect(result).to.be.null;
    });
    it('should throw an error when the database query fails', async () => {
        const quizCode = 'ABCD';
    
        // Stub dependencies to simulate failure
        sinon.stub(activeQuizDAL, 'getActiveQuizByCode').throws(new Error('Database error'));
    
        try {
            await activeQuizService.getActiveQuizByCode(quizCode);
        } catch (error) {
            expect(error).to.exist;
            expect(error.message).to.equal('Database error');
        }
    });
    

      it('should update the gameStarted status for an active quiz', async () => {
        // Prepare mock data
        const mockActiveQuizId = '12345';
        const mockUpdatedActiveQuiz = {
            _id: mockActiveQuizId,
            gameStarted: true,
        };
    
        // Stub dependencies
        sinon.stub(activeQuizDAL, 'updateGameStarted').resolves(mockUpdatedActiveQuiz);
    
        const result = await activeQuizService.updateGameStarted(mockActiveQuizId);
        expect(result).to.equal(mockUpdatedActiveQuiz);
    });
    it('should throw an error when updating the gameStarted status for a non-existing active quiz', async () => {
        const activeQuizId = 'nonExistingActiveQuizId';
    
        // Stub dependencies to simulate failure
        sinon.stub(activeQuizDAL, 'updateGameStarted').resolves(null);
    
        try {
            await activeQuizService.updateGameStarted(activeQuizId);
        } catch (error) {
            expect(error).to.exist;
            expect(error.message).to.equal('Active quiz not found');
        }
    });
    it('should throw an error when there is a problem updating the gameStarted status', async () => {
        const activeQuizId = '12345';
    
        // Stub dependencies to simulate failure
        sinon.stub(activeQuizDAL, 'updateGameStarted').throws(new Error('Failed to update game status'));
    
        try {
            await activeQuizService.updateGameStarted(activeQuizId);
        } catch (error) {
            expect(error).to.exist;
            expect(error.message).to.equal('Failed to update game status');
        }
    });
    
    it('should return a player ID given a username', async () => {
        // Prepare mock data
        const mockActiveQuizId = '12345';
        const mockUsername = 'player1';
        const mockPlayerId = '54321';
    
        // Stub dependencies
        sinon.stub(activeQuizDAL, 'getUserIDByUsername').resolves(mockPlayerId);
    
        const result = await activeQuizService.getUserIDByUsername(mockActiveQuizId, mockUsername);
        expect(result).to.equal(mockPlayerId);
    });
    it('should throw an error when the active quiz does not exist', async () => {
        const activeQuizId = 'nonExistingActiveQuizId';
        const username = 'player1';
    
        // Stub dependencies to simulate failure
        sinon.stub(activeQuizDAL, 'getUserIDByUsername').throws(new Error('Active Quiz not found'));
    
        try {
            await activeQuizService.getUserIDByUsername(activeQuizId, username);
        } catch (error) {
            expect(error).to.exist;
            expect(error.message).to.equal('Active Quiz not found');
        }
    });
    it('should throw an error when the player does not exist', async () => {
        const activeQuizId = '12345';
        const username = 'nonExistingPlayer';
    
        // Stub dependencies to simulate failure
        sinon.stub(activeQuizDAL, 'getUserIDByUsername').throws(new Error('Player not found'));
    
        try {
            await activeQuizService.getUserIDByUsername(activeQuizId, username);
        } catch (error) {
            expect(error).to.exist;
            expect(error.message).to.equal('Player not found');
        }
    });
    it('should return players for a given quiz', async () => {
        // Prepare mock data
        const mockQuizId = '12345';
        const mockPlayers = [
            { username: 'player1', score: 0 },
            { username: 'player2', score: 10 }
        ];
    
        // Stub dependencies
        sinon.stub(activeQuizDAL, 'getPlayersForQuiz').resolves(mockPlayers);
    
        const result = await activeQuizService.getPlayersForQuiz(mockQuizId);
        expect(result).to.deep.equal(mockPlayers);
    });
    it('should throw an error when quiz ID is not provided', async () => {
        const quizId = null;
    
        try {
            await activeQuizService.getPlayersForQuiz(quizId);
        } catch (error) {
            expect(error).to.exist;
            expect(error.message).to.equal('QuizId is required');
        }
    });
    it('should throw an error when there is a database error', async () => {
        const quizId = '12345';
        const errorMessage = 'Database error: Some database error';
    
        // Stub dependencies to simulate failure
        sinon.stub(activeQuizDAL, 'getPlayersForQuiz').throws(new Error(errorMessage));
    
        try {
            await activeQuizService.getPlayersForQuiz(quizId);
        } catch (error) {
            expect(error).to.exist;
            expect(error.message).to.equal(errorMessage);
        }
    });
    it('should return top three players for a given quiz', async () => {
        // Prepare mock data
        const mockQuizCode = 'ABCD';
        const mockPlayers = [
            { username: 'player1', score: 30 },
            { username: 'player2', score: 20 },
            { username: 'player3', score: 10 },
        ];
    
        // Stub dependencies
        sinon.stub(activeQuizDAL, 'getTopThreePlayers').resolves(mockPlayers);
    
        const result = await activeQuizService.getTopThreePlayersService(mockQuizCode);
        expect(result).to.deep.equal(mockPlayers);
    });
    it('should throw an error when there is a service error', async () => {
        const quizCode = 'ABCD';
        const errorMessage = 'Failed to get top three players';
    
        // Stub dependencies to simulate failure
        sinon.stub(activeQuizDAL, 'getTopThreePlayers').throws(new Error(errorMessage));
    
        try {
            await activeQuizService.getTopThreePlayersService(quizCode);
        } catch (error) {
            expect(error).to.exist;
            expect(error.message).to.equal(errorMessage);
        }
    });
    
});

describe('ActiveQuizDAL', () => {
    afterEach(() => {
        sinon.restore();
    });

    // Test for createActiveQuiz method
    it('should create an active quiz', async () => {
        // Prepare mock data
        const mockActiveQuizData = {
            quiz: '12345',
            code: 'ABCD',
            startTime: new Date(Date.now() + 60000),
            players: [],
        };
        const mockActiveQuiz = new ActiveQuiz(mockActiveQuizData);
        const saveStub = sinon.stub();
        sinon.stub(ActiveQuiz.prototype, 'save').callsFake(saveStub);
        
        const result = await activeQuizDAL.createActiveQuiz(mockActiveQuizData);
        
        // Compare relevant properties instead of the objects themselves
        expect(result.code).to.equal(mockActiveQuiz.code);
        expect(result.startTime.getTime()).to.be.closeTo(mockActiveQuiz.startTime.getTime(), 10); // Allow a difference of 10 milliseconds
        expect(result.players).to.deep.equal(mockActiveQuiz.players);
        expect(saveStub.calledOnce).to.be.true;
    });
    


    it('should throw an error when creating an active quiz fails', async () => {
        const mockActiveQuizData = {
            quiz: '12345',
            code: 'ABCD',
            startTime: new Date(Date.now() + 60000),
            players: [],
        };
        
        sinon.stub(ActiveQuiz.prototype, 'save').throws();

        try {
            await activeQuizDAL.createActiveQuiz(mockActiveQuizData);
        } catch (error) {
            expect(error).to.exist;
        }
    });

     // Test for getActiveQuizById method
  it('should get an active quiz by ID', async () => {
    // Prepare mock data
    const mockActiveQuizId = '12345';
    const mockActiveQuiz = { _id: mockActiveQuizId, code: 'ABCD' };

    // Stub the database interaction (replace this with your actual implementation)
    sinon.stub(activeQuizDAL, 'getActiveQuizById').resolves(mockActiveQuiz);

    const result = await activeQuizDAL.getActiveQuizById(mockActiveQuizId);
    expect(result).to.equal(mockActiveQuiz);
  });

  it('should return null when getting a non-existing active quiz', async () => {
    const activeQuizId = 'nonExistingActiveQuizId';

    // Stub the database interaction (replace this with your actual implementation)
    sinon.stub(activeQuizDAL, 'getActiveQuizById').resolves(null);

    const result = await activeQuizDAL.getActiveQuizById(activeQuizId);
    expect(result).to.be.null;
  });

  it('should get all active quizzes', async () => {
    // Prepare mock data
    const mockActiveQuizzes = [
      { _id: '1', code: 'ABC' },
      { _id: '2', code: 'DEF' },
    ];
  
    // Stub the database interaction
    sinon.stub(ActiveQuiz, 'find').returns({
        exec: sinon.stub().resolves(mockActiveQuizzes),
    });
  
    const result = await activeQuizDAL.getAllActiveQuizzes();
    expect(result).to.deep.equal(mockActiveQuizzes);
  });

  it('should throw an error when getting all active quizzes fails', async () => {
    // Stub the database interaction to throw an error
    sinon.stub(ActiveQuiz, 'find').throws(new Error('Failed to retrieve active quizzes'));
  
    try {
      await activeQuizDAL.getAllActiveQuizzes();
    } catch (error) {
      expect(error.message).to.equal('Failed to retrieve active quizzes');
    }
  });
  
   // Happy Path
   it('should delete an active quiz by ID', async () => {
    const mockActiveQuizId = '12345';

    // Stub dependencies to simulate successful deletion
    sinon.stub(ActiveQuiz, 'findByIdAndDelete').returns({ exec: sinon.stub().resolves({ _id: mockActiveQuizId }) });

    const result = await activeQuizDAL.deleteActiveQuiz(mockActiveQuizId);

    expect(result).to.exist;
    expect(result._id).to.equal(mockActiveQuizId);
});

// Unhappy Path
it('should return null when deleting a non-existing active quiz', async () => {
    const activeQuizId = 'nonExistingActiveQuizId';

    // Stub dependencies to simulate quiz not found
    sinon.stub(ActiveQuiz, 'findByIdAndDelete').returns({ exec: sinon.stub().resolves(null) });

    const result = await activeQuizDAL.deleteActiveQuiz(activeQuizId);
    expect(result).to.be.null;
});

it('should throw an error when deletion fails', async () => {
    const activeQuizId = '12345';

    // Stub dependencies to simulate failure
    sinon.stub(ActiveQuiz, 'findByIdAndDelete').returns({ exec: sinon.stub().throws(new Error('Failed to delete quiz')) });

    try {
        await activeQuizDAL.deleteActiveQuiz(activeQuizId);
    } catch (error) {
        expect(error).to.exist;
        expect(error.message).to.equal('Failed to delete quiz');
    }
});
 // Happy Path
 it('should sign in a user', async () => {
    const code = 'ABCD';
    const username = 'testUser';

    // Prepare mock active quiz and stub the findOne method
    const mockActiveQuiz = new ActiveQuiz({ code: code, players: [] });
    mockActiveQuiz.save = sinon.stub().resolves();
    sinon.stub(ActiveQuiz, 'findOne').resolves(mockActiveQuiz);

    const result = await activeQuizDAL.signInUser(code, username);

    expect(result).to.exist;
    expect(result.message).to.equal('User signed in successfully');
});

// Unhappy Path
it('should throw an error when the game does not exist', async () => {
    const code = 'ABCD';
    const username = 'testUser';

    sinon.stub(ActiveQuiz, 'findOne').returns({ exec: sinon.stub().resolves(null) });

    try {
        await activeQuizDAL.signInUser(code, username);
    } catch (error) {
        expect(error).to.exist;
        expect(error.message).to.equal('Failed to sign in user');
    }
});


it('should throw an error when sign in fails', async () => {
    const code = 'ABCD';
    const username = 'testUser';

    // Stub dependencies to simulate failure
    sinon.stub(ActiveQuiz, 'findOne').throws(new Error('Failed to sign in user'));

    try {
        await activeQuizDAL.signInUser(code, username);
    } catch (error) {
        expect(error).to.exist;
        expect(error.message).to.equal('Failed to sign in user');
    }
});

it('should get players for a quiz', async () => {
    const mockQuizId = 'mockQuizId';
    const mockPlayers = [
      {
        username: 'user1',
        score: 0,
        answers: [
          {
            questionId: 'mockQuestionId',
            answer: 'Some answer',
            timestamp: Date.now(),
          },
        ],
      },
    ];

    const mockQuiz = { players: mockPlayers };

    sinon.stub(ActiveQuiz, 'findOne').returns({
      exec: sinon.stub().resolves(mockQuiz),
    });

    const result = await activeQuizDAL.getPlayersForQuiz(mockQuizId);
    expect(result).to.deep.equal(mockPlayers);
  });


  
  // Unhappy flow
  it('should throw an error when updating an active quiz fails', async () => {
    const fakeActiveQuiz = {
      save: sinon.stub().throws(new Error('Database error'))
    };
    
    try {
      await activeQuizDAL.updateActiveQuiz(fakeActiveQuiz);
    } catch (error) {
      expect(error).to.exist;
      expect(error.message).to.equal('Database error');
    }
  });

  it('should get an active quiz by quizId', async () => {
    const fakeQuizId = 'fakeQuizId';
    const fakeActiveQuiz = {
      _id: 'fakeId',
      quiz: fakeQuizId,
      code: '123456',
      gameStarted: false,
      players: []
    };
  
    // Mock the ActiveQuiz.findOne function
    const findOneMock = sinon.stub(ActiveQuiz, 'findOne');
    findOneMock.withArgs({ quiz: fakeQuizId }).returns({
      exec: sinon.stub().resolves(fakeActiveQuiz)
    });
  
    const result = await activeQuizDAL.getActiveQuizByQuizId(fakeQuizId);
    expect(result).to.eql(fakeActiveQuiz);
  
    // Restore the original function
    findOneMock.restore();
  });

});

