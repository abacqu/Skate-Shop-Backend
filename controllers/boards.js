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
    // send projects via JSON
    console.log('???');
    res.json(finishedBoards);
});



module.exports = router;