
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

// Enable CORS for the frontend URLs
const allowedOrigins = [
  'https://nat-lab-silent-phone-persuasion-react-git-main-dirtypi.vercel.app',
  'https://nat-lab-silent-phone-persuasion-react-dirtypi.vercel.app',
  'https://nat-lab-silent-phone-persuasion-react.vercel.app'
];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
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
