const Product = require("../models/product");
module.exports = {
    getAll(req, res) {
        Product.find().then(products => {
            res.send(products);
        });
    },
    get(req, res) {
        const id = req.params.id;
        Product.findById(id).then(product => {
            res.send(product);
        });
    },
    create(req, res, path) {
        const product = new Product({
            id: req.body.id,
            name: req.body.name,
            description: req.body.description,
            image: path ? path : req.body.productImage,
            categories: req.body.categories,
            allergenes: req.body.allergenes ? req.body.allergenes : [],
            price_type: req.body.price_type,
            price: req.body.price,
            promotion: req.body.promotion,
            highlighted: req.body.highlighted,
            available: req.body.available
        });
        product.save().then(() => {
            res.send({ result: `Création du produit ${product.name}` });
        });
    },
    update(req, res, path) {
        const newProduct = { ...req.body, image: path ? path : req.body.productImage, allergenes: req.body.allergenes ? req.body.allergenes : [] }

        const id = req.body._id;
        if (id) {
            Product.findByIdAndUpdate(id, newProduct).then(product => {
                res.send(`Mise à jour du produit ${product.name}`);
            });
        } else {
            res.send({ result: "Un id est nécessaire pour mettre à jour le produit" });
        }
    },
    delete(req, res) {
        const id = req.body._id;
        Product.findByIdAndRemove(id).then(product => {
            res.send({ result: `Suppression du produit ${product.name}` });
        });
    }
}