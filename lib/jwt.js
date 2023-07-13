var jwt = require('jsonwebtoken');
var SECRET = process.env.JWT_SECRET;

class JWT {
    createAccessToken(data) {
        var token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 90),
            data: data
        }, SECRET);
        return token;
    };

    validateToken(token) {
        try {
            var decoded = jwt.verify(token, SECRET);
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    getDecoded(token) {
        try {
            return jwt.decode(token);
        } catch (err) {
            console.log(err);
            return null;
        }
    }
}

module.exports = JWT;