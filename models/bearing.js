const mongoose = require('mongoose');

const bearingSchema = new mongoose.Schema({
    id: {type: String},
    name: {type: String},
    img: {type: String},
    price: {type: Number}
})

const Bearing = mongoose.model('Bearing', bearingSchema);

module.exports = Bearing;