const mongoose = require('mongoose');
const { Schema } = mongoose;

const buildSchema = new mongoose.Schema({
    name: {type: String},
    boardId: {type: Schema.Types.ObjectId, ref: 'Board'},
    bearingId: {type: Schema.Types.ObjectId, ref: 'Bearing'},
    truckId: {type: Schema.Types.ObjectId, ref: 'Truck'},
    wheelId: {type: Schema.Types.ObjectId, ref: 'Wheel'},
    price: {type: Number}
})

const Build = mongoose.model('Build', buildSchema);

module.exports = Build;