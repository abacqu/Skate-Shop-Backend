///////// DEPENDENCIES //////////
const express = require('express');
const Board = require('../models/board');
const finishedBoards = require('../boards.json');

const router = express.Router();



/////////////ROUTES/////////////

// INDEX

router.get('/', (req, res) => {
    res.send('hello world')
})


router.get("/finishedboards", (req, res) => {
    res.json(finishedBoards);
});



module.exports = router;