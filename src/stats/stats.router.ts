
/**
 * Required External Modules and Interfaces
 */

import express, {Request, Response} from "express";
import * as StatsController from './stats.controller';

export const statsRouter = express.Router()

statsRouter.get("/", async (req: Request, res: Response) => {
    return StatsController.getStats(res)
});
