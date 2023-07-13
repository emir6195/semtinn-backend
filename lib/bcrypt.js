const bcrypt = require('bcrypt');

class Bcrypt {

    constructor() {
        this.saltRounds = 10;
    }

    hashPassword(password) {
        return bcrypt.hashSync(password, this.saltRounds);
    }

    validateUser(password, hashedPassword) {
        return bcrypt.compareSync(password, hashedPassword);
    }

}

module.exports = Bcrypt;