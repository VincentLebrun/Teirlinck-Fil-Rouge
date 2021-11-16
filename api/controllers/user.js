const { LoginOutlined } = require("@ant-design/icons");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { Result } = require("antd");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
var handlebars = require("handlebars");
let fs = require("fs");

let readHTMLFile = function (path, callback) {
  fs.readFile(path, { encoding: "utf-8" }, function (err, html) {
    if (err) {
      throw err;
      callback(err);
    } else {
      callback(null, html);
    }
  });
};

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: "teirlinck.boucherie@gmail.com",
    pass: "jxqikpgtlupqlqyd",
  },
});

module.exports = {
  getAll(req, res) {
    User.find().then((users) => {
      res.send(users);
    });
  },
  get(req, res) {
    const id = req.params.id;
    User.findById(id).then((user) => {
      res.send(user);
    });
  },
  create(req, res) {
    console.log(req.body);
    User.find({ mail: req.body.mail })
      .exec()
      .then((user) => {
        if (user.length >= 1) {
          return res.status(409).json({
            message: "Mail exists",
          });
        } else {
          const user = new User({
            id: req.body.id,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            mail: req.body.mail,
            password: req.body.password,
            phone: req.body.phone,
            admin: req.body.admin,
            validated: req.body.validated,
            resetPasword: req.body.resetPasword,
          });
          user.save().then(() => {
            readHTMLFile(
              process.cwd() + "/views/createAccountTemplate.html",
              function (err, html) {
                let template = handlebars.compile(html);
                let replacements = {
                  firstname: req.body.firstname,
                };
                let htmlToSend = template(replacements);
                transporter
                  .sendMail({
                    from: `Boucherie Teirlinck <teirlinck.boucherie@gmail.com>`,
                    to: req.body.mail,
                    subject:
                      "Félicitation pour votre inscription sur boucherie-teirlinck.fr",
                    html: htmlToSend,
                    attachments: [
                      {
                        filename: "teirlinck.png",
                        path: process.cwd() + "/views/images/teirlinck.png",
                        cid: "image",
                      },
                    ],
                  })
                  .catch((err) => {
                    console.log(err);
                  });
                res.send({
                  result: `Création de l'utilisateur ${user.firstname}`,
                });
              }
            );
          });
        }
      });
  },
  update(req, res) {
    console.log(req.body);
    const id = req.body._id;
    if (id) {
      User.findByIdAndUpdate(id, req.body).then((user) => {
        res.send(`Mise à jour de l'utilisateur ${user.firstname}`);
      });
    } else {
      res.send({
        result: "Un id est nécessaire pour mettre à jour l'utilisateur",
      });
    }
  },
  delete(req, res) {
    const id = req.body._id;
    User.findByIdAndRemove(id).then((user) => {
      res.send({ result: `Suppression de l'utilisateur ${user.firstname}` });
    });
  },
  login(req, res) {
    User.find({ mail: req.body.mail })
      .exec()
      .then((user) => {
        if (user.length < 1) {
          return res.status(401).json({
            message: "Auth failed",
          });
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          if (err) {
            return res.status(401).json({
              message: "Auth failed",
            });
          }
          if (result) {
            const token = jwt.sign(
              {
                mail: user[0].mail,
                userId: user[0]._id,
                userFirstName: user[0].firstname,
                userLastname: user[0].lastname,
                userPhone: user[0].phone,
                userAdmin: user[0].admin,
                userValidated: user[0].validated,
              },
              process.env.JWT_KEY,
              {
                expiresIn: "2h",
              }
            );
            return res.status(200).json({
              message: "Auth successful",
              token: token,
            });
          }
          res.status(401).json({
            message: "Auth failed",
          });
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  },
};
