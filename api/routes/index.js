const ProductController = require("../controllers/product");

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
}