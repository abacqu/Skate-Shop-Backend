///////// DEPENDENCIES //////////
const express = require('express');
const Board = require('../models/board');
const finishedBoards = require('../boards.json');
const trucks = require('../trucks');
const wheels = require('../wheels');
const bearings = require('../bearings');

const router = express.Router();



/////////////ROUTES/////////////

// INDEX

router.get('/', (req, res) => {
    res.send('hello world')
})


router.get("/presets", (req, res) => {
    res.json(finishedBoards);
});

router.put("/modify", (req, res) => {
    // console.log(finishedBoards, trucks, bearings, wheels);
    index = wheels.some(w => w.id === req.body.wheelid);
    trucks.id = req.body.truckid;
    bearings.id = req.body.bearingid;
    finishedBoards.name = req.body.boardname;
    finishedBoards.width = req.body.width;

    // wheel_img = wheels;

    console.log(index);
    res.json(req.body);
});


module.exports = router;