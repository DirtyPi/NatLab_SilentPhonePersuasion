const express = require('express')
const{
    getQuizzes,
    getQuiz,
    createQuiz,
    deleteQuiz,
    updateQuiz
} = require('../controllers/QuizController')

const router = express.Router()

// GET all questions
router.get('/', getQuizzes)

//GET a sindgle question 
router.get('/:id',getQuiz)


//Post a new question 
router.post('/', createQuiz)

//Delete a new question 
router.delete('/', deleteQuiz)

//Update a new question 
router.patch('/', updateQuiz)
 
module.exports = router