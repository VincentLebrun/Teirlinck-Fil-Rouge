const ProductController = require("../controllers/product");
const UserController = require("../controllers/user");
const OrderController = require("../controllers/order");
const checkAuth = require("../middleware/check-auth");

module.exports = server => {

    // PRODUITS
    server.get("/products", (req, res) => {
        ProductController.getAll(req, res);
    });

    server.get("/products/:id", (req, res) => {
        ProductController.get(req, res);
    });

    server.post("/products", checkAuth,  async (req, res) => {
        ProductController.create(req, res);
    });

    server.put("/products", checkAuth, async (req, res) => {
        ProductController.update(req, res);
    });

    server.delete("/products",checkAuth, (req, res) => {
        ProductController.delete(req, res);
    });

    // UTILISATEURS

    server.get("/users", checkAuth, (req, res, next) => {
        UserController.getAll(req, res);
    });

    server.get("/users/:id", checkAuth, (req, res) => {
        UserController.get(req, res);
    });

    server.post("/users", async (req, res) => {
        UserController.create(req, res);
    });

    server.put("/users", checkAuth, async (req, res) => {
        UserController.update(req, res);
    });

    server.delete("/users", checkAuth, (req, res) => {
        UserController.delete(req, res);
    });

    // COMMANDES 

    server.get("/orders", checkAuth, (req, res) => {
        OrderController.getAll(req, res);
    });

    server.get("/orders/:id", checkAuth, (req, res) => {
        OrderController.get(req, res);
    });

    server.post("/orders", checkAuth, async (req, res) => {
        OrderController.create(req, res);
    });

    server.put("/orders", checkAuth, async (req, res) => {
        OrderController.update(req, res);
    });

    server.delete("/orders", checkAuth, (req, res) => {
        OrderController.delete(req, res);
    });

    //LOGIN

    server.post("/login", async (req, res) => {
        UserController.login(req, res);
    });
}

