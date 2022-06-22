// Dependencies
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const admin = require('firebase-admin')


// Import JSON files
const finishedBoards = require('./controllers/boards');

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
app.use('/', finishedBoards);

// Authorization Middleware
app.use(async(req, res, next) => {
  const token = req.get('Authorization')
  if(token) {
    // console.log(token)
    const user = await admin.auth().verifyIdToken(token.replace('Bearer ', ''));
    console.log(user);
  }
  next();
})



// Listener
app.listen(PORT, () => console.log(`Express is listening on port ${PORT}`))
