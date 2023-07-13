const JWTManager = require('../lib/jwt');
const logger = require('../lib/logger');
const jwt = new JWTManager();

const allowedPaths = [
    '/api/user/superuser',
    '/api/user/login',
]

module.exports = function (req, res, next) {
    if (!req.originalUrl.startsWith('/api')) {
        next();
    } else if (allowedPaths.includes(req.originalUrl)) {
        next();
    } else {
        let token = req.header('Authorization');
        if (token) {
            let isValid = jwt.validateToken(token.replace('Bearer ', ''));
            if (isValid) {
                next()
            } else {
                logger.warn("Unauthorized! Token is not valid!");
                res.status(401).send({ message: "Unauthorized!", detail: "Token is not valid!" });
            }
        } else {
            logger.warn("Unauthorized! Token not found.");
            res.status(401).send({ message: "Unauthorized!", detail: "Token not found." });
        }
    }
};