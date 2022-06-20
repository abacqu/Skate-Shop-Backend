///////// DEPENDENCIES //////////
const express = require('express');
const Board = require('../models/board');
const finishedBoards = require('../boards.json');
const Trucks = require('../models/truck');
const Wheels = require('../models/wheel');
const Bearings = require('../models/bearing');
const Build = require('../models/build');
const Custom = require('../models/custom');
const Cart = require('../models/cart');

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
        const allPieces = [trucks, boards, wheels, bearings]
        res.json(allPieces); 
    } catch (error) {
        res.status(400).json(error);
    }
});

router.post('/create', async (req, res) => {
    try {
        const boardChoice = await Board.findById(req.body.boardId);
        const boardWidth = boardChoice.width[req.body.boardWidth];
        const truckChoice = await Trucks.findById(req.body.truckId);
        const wheelChoice = await Wheels.findById(req.body.wheelId);
        const bearChoice = await Bearings.findById(req.body.bearingId);
        res.json([boardChoice, boardWidth, truckChoice, wheelChoice, bearChoice]);
    }
    catch (error) {
        res.status(400).json(error);
    }
});

// get route for basic custom

router.get("/custom", async (req, res) => {
    try {
        const customs = await Custom.find({});
        res.json(customs);
    } catch (error) {
        res.status(400).json(error);
    }
});

// create basic custom

router.post('/custom', async (req, res) => {
    try {
        res.json(await Custom.create(req.body));
    } catch (error) {
        res.status(400).json(error);
    }
});

// Update basic custom

router.put('/custom/:id', async (req, res) => {
    try {
        res.json(await Custom.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true }
        ));
    } catch (error) {
        console.log('error: ', error);
        res.json({error: 'something went wrong - check console'});
    }
});

// Deletes basic custom

router.delete("/custom/:id", async (req, res) => {
    try {
      res.json(await Custom.findByIdAndRemove(req.params.id));
    } catch (error) {
      res.status(400).json(error);
    }
  });

// Creates Cart Item

  router.post('/cart', async (req, res) => {
    try {
        if(req.body.premade) {
            console.log('hello i is here');
            const premade = await Build.findById(req.body.premade);

            const cart = await Cart.create({buildId: req.body.premade}); 
            console.log('premade id is: '+premade._id);
            // const cart = await Cart.create({buildId: premade._id});
           
            // console.log(JSON.stringify(await cart.populate('buildId')));

    
            
            res.json([await cart.populate(
                'buildId'
                // populate: 
                // {
                //     path: 'boardId',
                //     model: 'Board'
                // }
            )
        ]);
        } 
        else {
            const board = await Board.findById(req.body.boardId);
            const wheel = await Wheels.findById(req.body.wheelId);
            const truck = await Trucks.findById(req.body.truckId);
            const bear = await Bearings.findById(req.body.bearingId);

            
            const price = (board.price + wheel.price + truck.price + bear.price) * req.body.quantity;

            res.json([board, wheel, truck, bear, price]);
        }
    }
    catch (error) {
        res.status(400).json(error);
    }

});

//Updates Cart Item

router.put('/cart/:id', async (req, res) => {
    try {
        res.json(await Cart.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true }
        ));
    } catch (error) {
        console.log('error: ', error);
        res.json({error: 'something went wrong - check console'});
    }
});

// Deletes Cart Item

router.delete("/cart/:id", async (req, res) => {
    try {
      res.json(await Cart.findByIdAndRemove(req.params.id));
    } catch (error) {
      res.status(400).json(error);
    }
  });


router.post('/checkout', async (req, res) => {
    if(req.body.premade) {
        const quantity = req.body.quantity;
        const premade = await Build.findById(req.body.premade);
        const newOrder = new Order({board: premade.boardId, wheel: premade.wheelId, truck: premade.truckId, bearing: premade.bearingId, qty: quantity});

        newOrder.save(function (err) {
            if (err) return handleError(err);
        });
        res.json(newOrder._id);
    } 
    else {
        const board = await Board.findById(req.body.boardId);
        const wheel = await Wheels.findById(req.body.wheelId);
        const truck = await Trucks.findById(req.body.truckId);
        const bearing = await Bearings.findById(req.body.bearingId);
        const quantity = req.body.quantity;

        const newOrder = new Order({board: board._id, wheel: wheel._id, truck: truck._id, bearing: bearing._id, qty: quantity});

        newOrder.save(function(err) {
            if(err) return handleError(err);
        });
        res.json(newOrder._id);
    }
});

router.get('/searchOrder/:id', async (req, res) => {
    //assuming order table exists
    res.json(Order.findById(req.params.id));
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