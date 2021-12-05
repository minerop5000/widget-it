import express from "express";
import * as userService from '../services/user';

const router = express.Router();

router.post('/login', validateUser, (req, res) => {
    const message = {username: req.body.username, password: req.body.password};
    //todo: error handling

    userService.loginUser(message, (err: Error | null, data: any) => {
        if (err) {
            //if (err.message === "wrong password") {
            //   res.status(400).send(err.message)
            //}
            res.status(500);
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

router.post('/settings', validateSettings, (req, res) => {
    const message = {username: req.body.username, password: req.body.password};

    userService.loginUser(message, (err: Error | null, data: any) => {
        if (err) {
            res.status(500);
            res.send(err.message);
        } else {
            // user verification successful

            const message2 = {username: req.body.username, settings: req.body.settings};
            userService.setSettings(message2, (err: Error | null, data: any) => {
                if (err) {
                    res.status(400);
                    res.send(err.message);
                } else {
                    res.send("updated settings");
                }
            });
        }
    });


});

// router.get('/', (req, res) => {
//     const containsString = req.query.contains;
//     userService.listUsers(containsString, (err: Error | null, data: any) => {
//         if (err) {
//             res.status(500);
//             res.send(err.message);
//         } else {
//             res.send(data);
//         }
//     });
// });

function validateRegisterUser(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (req.body.username && req.body.email && req.body.password) {
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
    if (req.body.username && req.body.settings && req.body.password) {
        next();
    } else {
        res.status(400);
        res.send('Body validation failed');
    }
}

export {router as userController}
