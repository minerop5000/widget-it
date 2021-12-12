import express from 'express'
import * as logger from './util/logger';
import cors from 'cors';
import {userController} from "./controllers/user";
import {moduleController} from "./controllers/module";

const router = express.Router();

router.use(cors());
router.use(express.json());
router.use(logger.logToConsole);

router.use('/user', userController);
router.use('/module', moduleController);

router.use((_req: express.Request, res: express.Response) => {
    res.status(404);
    res.send('Route does not exist');
});

export {router as apiRouter}
