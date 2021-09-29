import {Reponse} from './response.interface'

export default class StatsService {

    private adnModel

    constructor(
        adnModel
    ) {
        this.adnModel = adnModel
    }

    /**
     * Allows to obtain the stats
     * @returns Promise<Reponse>
     */
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

    /**
     * Allows to obtain ratio
     * @param mutant number
     * @param noMutant number
     * @returns number
     */
    private getRatio(mutant: number, noMutant: number): number{
        return noMutant === 0 ? mutant : mutant/noMutant
    }
}