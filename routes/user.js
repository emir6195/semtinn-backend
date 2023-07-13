const router = require('express').Router();
const User = require('../controller/user.controller');


router.post('/', async (req, res, next) => {
    try {
        let user = new User(req.body);
        let result = await user.create();
        res.send(result);
    } catch (error) {
        next(error);
    }
});

router.post('/superuser', async (req, res, next) => {
    try {
        let data = req.body;
        data.role = "SUPERUSER";
        let user = new User(data);
        // first user is always superuser, if there is a user in db method cannot be used.
        if (await user.count() == 0) {
            let result = await user.create();
            res.send(result);
        } else {
            res.status(403).send({err: "You are not allowed to create superuser!"});
        }
    } catch (error) {
        next(error);
    }
});

router.put('/', async (req, res, next) => {
    try {
        let user = new User(req.body);
        let result = await user.update();
        res.send(result);
    } catch (error) {
        next(error);
    }
});

router.delete('/', async (req, res, next) => {
    try {
        let user = new User(req.body);
        let result = await user.delete();
        res.send(result);
    } catch (error) {
        next(error);
    }
});

router.post('/login', async (req, res, next) => {
    try {
        let token;
        let status;
        let message;
        let user = new User(req.body);
        let result = await user.authenticate();
        res.send(result);
    } catch (error) {
        next(error);
    }
});

module.exports = router;