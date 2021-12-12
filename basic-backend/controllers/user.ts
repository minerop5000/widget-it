import express from "express";
import * as userService from '../services/user';

const router = express.Router();

router.post('/login', validateUser, (req, res) => {
    const message = {username: req.body.username, password: req.body.password};

    userService.loginUser(message, (err: Error | null, data: any) => {
        if (err) {
            res.status(401);
            res.send(err.message);
        } else {
            res.send(data);
        }
    });
});

router.post('/register', validateRegisterUser, (req, res) => {
    const message = {username: req.body.username, password: req.body.password, email: req.body.email};

    userService.registerUser(message, (err: Error | null, data: any) => {
        if (err) {
            res.status(400);
            res.send(err.message);
        } else {
            res.send(data);
        }
    });
});

router.post('/changePassword', validateChangePassword, (req, res) => {
    const message = {username: req.body.username, password: req.body.password, newPassword: req.body.newPassword};

    userService.loginUser(message, (err: Error | null, data: any) => {
        if (err) {
            res.status(401);
            res.send(err.message);
        } else {
            // user verification successful
            userService.changePassword(message, (err: Error | null, data: any) => {
                if (err) {
                    res.status(500);
                    res.send(err.message);
                } else {
                    res.send("password successfully changed");
                }
            });
        }
    });
});

router.post('/settings', validateSettings, (req, res) => {


    const message2 = {_id: req.body._id, settings: req.body.settings};
    userService.setSettings(message2, (err: Error | null, data: any) => {
        if (err) {
            res.status(400);
            res.send(err.message);
        } else {
            res.json(data);
        }
    });
});

router.post('/getUserInfo', validateUserId, (req, res) => {
    userService.getUserInfo(req.body._id, (err: Error | null, data: any) => {
        if (err) {
            res.status(500);
            res.send(err.message);
        } else {
            if (data.length == 0) {
                res.status(401);
                res.send("user not found");
                return
            }
            data = data[0]
            res.status(200).send({
                "username": data.username,
                "email": data.email,
                "settings": data.settings,
                "_id": data._id
            });
        }
    });
});

router.get('/numberOfUser', (req, res) => {
    userService.getNumberOfUser((err: Error | null, data: any) => {
        if (err) {
            res.status(500);
            res.send(err.message);
        } else {
            res.status(200).send({numberOfUsers: data});
        }
    });
});

function validateRegisterUser(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (req.body.username && req.body.email && req.body.password) {
        next();
    } else {
        res.status(400);
        res.send('Body validation failed');
    }
}

function validateChangePassword(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (req.body.username && req.body.password && req.body.newPassword) {
        next();
    } else {
        res.status(400);
        res.send('Body validation failed');
    }
}

function validateUser(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (req.body.username && req.body.password) {
        next();
    } else {
        res.status(400);
        res.send('Body validation failed');
    }
}

function validateSettings(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (req.body._id && req.body.settings) {
        next();
    } else {
        res.status(400);
        res.send('Body validation failed');
    }
}

function validateUserId(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (req.body._id) {
        next();
    } else {
        res.status(400);
        res.send('Body validation failed');
    }
}

export {router as userController}
