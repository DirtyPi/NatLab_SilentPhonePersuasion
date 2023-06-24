const sinon = require('sinon');
const { expect } = require('chai');
const Quiz = require('../models/Quiz');
const quizDAL = require('../dal/quizDAL');
const quizService = require('../service/QuizService');

describe('Quiz Service', () => {
  afterEach(() => {
    sinon.restore();
  });

  // Test happy path
  it('should call createQuiz from DAL in the service', async () => {
    const mockQuiz = { title: 'Test Quiz', questions: [{ question: 'Question 1', answer: 'Answer 1'}] };
    const createQuizDALStub = sinon.stub(quizDAL, 'createQuiz').resolves(mockQuiz);

    await quizService.createQuiz(mockQuiz);

    expect(createQuizDALStub.calledWith(mockQuiz)).to.be.true;
  });

  // Test unhappy path
  it('should throw an error if DAL fails', async () => {
    const mockQuiz = { title: 'Test Quiz', questions: [{ question: 'Question 1', answer: 'Answer 1'}] };
    sinon.stub(quizDAL, 'createQuiz').throws();

    try {
      await quizService.createQuiz(mockQuiz);
    } catch (error) {
      expect(error).to.exist;
    }
  });
});

describe('Quiz DAL', () => {
  afterEach(() => {
    sinon.restore();
  });

  // Test happy path
  it('should create a quiz model', async () => {
    const mockQuiz = { title: 'Test Quiz', questions: [{ question: 'Question 1', answer: 'Answer 1'}] };
    const saveStub = sinon.stub();
    sinon.stub(Quiz.prototype, 'save').callsFake(saveStub);

    await quizDAL.createQuiz(mockQuiz);

    expect(saveStub.calledOnce).to.be.true;
  });

  // Test unhappy path
  it('should throw an error if model save fails', async () => {
    const mockQuiz = { title: 'Test Quiz', questions: [{ question: 'Question 1', answer: 'Answer 1'}] };
    sinon.stub(Quiz.prototype, 'save').throws();

    try {
      await quizDAL.createQuiz(mockQuiz);
    } catch (error) {
      expect(error).to.exist;
    }
  });

  // Test for getQuizById
it('should call getQuizById from DAL in the service', async () => {
  // Happy path test for getting a quiz by ID
  const mockQuiz = { 
    name: 'Test Quiz', 
    questions: [{ question: 'Question 1', answers: { a: 'A', b: 'B', c: 'C', d: 'D' }, correct: 'a' }] 
  };
  const getQuizByIdDALStub = sinon.stub(quizDAL, 'getQuizById').resolves(mockQuiz);

  const result = await quizService.getQuizById('1234');

  expect(getQuizByIdDALStub.calledWith('1234')).to.be.true;
  expect(result).to.equal(mockQuiz);
});

it('should handle errors in getQuizById from DAL in the service', async () => {
  // Unhappy path test for getting a quiz by ID
  sinon.stub(quizDAL, 'getQuizById').throws();

  try {
    await quizService.getQuizById('1234');
  } catch (error) {
    expect(error).to.exist;
  }
});

// Test for updateQuiz
it('should call updateQuiz from DAL in the service', async () => {
  // Happy path test for updating a quiz
  const mockQuiz = { 
    name: 'Updated Quiz', 
    questions: [{ question: 'Question 1', answers: { a: 'A', b: 'B', c: 'C', d: 'D' }, correct: 'a' }] 
  };
  const updateQuizDALStub = sinon.stub(quizDAL, 'updateQuiz').resolves(mockQuiz);

  const result = await quizService.updateQuiz('1234', mockQuiz);

  expect(updateQuizDALStub.calledWith('1234', mockQuiz)).to.be.true;
  expect(result).to.equal(mockQuiz);
});

it('should handle errors in updateQuiz from DAL in the service', async () => {
  // Unhappy path test for updating a quiz
  const mockQuiz = { 
    name: 'Updated Quiz', 
    questions: [{ question: 'Question 1', answers: { a: 'A', b: 'B', c: 'C', d: 'D' }, correct: 'a' }] 
  };
  sinon.stub(quizDAL, 'updateQuiz').throws();

  try {
    await quizService.updateQuiz('1234', mockQuiz);
  } catch (error) {
    expect(error).to.exist;
  }
});

// Test for deleteQuiz
it('should call deleteQuiz from DAL in the service', async () => {
  // Happy path test for deleting a quiz
  const deleteQuizDALStub = sinon.stub(quizDAL, 'deleteQuiz').resolves({ deleted: true });

  const result = await quizService.deleteQuiz('1234');

  expect(deleteQuizDALStub.calledWith('1234')).to.be.true;
  expect(result).to.eql({ deleted: true });
});

it('should handle errors in deleteQuiz from DAL in the service', async () => {
  // Unhappy path test for deleting a quiz
  sinon.stub(quizDAL, 'deleteQuiz').throws();

  try {
    await quizService.deleteQuiz('1234');
  } catch (error) {
    expect(error).to.exist;
  }
});

// Test for findQuestionById
it('should call findQuestionById from DAL in the service', async () => {
  // Happy path test for finding a question by ID
  const mockQuestion = { question: 'Question 1', answers: { a: 'A', b: 'B', c: 'C', d: 'D' }, correct: 'a' };
  const findQuestionByIdDALStub = sinon.stub(quizDAL, 'findQuestionById').resolves(mockQuestion);

  const result = await quizService.findQuestionById('1234', '5678');

  expect(findQuestionByIdDALStub.calledWith('1234', '5678')).to.be.true;
  expect(result).to.equal(mockQuestion);
});

it('should handle errors in findQuestionById from DAL in the service', async () => {
  // Unhappy path test for finding a question by ID
  sinon.stub(quizDAL, 'findQuestionById').throws();

  try {
    await quizService.findQuestionById('1234', '5678');
  } catch (error) {
    expect(error).to.exist;
  }
});
});
