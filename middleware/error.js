const logger = require('../lib/logger');

module.exports = function (err, req, res, next) {
    if (err) {
        logger.error({err:err.stack});
        res.status(500).send({err:err.stack});
    }
}