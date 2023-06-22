// require(`dotenv`).config()
// const express = require("express");
// const quizRouts = require('../server/routes/quizRoutes')
// const activeQuizRouts = require('../server/routes/activeQuizRoutes')
// const mongoose = require('mongoose')
// const path = require("path")

// //express app
// const app = express()

// //middleware
// app.use(express.json())
// // // Enable CORS
// // app.use(cors());

// app.use((req,res,next) => {
//     console.log(req.path, req.method)
//     next()
// })

// //routes
// app.use('/api/quiz', quizRouts)
// app.use('/api/active/quiz', activeQuizRouts)

// //connect to db
// mongoose.connect(process.env.MONGO_URI)
//     .then(() => {
//         //listen for req
//         app.listen(process.env.PORT, () =>{
//             console.log('Conncected', process.env.PORT)
//         })
//     })
//     .catch((error) => {
//         console.log(error)
//     })

//     //production script
//  // Serve static files from the client build directory
// const clientBuildPath = path.join(__dirname, '../client/build');
// app.use(express.static("../client/build"));

// // Serve the index.html file for all other routes
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '..','client' ,'build', 'index.html'));
// });



// require(`dotenv`).config()
// const express = require("express");
// const quizRouts = require('./routes/quizRoutes')
// const activeQuizRouts = require('./routes/activeQuizRoutes')
// const mongoose = require('mongoose')
// const path = require("path")
// const cors = require("cors"); 
// //express app
// const app = express()

// //middleware
// app.use(express.json())

// app.use((req,res,next) => {
//     console.log(req.path, req.method)
//     next()
// })

// app.use(function (err, req, res, next) {
//     console.error(err.stack); // log the error stack trace for debugging
//     res.status(500).json({ message: err.message }); // send the error message to the client
// });


// //routes
// app.use('/api/quiz', quizRouts)
// app.use('/api/active/quiz', activeQuizRouts)

// app.use(cors());

// //connect to db
// mongoose.connect(process.env.MONGO_URI)
//     .then(() => {
//         //listen for req
//         app.listen(process.env.PORT, () =>{
//             console.log('Connected', process.env.PORT)
//         })
//     })
//     .catch((error) => {
//         console.log(error)
//     })

// //   // Custom CORS headers
// // app.use((req, res, next) => {
// //     res.header('Access-Control-Allow-Origin', 'https://nat-lab-silent-phone-persuasion-react.vercel.app');
// //     res.header(
// //         'Access-Control-Allow-Headers',
// //         'Origin, X-Requested-With, Content-Type, Accept'
// //     );
// //     next();
// // });
require('dotenv').config();
const express = require('express');
const quizRoutes = require('./routes/quizRoutes');
const activeQuizRoutes = require('./routes/activeQuizRoutes');
const mongoose = require('mongoose');
const cors = require('cors');

// Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use(function (err, req, res, next) {
  console.error(err.stack); // Log the error stack trace for debugging
  res.status(500).json({ message: err.message }); // Send the error message to the client
});

// Enable CORS for the Vercel domain
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://nat-lab-silent-phone-persuasion-react-git-main-dirtypi.vercel.app');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Routes
app.use('/api/quiz', quizRoutes);
app.use('/api/active/quiz', activeQuizRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // Listen for requests
    app.listen(process.env.PORT, () => {
      console.log('Connected', process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
