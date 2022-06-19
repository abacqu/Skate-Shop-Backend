///////// DEPENDENCIES //////////
const express = require('express');
const Board = require('../models/board');
const finishedBoards = require('../boards.json');
const Trucks = require('../models/truck');
const Wheels = require('../models/wheel');
const Bearings = require('../models/bearing');
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

router.get("/create", async (req, res) => {
    try {
        const boards = await Board.find({});
        const trucks = await Trucks.find({});
        const wheels = await Wheels.find({});
        const bearings = await Bearings.find({});
        res.json(boards + trucks + wheels + bearings); 
    } catch (error) {
        res.status(400).json(error);
    }
});

router.post('/create', async (req, res) => {
    try{
        const boardChoice = await Board.findById(req.body.boardId);
        const boardWidth = boardChoice.width[req.body.boardWidth];
        const truckChoice = await Trucks.findById(req.body.truckId);
        const wheelChoice = await Wheels.findById(req.body.wheelId);
        const bearChoice = await Bearings.findById(req.body.bearingId);
        res.json(boardChoice + boardWidth + truckChoice + wheelChoice + bearChoice);
    }
    catch (error) {
        res.status(400).json(error);
    }
});

router.post('/cart', async (req, res) => {
    const boardId = req.body.boardId;
    const wheelId = req.body.wheelId;
    const truckId = req.body.truckId;
    const bearId = req.body.bearingId;


});

router.post('/checkout', async (req, res) => {
    const boardId = req.body.boardId;
    const wheelId = req.body.wheelId;
    const truckId = req.body.truckId;
    const bearId = req.body.bearingId;

    const newOrder = new Order({board: boardId, wheel: wheelId, truck: truckId, bearing: bearId});

    newOrder.save(function(err) {
        if(err) return handleError(err);
    });
});


// Delete

router.delete("/all/:id", async (req, res) => {
    try {
        res.json(await Build.findByIdAndRemove(req.params.id));
    } catch (error) {
        res.status(400).json(error);
    }
});




module.exports = router;