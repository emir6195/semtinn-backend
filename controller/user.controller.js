const userModel = require('../database/user.model');
const Bcrypt = require('../lib/bcrypt');
const JWT = require('../lib/jwt');

class User {
    constructor(params = {}) {
        this.params = params;
    }

    async create() {
        let bcrypt = new Bcrypt();
        this.params.password = bcrypt.hashPassword(this.params.password);
        return await userModel.create(this.params);
    }

    async update() {
        return await userModel.updateOne({ _id: this.params?._id }, this.params);
    }

    async delete() {
        return await userModel.deleteOne({ _id: this.params?._id });
    }

    async authenticate() {
        let message;
        let success;
        let token;
        if (this.params.email && this.params.password) {
            let user = await userModel.findOne({ email: this.params.email }) || [];
            if (user?.password) {
                let bcrypt = new Bcrypt();
                let isAuthentiated = bcrypt.validateUser(this.params.password, user.password);
                if (isAuthentiated) {
                    let jwt = new JWT();
                    user.password = null;
                    token = jwt.createAccessToken(user);
                    success = true;
                    message = "Login successful!"
                } else {
                    token = null;
                    success = false;
                    message = "Username or password is wrong!"
                }
            } else {
                return { token: null, success: false, message: "User not found!" }
            }
        } else {
            throw new Error("Email and password is required!");
        }
        return { token, success, message };
    }

    async count() {
        return await userModel.countDocuments();
    }
}

module.exports = User;