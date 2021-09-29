import {Reponse} from './response.interface'

export default class StatsService {

    private adnModel

    constructor(
        adnModel
    ) {
        this.adnModel = adnModel
    }

    public async getStats(): Promise<Reponse> {
        let res: Reponse
        const countMutant =   await this.adnModel.countDocuments({isMutant: true}).exec()
        const countNoMutant =  await this.adnModel.countDocuments({isMutant: false}).exec()
        
        res = {
            count_human_dna: countNoMutant,
            count_mutant_dna: countMutant,
            ratio: this.getRatio(countMutant, countNoMutant)
        }
    
        return res;
    }

    private getRatio(mutant: number, noMutant: number){
        return noMutant === 0 ? mutant : mutant/noMutant
    }
}