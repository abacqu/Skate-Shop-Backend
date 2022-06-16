const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
    name: { type: String},
    wheel: { type: String},
    truck: { type: String},
    bearing: { type: String},
    image: { type: String},
    price: { type: Number}
});

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;