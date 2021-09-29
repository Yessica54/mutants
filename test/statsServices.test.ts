import StatsService from '../src/stats/stats.service';
import {Adn} from '../src/commons/models/adn';
import {IAdn} from '../src/commons/interfaces/IAdn'
import mockingoose from 'mockingoose';
import * as dbHandler from './db';

beforeAll(async () => {
    await dbHandler.connect()
});

afterEach(async () => {
    await dbHandler.clearDatabase()
});

afterAll(async () => {
    await dbHandler.closeDatabase()
});

describe('StatsService', () => {

    it('can consult statistics', async () => {
        for (let index = 0; index < 40; index++) {
            const adn = Adn.build({ adn:["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"].join(), isMutant: true})
            await adn.save() 
        }
        for (let index = 0; index < 100; index++) {
            const adn = Adn.build({ adn:["ATGCCT","CTGTGC","TTGTTG","AGACGG","GCGTCA","TCACIG"].join(), isMutant: false})
            await adn.save() 
        }

        const statsService = new StatsService(Adn)
        let result = await statsService.getStats()
        expect(result).toEqual({ count_human_dna: 100, count_mutant_dna: 40, ratio: 0.4 })
    });

    it('can consult statistics in zero', async () => {
        const statsService = new StatsService(Adn)
        let result = await statsService.getStats()
        expect(result).toEqual({ count_human_dna: 0, count_mutant_dna: 0, ratio: 0 })
    });

    it('can consult mutants is greater than zero and notMutants is zero', async () => {
        const adn = Adn.build({ adn:["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"].join(), isMutant: true})
        await adn.save() 

        const statsService = new StatsService(Adn)
        let result = await statsService.getStats()
        expect(result).toEqual({ count_human_dna: 0, count_mutant_dna: 1, ratio: 1 })
    });

    it('can consult notMutants is greater than zero and mutants is zero', async () => {
        const adn = Adn.build({ adn:["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"].join(), isMutant: false})
        await adn.save() 

        const statsService = new StatsService(Adn)
        let result = await statsService.getStats()
        expect(result).toEqual({ count_human_dna: 1, count_mutant_dna: 0, ratio: 0 })
    });
});
