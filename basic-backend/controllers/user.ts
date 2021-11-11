import express from "express";
import * as userService from '../services/user';

const router = express.Router();

router.post('/', validateUser, (req, res) => {
    const message = {username: req.body.username, password: req.body.password};

    userService.registerUser(message, (err: Error | null, data: any) => {
        if (err) {
            res.status(500);
            res.send(err.message);
        } else {
            res.send(data);
        }
    });
});
router.get('/', (req, res) => {
    const containsString = req.query.contains;
    userService.listUsers(containsString, (err: Error | null, data: any) => {
        if (err) {
            res.status(500);
            res.send(err.message);
        } else {
            res.send(data);
        }
    });
});

function validateUser(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (req.body.username && req.body.password) {
        next();
    } else {
        res.status(400);
        res.send('Body validation failed');
    }
}

export {router as userController}