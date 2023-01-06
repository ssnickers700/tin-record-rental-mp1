const jwt = require("jsonwebtoken");
const config = require("../config/auth/key");

module.exports = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    let errFlag = false;
    if (!token) {
        return res.sendStatus(401);
    }
    jwt.verify(token, config.secret, (err, user) => {
        if (err) {
            errFlag = true;
            return;
        }
        req.user = user;
    })
    if (errFlag) {
        return res.sendStatus(403);
    }
    next();
}