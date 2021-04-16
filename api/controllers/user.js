const User = require("../models/user");
module.exports = {
    getAll(req, res) {
        User.find().then(users => {
            res.send(users);
        });
    },
    get(req, res) {
        const id = req.params.id;
        User.findById(id).then(user => {
            res.send(user);
        });
    },
    create(req, res) {
        console.log(req.body);
        const user = new User({
            id: req.body.id,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            mail: req.body.mail,
            password: req.body.password,
            phone: req.body.phone,
            admin: req.body.admin,
            validated: req.body.validated,
        });
        user.save().then(() => {
            res.send({ result: `Création de l'utilisateur ${user.firstname}` });
        });
    },
    update(req, res) {
        console.log(req.body);
        const id = req.body._id;
        if (id) {
            User.findByIdAndUpdate(id, req.body).then(user => {
                res.send(`Mise à jour de l'utilisateur ${user.firstname}`);
            });
        } else {
            res.send({ result: "Un id est nécessaire pour mettre à jour l'utilisateur" });
        }
    },
    delete(req, res) {
        const id = req.body._id;
        User.findByIdAndRemove(id).then(user => {
            res.send({ result: `Suppression de l'utilisateur ${user.firstname}` });
        });
    }
}