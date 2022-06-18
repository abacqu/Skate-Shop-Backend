const mongoose = require('mongoose');

const bearingSchema = new mongoose.Schema({
    name: {type: String},
    img: {type: String},
    price: {type: Number}
})

const Bearing = mongoose.model('Bearing', bearingSchema);

module.exports = Bearing;