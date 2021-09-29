
import express, {Request, Response} from "express";
import {MutantController} from './mutants.controller';

export const mutantsRouter = express.Router()

mutantsRouter.post("/", async (req: Request, res: Response) => {
    const mutantController = new MutantController()
    return mutantController.isMutant(req, res)
});