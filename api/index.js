const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/index");
const cors = require('cors')
const server = express();
require("dotenv").config();

server.use(cors());
server.use(express.json());
routes(server);

server.use('/uploads', express.static('./uploads'));

mongoose.set('useFindAndModify', false);

server.listen(4000, () => {
    console.log("Ecoute sur le port 4000");

    mongoose.connect("mongodb://localhost/teirlinck", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    mongoose.connection
        .once("open", () => console.log("Connexion à MongoDB ok"))
        .on("error", error => console.warn("Problème durant la connexion", error));
});

server.get("/bonjour", (req, res) => {
    // console.log("Hello World !");
    res.send({
        result: "Hello World !"
    })
});