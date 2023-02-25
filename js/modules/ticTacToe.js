import GameField from "./gameField";

function transposing2DMatrix(array) {
    return array[0].map((item, index) => array.map(row => row[index]));
}

class TicTacToe {
    #field;
    #winComb;
    #counter;
    #winner;
    #players = ['X', 'O'];
    #fieldSize;
    #avaliableSteps;
    #fieldInstance;
    #prevStep;

    constructor (fieldSize=3, winComb=3, gameBlockSelector) {
        this.#fieldSize = fieldSize;
        this.#fieldInstance = new GameField(fieldSize, gameBlockSelector);
        this.#field = this.#fieldInstance.createField();
        this.#winComb = winComb;
        this.#avaliableSteps = fieldSize**2;
        this.#counter = 0;
        this.#winner;
        this.#prevStep = {x: null, y: null};   
    }

    renderGameField() {
        this.#fieldInstance.render();
    }

    #checkWinner(player) {
        const lineCheck = (field) => {
            for (let i = 0; i < this.#fieldSize; i++) {
                for (let j = 0; j <= this.#fieldSize - this.#winComb; j++) {
                    let horizontal = field[i].slice(0 + j, this.#winComb + j).join(''),
                        vertical = transposing2DMatrix(field)[i].slice(0 + j, this.#winComb + j).join('');

                    if (horizontal === player.repeat(this.#winComb) || vertical === player.repeat(this.#winComb)) {
                        return this.#winner = player;
                    }
                }
            }
        };

        const diagonalCheck = (field) => {
            for (let i = 0; i <= this.#fieldSize - this.#winComb; i++) {
                for (let j = 0; j <= this.#fieldSize - this.#winComb; j++) {
                    let diagolal1 = '',
                        diagolal2 = '';

                    for (let k = 0; k < this.#winComb; k++) {
                        diagolal1 += field[k + i][k + j];
                        diagolal2 += field[k + i][j + this.#winComb - k - 1];
                    }
                    if (diagolal1 === player.repeat(this.#winComb) || diagolal2 === player.repeat(this.#winComb)) {
                        return this.#winner = player;
                    }
                }
            }
        };

        lineCheck(this.#field);
        diagonalCheck(this.#field);
        
        if(!this.#avaliableSteps) {
            console.log('Draw!');
            return;
        }

        console.log((this.#winner) ? `Winner is '${player}'!` : `Next move ${this.checkNextPlayer()}`);
    }

    checkNextPlayer = () => (this.#counter % 2 === 0) ? 'X' : 'O';

    #isPlayerExist = (player) => this.#players.some(value => value === player.toUpperCase());

    #isRightUserInputCoord = (x, y) => 0 <= x < this.#fieldSize && 0 <= y < this.#fieldSize;

    step([x, y], player) {
        if(this.#winner) {
            console.log(`The winner is ${this.#winner}. if you want play again, please, restart.`);
            return;
        }
        
        if(!this.#avaliableSteps) {
            console.log(`Draw! if you want play again, please, restart.`);
            return;
        }
        
        if(!this.#isPlayerExist(player)) {
            console.log(`Player '${player}' doen't exist.`);
            return
        }  

        if(this.checkNextPlayer() !== player) {
            console.log(`It's time for player '${this.checkNextPlayer()}'!`);
            return;
        } 

        if(this.#field[x][y]) {
            console.log("That cell is already occupied. Try again.");
            return;
        } 

        if(!this.#isRightUserInputCoord(x, y)) {
            console.log(`In field ${this.#fieldSize}x${this.#fieldSize} coordinates [${x}, ${y}] don't exist.`);
            return;
        }  
       
        this.#counter++;
        this.#avaliableSteps--;
        this.#field[x][y] = player;
        [this.#prevStep.x, this.#prevStep.y] = [x, y];

        return this.#checkWinner(player);
    }
    
    restartGame() {
        this.#winner = null;
        this.#counter = 0;
        this.#avaliableSteps = this.#fieldSize ** 2;
        this.#field = this.#fieldInstance.createField();
    }

    backOneStep() {
        if(Object.values(this.#prevStep).some(item => typeof item != 'undefined')) {
            console.log("You didn't make any move.");
            return;
        }

        if(this.#field[this.#prevStep.x][this.#prevStep.y] == undefined) {
            return;
        }

        this.#winner = null;
        this.#counter--;
        this.#avaliableSteps++;
        this.#field[this.#prevStep.x][this.#prevStep.y] = null;
    }

    get gameBlock() {
        return this.#fieldInstance.gameBlock;
    }

    get winner() {
        return this.#winner;
    }

    get field() {
        return this.#field;
    }

    get avaliableSteps() {
        return this.#avaliableSteps;
    }

    set winComb(winComb) {
        if(typeof winComb === 'number' && winComb >= 3 && winComb <= this.#fieldSize) {
            this.#winComb = winComb;
        }   
    }

    set fieldSize(fieldSize) {
        if(typeof fieldSize !== 'number' || fieldSize < 3) {
            return;
        }

        this.#fieldSize = fieldSize;
        this.#fieldInstance.fieldSize = fieldSize;
        this.restartGame();
    }

}

export default TicTacToe;