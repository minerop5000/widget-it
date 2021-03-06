import express from "express";
import * as moduleService from '../services/module';

const router = express.Router();

router.get('/:id', (req, res) => {
    moduleService.getModule(req.params.id, (err: Error | null, data: any) => {
        if (err) {
            res.status(500);
            res.send(err.message);
        } else {
            if (data.length == 0) {
                res.status(404).send({"message": "id not found"});
            } else {
                res.send(data[0]);
            }
        }
    });
});

router.post('/:id', validateModule, (req, res) => {
    moduleService.updateModule(req.params.id, req.body.name, req.body.content, (err: Error | null, num: any, data: any) => {
        if (err) {
            res.status(500);
            res.send(err.message);
        } else {
            if (num == 0) {
                res.status(404).send({message: "id not found"})
            } else {
                res.status(200)
                res.send(data)
            }
        }
    });
});

router.post('/create/:type', validateModule, (req, res) => {
    moduleService.createModule(req.params.type, req.body.name, req.body.content, (err: Error | null, data: any) => {
        if (err) {
            res.status(500);
            res.send(err.message);
        } else {
            res.status(200).send(data)
        }
    });
});

function validateModule(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (req.body.name && req.body.content) {
        next();
    } else {
        res.status(400);
        res.send('Body validation failed');
    }
}

export {router as moduleController}
