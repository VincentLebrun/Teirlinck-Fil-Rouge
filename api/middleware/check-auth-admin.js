const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY)
        if(decoded.userAdmin) {
            next();
        }else {
            res.sendStatus(401);
        }
}