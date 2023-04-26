const express = require('express')

const router = express.Router()
// GET all questions
router.get('/', (req, res) => {
    res.json({mssg:`Best bulgarian serires?`})
})

//GET a sindgle question 
router.get('/:id', (req, res) =>{
    res.json({mssg:`Under cover`})
})


//Post a new question 
router.post('/',(req,res) => {
    res.json({mssg:`Post new question `})
})

//Delete a new question 
router.delete('/',(req,res) => {
    res.json({mssg:`Delete a question `})
})

//Update a new question 
router.patch('/',(req,res) => {
    res.json({mssg:`Update a question `})
})
module.exports = router