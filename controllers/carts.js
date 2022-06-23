const express = require('express');
const Cart = require('../models/cart');
const Build = require('../models/build');
const admin = require('firebase-admin');


const cartRouter = express.Router();

// Cart Get Route

cartRouter.get("/cart", async (req, res) => {
    try {
        // const googleId = req.user.uid;
        const cart = await Cart.find({ });
        res.json(cart);
    } catch (error) {
        res.status(400).json(error);
    }
});

//   Creates Cart Item

  cartRouter.post('/cart', async (req, res) => {
    try {
        console.log(req.user);
        if(req.body.premade) {
            const premade = await Build.findById(req.body.premade);
            const cart = await Cart.create({ googleId: req.user.uid, buildId: req.body.premade, quantity: req.body.quantity, price: (premade.price * req.body.quantity)}); 
            
            
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

cartRouter.put('/cart/:id', async (req, res) => {
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

cartRouter.delete("/cart/:id", async (req, res) => {
    try {
      res.json(await Cart.findByIdAndRemove(req.params.id));
    } catch (error) {
      res.status(400).json(error);
    }
  });


module.exports = cartRouter;