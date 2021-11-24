const ProductController = require("../controllers/product");
const UserController = require("../controllers/user");
const OrderController = require("../controllers/order");
const ManagerController = require("../controllers/manager");
const checkAuth = require("../middleware/check-auth");
const checkAuthAdmin = require("../middleware/check-auth-admin");
const multer = require('multer');
const sharp = require('sharp');

const storage = multer.memoryStorage();

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
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

module.exports = (server) => {

  // PRODUITS
  server.get("/products", (req, res) => {
    ProductController.getAll(req, res);
  });

  server.get("/products/:id", (req, res) => {
    ProductController.get(req, res);
  });

  server.post("/products", checkAuth, checkAuthAdmin, upload.single('productImage'), async (req, res) => {
    console.log(req.file);

    const id = new Date().toISOString().replace(/:|\./g, '');

    const path = 'uploads/' + id + '-' + req.file.originalname + '.webp';

    try {
      await sharp(req.file.buffer).webp({ quality: 80 })
        .resize({ width: 350, height: 350 })
        .toFile('./uploads/' + id + '-' + req.file.originalname + '.webp');
    } catch (error) {
      console.log('error while processing image', error)
    }

    ProductController.create(req, res, path);
  });

  server.put("/products", checkAuth, checkAuthAdmin, upload.single('productImage'), async (req, res) => {

    let path = req.body.image;

    if (req.file) {
      const id = new Date().toISOString().replace(/:|\./g, '');

      path = 'uploads/' + id + '-' + req.file.originalname + '.webp';

      try {
        await sharp(req.file.buffer).webp({ quality: 80 })
          .resize({ width: 350, height: 350 })
          .toFile('./uploads/' + id + '-' + req.file.originalname + '.webp');
      } catch (error) {
        console.log('error while processing image', error)
      }
    }



    ProductController.update(req, res, path);
  });

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

  server.post("/resetpassword", (req, res) => {
    crypto.randomBytes(32, (err, buffer) => {
      if (err) {
        console.log(err);
      }
      const token = buffer.toString("hex");
      User.findOne({ email: req.body.email }).then((user) => {
        if (!user) {
          return res.status(422).json({ error: "Cet e-mail n'existe pas " });
        }
        user.resetToken = token;
        user.expireToken = Date.now() + 3600000;
        user.save().then((result) => {
          transporter.sendMail({
            to: user.email,
            from: "no-reply",
            subject: "password reset",
            html: `<p>Vous avez sollicité un changement de mot de passe</p>
                          <h5>Cliquez sur ce <a href="http://localhost:3000/resetpassword${token}" >lien</a> pour le changer </h5>`,
          });
          res.json({ message: "Validez votre e-mail" });
        });
        //
      });
    });
  });


  // MANAGER

  server.get("/manager/:id", (req, res) => {
    ManagerController.get(req, res);
  });


  server.put("/manager", checkAuth, checkAuthAdmin, async (req, res) => {
    ManagerController.update(req, res);
  });

};




