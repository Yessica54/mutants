import { Response} from "express";
import StatsService from './stats.service';
import {Adn} from '../commons/models/adn';


export const getStats =  async(res: Response): Promise<Response> => {
    try {
        const userServiceInstance = new StatsService(Adn);
        const user = await userServiceInstance.getStats();
        res.status(200).send(user);
    } catch (e) {
        res.status(500).send("Ha ocurrido un error: "+e.message);
    }

    return res;
}
