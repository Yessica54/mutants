
const POSITION = [
    [0, 1], //horizontal Derecha
    [0, -1], // horizontal Izquierda
    [1, 0], // Vertical hacia abajo
    [ 1, 1] // diagonal inferior derecha
]

export default class MutantsService {

    private adnModel

    constructor(
        adnModel
    ) {
        this.adnModel = adnModel
    }

    public async isMutant(dna: string[]): Promise<boolean> {
        return this.search(this.converToArrayM(dna))
    }

    private search(dna: string[][]){
        let mutante = 0;
        for (let i = 0; i < dna.length; i++) {
            for (let j = 0; j < dna.length; j= j+2) {            
                POSITION.forEach(element => { 
                    let result = this.move(dna,dna.length,dna[i].length, i, j, element[0], element[1])
                    if(result){
                        mutante++
                    }  
                });
            }
            if(mutante >= 3){
                break;
            }
        }

        return mutante >= 3;
    }

    private move(dna: string[][], sizeRow: number, SizeColum: number, fila: number, columna: number, moverEnFila: number, moverEnColumna: number) {
        let palabra = [];
          let recorrido = 0;
    
          while((recorrido < 4) && 
                  (fila < sizeRow && columna < SizeColum) && 
                  (fila > -1 && columna > -1)) {
    
            palabra.push(dna[fila][columna]);
            fila = fila + moverEnFila;
            columna = columna + moverEnColumna;
            recorrido++;
          }
    
        if(palabra.length == 4){
            let s = new Set(palabra);
            return  s.size == 1
        }
        return false
    }

    private converToArrayM (dnaInit: string[]): string[][] {
        let dna:string[][] = []
        dnaInit.forEach(element => {
            let letter = element.split('');
            dna.push(letter);
    
        });
        return dna;
    }

    public async register(dna: string[], mutant :boolean){ 
        const adn = this.adnModel.build({ adn:dna.join(), isMutant: mutant})
        adn.save().catch(x => {
            console.error(" [ERROR - RESGITER MUTANT] ", x) 
        })
    }
}