const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    numero: Number,
    products: [{
        id: String,
        name: String,
        image: String,
        price_type: String,
        price: Number,
        quantity: Number
    }],
    total: Number,
    date: Number,
    commandDate: Date,
    commandPeriod: String,
    commandComment: String,
    user_id: String,
    user_firstname: String,
    user_lastname: String,
    user_phone: String,
    delivered: Boolean,
    ready: Boolean
});

const Order = mongoose.model("order", OrderSchema);


module.exports = Order;