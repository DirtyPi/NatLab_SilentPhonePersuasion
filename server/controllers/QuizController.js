const { response } = require('express')
const QuizModel = require('../models/QuizModel')
const mongoose = require('mongoose')

//get all quiz
const getQuizzes = async(req, res) => {
    const quizzes = await QuizModel.find({})
//.sort({createdAt: -1})
    res.status(200).json(quizzes)
}
//get single quiz
const getQuiz = async (req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such quiz found! "})
    }
    const quizzes = await QuizModel.findById(id)

    if(!quizzes){
        return res.status(404).json({error: 'No such quiz found!'})
    }
    res.status(200).json(quizzes)
}

//  create new quiz 
// const createQuiz = async(req,res) => {
//     const{title} = req.body
//     //add doc to db
//     try{
//         const quiz = await QuizModel.create({title}) 
//         res.status(200).json(quiz)
//     }catch(error){
//         res.status(400).json({error: error.message})
//     }
//     res.json({mssg:`Post new question `})  
// }

const createQuiz = async(req,res) => {
    const{title} = req.body
    //add doc to db
    try{
        const quiz = await QuizModel.create({title}) 
        res.status(200).json(quiz)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

//delete quiz
const deleteQuiz = async(req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such quiz found! "})
    }

    const quiz = await QuizModel.findOneAndDelete({_id: id},{new: true})

    if(!quiz){
        return res.status(400).json({error: 'No such quiz found!'})
    }

    res.status(200).json(quiz)
}

// update quiz 
const updateQuiz = async(req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such quiz found! "})
    }

    const quiz = await QuizModel.findOneAndUpdate({_id: id}, {
        ...req.body 
    })
    
    if(!quiz){
        return res.status(400).json({error: 'No such quiz found!'})
    }

    res.status(200).json(quiz)

}

module.exports = {
    getQuizzes,
    getQuiz,
    createQuiz,
    deleteQuiz,
    updateQuiz
}