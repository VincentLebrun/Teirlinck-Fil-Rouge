const ProductController = require("../controllers/product");
const UserController = require("../controllers/user");
const OrderController = require("../controllers/order");

module.exports = server => {    
    
    // PRODUITS
    server.get("/products", (req, res) => {
        ProductController.getAll(req, res);
    });

    server.get("/products/:id", (req, res) => {
        ProductController.get(req, res);
    });

    server.post("/products", async (req, res) => {
        ProductController.create(req, res);
    });

    server.put("/products", async (req, res) => {
        ProductController.update(req, res);
    });

    server.delete("/products", (req, res) => {
        ProductController.delete(req, res);
    });

    // UTILISATEURS

    server.get("/users", (req, res) => {
        UserController.getAll(req, res);
    });

    server.get("/users/:id", (req, res) => {
        UserController.get(req, res);
    });

    server.post("/users", async (req, res) => {
        UserController.create(req, res);
    });

    server.put("/users", async (req, res) => {
        UserController.update(req, res);
    });

    server.delete("/users", (req, res) => {
        UserController.delete(req, res);
    });

    // COMMANDES 
    
    server.get("/orders", (req, res) => {
        OrderController.getAll(req, res);
    });

    server.get("/orders/:id", (req, res) => {
        OrderController.get(req, res);
    });

    server.post("/orders", async (req, res) => {
        OrderController.create(req, res);
    });

    server.put("/orders", async (req, res) => {
        OrderController.update(req, res);
    });

    server.delete("/orders", (req, res) => {
        OrderController.delete(req, res);
    });
}