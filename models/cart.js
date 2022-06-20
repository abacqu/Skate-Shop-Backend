const mongoose = require('mongoose');
const { Schema } = mongoose;

const cartSchema = new mongoose.Schema({
    buildId: {type: Schema.Types.ObjectId, ref: 'Build'},
    quantity: {type: Number},
    price: {type: Number}
})

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;