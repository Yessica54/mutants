import { Request, Response} from "express";
import MutantsService from './mutants.service';
import {Adn} from '../commons/models/adn';

export class MutantController {

    /**
     * Allows to verify if it is a mutant
     * @param req Request
     * @param res Response
     * @returns Promise<Response> 
     */
    public async isMutant(req: Request, res: Response) : Promise<Response>  {
        const error =this.validRequest(req)

        if(error){
            res.status(400).send(error);
            return res
        }

        const mutantService = new MutantsService(Adn);
        const result = await mutantService.isMutant(req.body.dna);
        mutantService.register(req.body.dna,result)
        if(result){
            res.status(200).send("Es un mutante");
        }else{
            res.status(403).send("No es un mutante");
        }

        return res
    }

    /**
     * validate the request
     * @param req Request
     * @returns string
     */
    private validRequest(req: Request): string{
        let error: string;
        let dna: string[];
        if(!req.body.dna){
            error="Debe proporsionar un ADN"
        }else{
            dna = req.body.dna
            const regexp = new RegExp('^[ATCGatcg]+$')
            const errorInSecuence = dna.map(x => regexp.test(x)).filter(x => !x)
            if(errorInSecuence.length > 0)
                error= "La secuencia de adn no es correcta"
        }

        return error;
    }
}