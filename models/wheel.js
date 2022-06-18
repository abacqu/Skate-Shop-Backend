const mongoose = require('mongoose');

const wheelSchema = new mongoose.Schema({
    name: { type: String },
    img: { type: String },
    price: { type: Number }
})

const Wheel = mongoose.model( 'Wheel', wheelSchema );

module.exports = Wheel;