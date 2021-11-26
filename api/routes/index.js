const ProductController = require("../controllers/product");
const UserController = require("../controllers/user");
const OrderController = require("../controllers/order");
const checkAuth = require("../middleware/check-auth");
const checkAuthAdmin = require("../middleware/check-auth-admin");
const multer = require("multer");
const sharp = require("sharp");
const storage = multer.memoryStorage();
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const User = require("../models/user");

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "teirlinck.boucherie@gmail.com",
    pass: "jxqikpgtlupqlqyd",
  },
});

// MULTER INITIALIZATION

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './uploads/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, new Date().toISOString().replace(/:|\./g, '') + '-' + file.originalname)
//   }
// });

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

module.exports = (server) => {
  // PRODUITS
  server.get("/products", (req, res) => {
    ProductController.getAll(req, res);
  });

  server.get("/products/:id", (req, res) => {
    ProductController.get(req, res);
  });

  server.post(
    "/products",
    checkAuth,
    checkAuthAdmin,
    upload.single("productImage"),
    async (req, res) => {
      console.log(req.file);

      const id = new Date().toISOString().replace(/:|\./g, "");

      const path = "uploads/" + id + "-" + req.file.originalname + ".webp";

      try {
        await sharp(req.file.buffer)
          .webp({ quality: 80 })
          .resize({ width: 350, height: 350 })
          .toFile("./uploads/" + id + "-" + req.file.originalname + ".webp");
      } catch (error) {
        console.log("error while processing image", error);
      }

      ProductController.create(req, res, path);
    }
  );

  server.put(
    "/products",
    checkAuth,
    checkAuthAdmin,
    upload.single("productImage"),
    async (req, res) => {
      const id = new Date().toISOString().replace(/:|\./g, "");

      const path = "uploads/" + id + "-" + req.file.originalname + ".webp";

      try {
        await sharp(req.file.buffer)
          .webp({ quality: 80 })
          .resize({ width: 350, height: 350 })
          .toFile("./uploads/" + id + "-" + req.file.originalname + ".webp");
      } catch (error) {
        console.log("error while processing image", error);
      }

      ProductController.update(req, res, path);
    }
  );

  server.delete("/products", checkAuth, checkAuthAdmin, (req, res) => {
    ProductController.delete(req, res);
  });

  // UTILISATEURS

  server.get("/users", checkAuth, checkAuthAdmin, (req, res, next) => {
    UserController.getAll(req, res);
  });

  server.post("/users", async (req, res) => {
    UserController.create(req, res);
  });

  server.put("/users", checkAuth, checkAuthAdmin, async (req, res) => {
    UserController.update(req, res);
  });

  server.delete("/users", checkAuth, checkAuthAdmin, (req, res) => {
    UserController.delete(req, res);
  });
  server.put("/resetpassword/", (req, res) => {
    User.findOne(
      {
        resetToken: req.body.token,
        expireToken: { $gt: Date.now() },
      },
      function (err, user) {
        if (!user) {
          return res.status(401);
        }
        // Save

        user.password = req.body.password;
        user.resetToken = undefined;
        user.expireToken = undefined;
        console.log(user);
        user.save((err) => {
          if (err) return res.status(500).json({ message: err.message });
        });
        return res.status(200);
      }
    );
  });

  // COMMANDES

  server.get("/orders", checkAuth, checkAuthAdmin, (req, res) => {
    OrderController.getAll(req, res);
  });

  server.get("/orders/:id", (req, res) => {
    OrderController.get(req, res);
  });

  server.post("/orders", checkAuth, checkAuthAdmin, async (req, res) => {
    OrderController.create(req, res);
  });

  server.put("/orders", checkAuth, checkAuthAdmin, async (req, res) => {
    OrderController.update(req, res);
  });

  server.delete("/orders", checkAuth, checkAuthAdmin, (req, res) => {
    OrderController.delete(req, res);
  });

  //LOGIN

  server.post("/login", async (req, res) => {
    UserController.login(req, res);
  });

  server.post("/resetpassword", (req, res, err) => {
    crypto.randomBytes(16, (err, buffer) => {
      if (err) {
        console.log(err);
      }
      const token = buffer.toString("hex");
      const email = req.body.mail;
      console.log(token);
      User.findOne({ mail: email }).then((user) => {
        if (!user) {
          return res.status(422).json({
            error:
              "Votre demande a été prise en compte, veuillez vérifier votre boite mail",
          });
        }
        console.log(token);
        user.resetToken = token;
        user.expireToken = Date.now() + 3600000;
        user.save().then((res) => {
          transporter.sendMail({
            to: email,
            from: `Boucherie Teirlinck <teirlinck.boucherie@gmail.com>`,
            subject: "Changement de mot de passe",
            html:
              "<p>Vous avez sollicité un changement de mot de passe</p><h5>Cliquez sur ce <a href='http://localhost:3000/resetpassword/" +
              token +
              "' >lien</a> pour le changer </h5>",
          });
          // res.json({ message: "Validez votre e-mail" });
        });
        console.log(token);
        //
      });
    });
  });
};
