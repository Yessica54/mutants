import { Request, Response} from "express";
import MutantsService from './mutants.service';
import {Adn} from '../commons/models/adn';

export class MutantController {

    public async isMutant(req: Request, res: Response) : Promise<Response>  {
        let error =this.validRequest(req)

        if(error){
            res.status(400).send(error);
            return res
        }

        const mutantService = new MutantsService(Adn);
        let result = await mutantService.isMutant(req.body.dna);
        mutantService.register(req.body.dna,result)
        if(result){
            res.status(200).send("Es un mutante");
        }else{
            res.status(403).send("No es un mutante");
        }

        return res
    }

    private validRequest(req: Request): string{
        let error: string;
        let dna: string[];
        if(!req.body.dna){
            error="Debe proporsionar un ADN"
        }else{
            dna = req.body.dna
            let regexp = new RegExp('^[ATCGatcg]+$')
            let errorInSecuence = dna.map(x => regexp.test(x)).filter(x => !x)
            if(errorInSecuence.length > 0)
                error= "La secuencia de adn no es correcta"
        }
    
        return error;
    }
}