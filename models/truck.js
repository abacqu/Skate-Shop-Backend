const mongoose = require('mongoose');

const truckSchema = new mongoose.Schema({
    name: {type: String},
    img: {type: String},
    price: {type: String}
});

const Truck = mongoose.model('Truck', truckSchema)

module.exports = Truck;