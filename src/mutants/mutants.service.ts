
// Indicates the movement position
const POSITION = [
    [0, 1], // horizontal Right
    [0, -1], // horizontal Left
    [1, 0], // Vertical down
    [ 1, 1] // lower right diagonal
]
export default class MutantsService {

    private adnModel
    private dna: string[][]

    constructor(
        adnModel
    ) {
        this.adnModel = adnModel
    }
    /**
     * Allow find mutant in dna
     * @param dna string[]
     * @returns Promise<boolean>
     */
    public async isMutant(dna: string[]): Promise<boolean> {
        return this.search(this.converToArrayM(dna))
    }

    /**
     * Allows searching for a mutant sequence in DNA, if it has more than 3 it is considered mutant
     * @param dna string[][]
     * @returns boolean
     */
    private search(dna: string[][]): boolean{
        this.dna = dna;
        let mutante = 0;
        for (let i = 0; i < dna.length; i++) {
            for (let j = 0; j < dna.length; j= j+2) {
                POSITION.forEach(element => {
                    const result = this.move(dna[i].length, i, j, element[0], element[1])
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

    /**
     * Allow searching in array wthin backtracking
     * @param sizeColum number
     * @param row number
     * @param column number
     * @param moveRow number
     * @param moveColumn number
     * @returns boolean
     */
    private move(sizeColum: number, row: number, column: number, moveRow: number, moveColumn:number): boolean {
        const palabra = [];
          let recorrido = 0;

          while((recorrido < 4) &&
                  (row < this.dna.length && column < sizeColum) &&
                  (row > -1 && column > -1)) {

            palabra.push(this.dna[row][column]);
            row = row + moveRow;
            column = column + moveColumn;
            recorrido++;
          }

        if(palabra.length === 4){
            const s = new Set(palabra);
            return  s.size === 1
        }
        return false
    }

    /**
     * lets you convert a vector to a two-dimensional array
     * @param dnaInit string[]
     * @returns string[][]
     */
    private converToArrayM (dnaInit: string[]): string[][] {
        const dna:string[][] = []
        dnaInit.forEach(element => {
            const letter = element.split('');
            dna.push(letter);

        });
        return dna;
    }

    /**
     * Allows register en BD
     * @param dna string[]
     * @param mutant boolean
     * @returns Promise<any>
     */
    public async register(dna: string[], mutant :boolean): Promise<any>{
        try {
            const adn = this.adnModel.build({ adn:dna.join(), isMutant: mutant})
            return adn.save()
        } catch (e) {
            console.error(" [ERROR - RESGITER MUTANT] ", e)
        }
    }
}