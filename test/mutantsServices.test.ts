import MutantsService from '../src/mutants/mutants.service';
import {Adn} from '../src/commons/models/adn';
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

describe('MutantsService', () => {

    it('can find mutant in 6x6', async () => {
        let dna = ["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"]
        const mutantsService = new MutantsService(Adn)
        let result = await mutantsService.isMutant(dna)
        expect(result).toEqual(true)
    });

    it('can find not-mutant in 6x6', async () => {
        let dna = ["ATGCTA","CGGTGC","TTATGT","AGAAGG","CCCATA","TCACTG"]
        const mutantsService = new MutantsService(Adn)
        let result = await mutantsService.isMutant(dna)
        expect(result).toEqual(false)
    });

    it('can find mutant in 4x4', async () => {
        let dna = ["AAAA","CCCC","GGGG","TGCT"]
        const mutantsService = new MutantsService(Adn)
        let result = await mutantsService.isMutant(dna)
        expect(result).toEqual(true)
    });

    it('can find NOT-mutant in 4x4', async () => {
        let dna = ["ATTT","CATG","CTAG","TTTT"]
        const mutantsService = new MutantsService(Adn)
        let result = await mutantsService.isMutant(dna)
        expect(result).toEqual(false)
    });

    it('can find NOT-mutant in 5x6', async () => {
        let dna = ["ATGCT","GATCT","GCACG","ACTCA","CTTTT","GCATT"]
        const mutantsService = new MutantsService(Adn)
        let result = await mutantsService.isMutant(dna)
        expect(result).toEqual(false)
    });

    it('can find mutant in 5x6', async () => {
        let dna = ["ATGCT","GATCT","GCACG","GCTAA","GTTTT","GCATT"]
        const mutantsService = new MutantsService(Adn)
        let result = await mutantsService.isMutant(dna)
        expect(result).toEqual(true)
    });

    it('can register', async () => {
        let dna = ["ATGCT","GATCT","GCACG","GCTAA","GTTTT","GCATT"]
        const mutantsService = new MutantsService(Adn)
        await mutantsService.register(dna, true)
        const find = await Adn.findOne({}).exec()
        expect(find.adn).toEqual(dna.join())
    });
   
});
