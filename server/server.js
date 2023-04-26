const express = require("express");
const questions = require('./routes/questions')
const mongoose = require('mongoose')
require(`dotenv`).config()
//express app
const app = express()

//middleware
app.use(express.json())

app.use((req,res,next) => {
    console.log(req.path, req.method)
    next()
})
//routes
// app.get(`/`, (req, res) => {
//     res.json({mssg:`welcome to the app`})
// })
app.use('/api/questions', questions)

//connect to db
mongoose.connect(process.env.MONG_URI)
    .then(() => {
        //listen for req
        app.listen(process.env.PORT, () =>{
            console.log('Conncected', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })

// //listen for requests
// app.listen(process.env.PORT, () =>{
//     console.log(`listinging on port 4000`)
// })

