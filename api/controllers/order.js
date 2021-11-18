const Order = require("../models/order");
const User = require("../models/user");
const nodemailer = require('nodemailer');
var handlebars = require('handlebars');
let fs = require('fs');

let readHTMLFile = function (path, callback) {
    fs.readFile(path, { encoding: 'utf-8' }, function (err, html) {
        if (err) {
            throw err;
            callback(err);
        }
        else {
            callback(null, html);
        }
    });
};

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'teirlinck.boucherie@gmail.com',
        pass: 'jxqikpgtlupqlqyd'
    }
});

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
        const commandDate = new Date(req.body.commandDate);
        console.log(commandDate);
        console.log(new Date());
        if (commandDate && commandDate > new Date()) {
            if (commandDate.getDay() === 2 || commandDate.getDay() === 4) {
                console.log(req.body);
                const order = new Order({
                    numero: req.body.numero,
                    products: req.body.products,
                    total: req.body.total,
                    date: req.body.date,
                    commandDate: req.body.commandDate,
                    commandPeriod: req.body.commandPeriod,
                    commandComment: req.body.commandComment,
                    user_id: req.body.user_id,
                    user_firstname: req.body.user_firstname,
                    user_lastname: req.body.user_lastname,
                    user_phone: req.body.user_phone,
                    delivered: req.body.delivered,
                    ready: req.body.ready
                });
                order.save().then(() => {
                    User.findById(req.body.user_id).then(user => {
                        readHTMLFile(process.cwd() + '/views/commandTemplate.html', function (err, html) {
                            let template = handlebars.compile(html);
                            let replacements = {
                                firstname: req.body.user_firstname,
                                products: req.body.products.map(item => {
                                    const subPriceKg = Number(((item.price * item.quantity) / 1000).toFixed(2));
                                    const subPricePc = Number(((item.price * item.quantity)).toFixed(2));
                                    return (
                                        {
                                            ...item,
                                            subPrice: item.price_type == "/kg" ? subPriceKg : subPricePc,
                                            price_type: item.price_type == "/kg" ? "g" : "pc"
                                        }
                                    )
                                }),
                                total: req.body.total
                            }
                            let htmlToSend = template(replacements);
                            transporter.sendMail({
                                from: `Boucherie Teirlinck <teirlinck.boucherie@gmail.com>`,
                                to: user.mail,
                                subject: 'Votre commande sur boucherie-teirlinck.fr',
                                html: htmlToSend,
                                attachments: [
                                    {
                                        filename: 'teirlinck.png',
                                        path: process.cwd() + '/views/images/teirlinck.png',
                                        cid: "image"
                                    }
                                ]
                            }).catch(err => {
                                console.log(err);
                            })
                        })
                        res.send({ result: `Création de la commande n° ${order.numero}` });
                    })

                });
            }
            else {
                res.send({ result: "Vous ne pouvez pas rentrer une date qui n'est pas mardi ni jeudi" });
            }
        } else {
            res.send({ result: "Vous ne pouvez pas rentrer une date antérieure à la date du jour" });
        }

    },
    update(req, res) {
        console.log(req.body);
        const id = req.body._id;
        if (id) {
            Order.findByIdAndUpdate(id, req.body).then(order => {
                User.findById(req.body.user_id).then(user => {
                    if (req.body.ready) {
                        readHTMLFile(process.cwd() + '/views/commandReadyTemplate.html', function (err, html) {
                            let template = handlebars.compile(html);
                            let replacements = {
                                firstname: req.body.user_firstname
                            }
                            let htmlToSend = template(replacements);
                            transporter.sendMail({
                                from: `Boucherie Teirlinck <teirlinck.boucherie@gmail.com>`,
                                to: user.mail,
                                subject: 'Votre commande est prête, venez la récupérer en boutique !',
                                html: htmlToSend,
                                attachments: [
                                    {
                                        filename: 'teirlinck.png',
                                        path: process.cwd() + '/views/images/teirlinck.png',
                                        cid: "image"
                                    }
                                ]
                            }).catch(err => {
                                console.log(err);
                            })
                        })
                    }
                    res.send(`Mise à jour de la commande n° ${order.numero}`);
                });
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