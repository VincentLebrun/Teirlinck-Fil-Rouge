const Order = require("../models/order");
module.exports = {
    getAll(req, res) {
        Order.find().then(orders => {
            res.send(orders);
        });
    },
    get(req, res) {
        const id = req.params.id;
        Order.findById(id).then(order => {
            res.send(order);
        });
    },
    create(req, res) {
        console.log(req.body);
        const order = new Order({
            numero: req.body.numero,
            products: req.body.cart.items,
            total:req.body.cart.total,
            date: req.body.date,
            user_id: req.body.user_id,
            user_firstname: req.body.user_firstname,
            user_lastname:req.body.user_lastname,
            user_phone:req.body.user_phone,
            delivered: req.body.delivered,
            ready: req.body.ready
        });
        order.save().then(() => {
            res.send({ result: `Création de la commande n° ${order.numero}` });
        });
    },
    update(req, res) {
        console.log(req.body);
        const id = req.body._id;
        if (id) {
            Order.findByIdAndUpdate(id, req.body).then(order => {
                res.send(`Mise à jour de la commande n° ${order.numero}`);
            });
        } else {
            res.send({ result: "Un id est nécessaire pour mettre à jour la commande" });
        }
    },
    delete(req, res) {
        const id = req.body._id;
        Order.findByIdAndRemove(id).then(order => {
            res.send({ result: `Suppression de la commande n° ${order.numero}` });
        });
    }
}