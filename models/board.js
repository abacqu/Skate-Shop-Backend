const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
    name: { type: String},
    image: { type: String},
    smallimg: { type: String },
    price: { type: Number},
    width: { type: String }
});

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;