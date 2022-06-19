const mongoose = require('mongoose');

const customSchema = new mongoose.Schema({
    name: {type: String},
})

const Custom = mongoose.model('Custom', customSchema);

module.exports = Custom;