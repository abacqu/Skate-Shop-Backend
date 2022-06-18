///////// DEPENDENCIES //////////
const express = require('express');
const Board = require('../models/board');
const finishedBoards = require('../boards.json');
const trucks = require('../models/truck');
const wheels = require('../models/wheel');
const bearings = require('../models/bearing');
const Build = require('../models/build');

const router = express.Router();



/////////////ROUTES/////////////

// INDEX

router.get('/', (req, res) => {
    res.send('hello world')
})


router.get("/presets", (req, res) => {
    res.json(finishedBoards);
});

router.get("/all", async (req, res) => {
    try {

        const builds = await Build.find({}).populate('boardId bearingId truckId wheelId');
        res.json(builds);
    } catch (error) {
        res.status(400).json(error);
    }
});

// router.post("/all", async (req, res) => {
//     try {
//         res.json(await Board.create(req.body));
//     } catch (error) {
//         res.status(400).json(error);
//     }
// });

// Delete

router.delete("/all/:id", async (req, res) => {
    try {
        res.json(await Build.findByIdAndRemove(req.params.id));
    } catch (error) {
        res.status(400).json(error);
    }
});




module.exports = router;