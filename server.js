// Dependencies
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const admin = require('firebase-admin')


// Import JSON files
const finishedBoards = require('./controllers/boards');
const { apps } = require('firebase-admin');

// Config App settings
require('dotenv').config();

admin.initializeApp({
  credential: admin.credential.cert(require('./firebase-service-key.json'))
})

const { PORT, MONGODB_URL } = process.env;

// Connect to MONGODB
mongoose.connect(MONGODB_URL)

// MONGODB status
mongoose.connection
.on('connected', () => console.log('Connected to MongoDB'))
.on('error', (err) => console.log('Error with MongoDB' + err.message))

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Authorization Middleware
app.use(async(req, res, next) => {
  const token = req.get('Authorization')
  if(token) {
    try {
      const user = await admin.auth().verifyIdToken(token.replace('Bearer ', ''));
      req.user = user;
      console.log(user)
      
    } catch (error) {
      req.user = null;
    }
  } else {
    req.user = null;
  }
  next();
});



function isAuthenticated(req, res, next) {
  if(!req.user) { return res.status(401).json({message: 'you must be logged in' });
} else {
  return next();
}
}
app.get('/', isAuthenticated, (req, res) => {
  res.send('hello world')
})

app.use(isAuthenticated, finishedBoards);










// Listener
app.listen(PORT, () => console.log(`Express is listening on port ${PORT}`))
