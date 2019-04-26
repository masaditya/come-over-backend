const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).send("Auth request")
    }
    let token = req.headers.authorization.split(" ")[1];
    if (token == "null") {
        return res.status(401).send("Auth request")
    }
    let payload = jwt.verify(token, "secret");
    if (!payload) {
        return res.status(401).send("Auth request")
    }
    req.userId = payload.subject;
    next();
}