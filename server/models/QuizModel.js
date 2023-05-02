const mongoose = require('mongoose')

const Schema = mongoose.Schema

const quizSchema = new Schema({
    title :{
       type: String,
    require: true
    } 

}, {timestamps: true})


module.exports = mongoose.model('Quiz', quizSchema)

