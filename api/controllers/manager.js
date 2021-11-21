const Manager = require("../models/manager");


module.exports = {
    get(req, res) {
        const id = req.params.id;
        Manager.findById(id).then(manager => {
            res.send(manager);
        });
    },
    update(req, res) {
        console.log(req.body);
        const id = req.body._id;
        res.send(id);
        if (id) {
            Manager.findByIdAndUpdate(id, req.body).then(manager => {

            });
        } else {
            res.send({ result: "Un id est nécessaire pour mettre à jour les paramètres administrator" });
        }
    }
}