const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    id: Number,
    name: String,
    description: String,
    image: String,
    categories: [String],
    allergenes: [String],
    price_type: String,
    price: Number,
    promotion: Boolean,
    highlighted: Boolean,
    available: Boolean
});

const Product = mongoose.model("product", ProductSchema);


module.exports = Product;