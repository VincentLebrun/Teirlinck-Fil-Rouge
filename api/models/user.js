const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    id: Number,
    firstname: String,
    lastname: String,
    mail: String,
    password: String,
    phone: String,
    admin: Boolean,
    validated: Boolean
});

const User = mongoose.model("user", UserSchema);

module.exports = User;