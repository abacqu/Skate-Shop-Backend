const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
    
    name: { type: String},
    bigImg: { type: String},
    img: { type: String },
    price: { type: Number},
    width: { type: Array }
});

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;