const ProductController = require("../controllers/product");
const UserController = require("../controllers/user");
const OrderController = require("../controllers/order");

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

    // UTILISATEURS

    server.get("/users", (req, res) => {
        UserController.getAll(req, res);
    });

    server.get("/users/:id", (req, res) => {
        UserController.get(req, res);
    });

    server.post("/users", async (req, res) => {
        UserController.create(req, res);
    });

    server.put("/users", async (req, res) => {
        UserController.update(req, res);
    });

    server.delete("/users", (req, res) => {
        UserController.delete(req, res);
    });

    // COMMANDES 
    
    server.get("/orders", (req, res) => {
        OrderController.getAll(req, res);
    });

    server.get("/orders/:id", (req, res) => {
        OrderController.get(req, res);
    });

    server.post("/orders", async (req, res) => {
        OrderController.create(req, res);
    });

    server.put("/orders", async (req, res) => {
        OrderController.update(req, res);
    });

    server.delete("/orders", (req, res) => {
        OrderController.delete(req, res);
    });
    // server.post('reset-password', (req,res)=>{
    //     crypto.randomBytes(32,(err,buffer)=>{
    //         if(err){
    //             console.log(err)
    //         }
    //         const token = buffer.toString("hex")
    //         User.findOne({email:req.body.email}).then(user=>{
    //             if(!user){
    //                 return res.status(422).json({error:"Cet e-mail n'existe pas "})
    //             }
    //             user.resetToken = token
    //             user.expireToken= Date.now() + 3600000
    //             user.save().then((result)=>{
    //                 transporter.sendMail({
    //                     to:user.email,
    //                     from:"no-reply",
    //                     subject:"password reset",
    //                     html: `<p>Vous avez sollicité un changement de mot de passe</p>
    //                     <h5>Cliquez sur ce <a href="http://localhost:3000/resetpassword${token}" >lien</a> pour le changer </h5>`
    //                 })
    //                 res.json({message:"Validez votre e-mail"})
    //             })
    //             //
    //         })
    //     })
    // })
}