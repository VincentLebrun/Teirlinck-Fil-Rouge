const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ManagerSchema = new Schema({
    validCommands: Boolean,
    maintenance: Boolean,
    principalMessage: String,
    lundi: String,
    mardi: String,
    mercredi: String,
    jeudi: String,
    vendredi: String,
    samedi: String,
    dimanche: String,
});

const Manager = mongoose.model("manager", ManagerSchema);


module.exports = Manager;