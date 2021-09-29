import { Request, Response} from "express";
import { MutantController } from '../src/mutants/mutants.controller';
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

describe('MutantsController', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    
    beforeEach(() => {
        mockRequest = {
            body: {}
        };
        mockResponse = {
            status: function(s) {this.statusCode = s; return this;},
            send: function(s) {this.send = s; return this;}
        };
    });
    
    it('can valid Request', async () => {
        const mutantController = new MutantController()
        let result = await mutantController.isMutant(mockRequest as Request, mockResponse as Response)
        expect(result.statusCode).toEqual(400)
        expect(result.send).toEqual("Debe proporsionar un ADN")
    });

    it('can valid format', async () => {
        mockRequest.body.dna = ["ATGCGl","CAGTGC","TTATTI","AGACGG","GCGTCA","TCACIG"]
        const mutantController = new MutantController()
        let result = await mutantController.isMutant(mockRequest as Request, mockResponse as Response)
        expect(result.statusCode).toEqual(400)
        expect(result.send).toEqual("La secuencia de adn no es correcta")
    });

    it('can response 200', async () => {
        mockRequest.body.dna = ["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"]
        const mutantController = new MutantController()
        let result = await mutantController.isMutant(mockRequest as Request, mockResponse as Response)
        expect(result.statusCode).toEqual(200)
        expect(result.send).toEqual("Es un mutante")
    });

    it('can response 403', async () => {
        mockRequest.body.dna = ["ATGCT","GATCT","GCACG","ACTCA","CTTTT","GCATT"]
        const mutantController = new MutantController()
        let result = await mutantController.isMutant(mockRequest as Request, mockResponse as Response)
        expect(result.statusCode).toEqual(403)
        expect(result.send).toEqual("No es un mutante")
    });

   
});
