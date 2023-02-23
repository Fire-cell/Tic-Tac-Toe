'use strict';

class Game {
    constructor(name) {
        this.name = name;
    }
}

function compareArrays(firstArray, secondArray) {
    return firstArray.toString() === secondArray.toString();
}

function transposing2DMatrix(array) {
    return array[0].map((item, index) => array.map(row => row[index]));
}

class TicTacToe extends Game {
    #field;
    #winComb;
    #counter;
    #winner;
    #players = ['X', 'Y'];
    #fieldSize;
    #avaliableSteps;

    constructor (fieldSize=3, winComb=3) {
        super('TicTacToe');
        this.#fieldSize = fieldSize;
        this.#field = this.#createField(fieldSize);
        this.#winComb = winComb;
        this.#avaliableSteps = fieldSize**2;
        this.#counter = 0;
        this.#winner;
    }

    #createField(size) {
        if(size < 3) {
            return 'field should be bigger than 2';
        } 

        return Array(size).fill().map(() => Array(size).fill());
    }
    
    get field() {
        return this.#field;
    }

    #checkWinner(player) {
        const winArray = new Array(this.#winComb).fill(player);

        const horizontal = (field) => {
            for (let i = 0; i < this.#fieldSize; i++) {
                for (let j = 0; j < this.#fieldSize - this.#winComb + 1; j++) {
                    if (compareArrays(field[i].slice(0 + j, this.#winComb + j), winArray)) {
                        return this.#winner = player;
                    }
                }
            }
        };

        const vertical = (field) => {
            const transponingField = transposing2DMatrix(field);

            horizontal(transponingField);
        };

        const leftDiagonalCheck = (field) => {
            const diagolanArray = new Array(this.#winComb);

            for (let i = 0; i < this.#fieldSize; i++) {
                for (let j = 0; j < this.#fieldSize - this.#winComb + 1; j++) {
                    for (let k = j; k < this.#winComb + j; k++) {
                        diagolanArray[k - j] = field[k][k];
                    }

                    if (compareArrays(diagolanArray, winArray)) {
                        return this.#winner = player;
                    }
                }
            }
        };

        const rightDiagonalCheck = (field) => {
            const diagolanArray = new Array(this.#winComb);

            for (let i = 0; i < this.#fieldSize; i++) {
                for (let j = 0; j < this.#fieldSize - this.#winComb + 1; j++) {
                    for (let k = j; k < this.#winComb + j; k++) {
                        diagolanArray[k - j] = field[k][this.#winComb - k - 1];
                    }

                    if (compareArrays(diagolanArray, winArray)) {
                        return this.#winner = player;
                    }
                }
            }
        };

        horizontal(this.#field);
        vertical(this.#field);
        leftDiagonalCheck(this.#field);
        rightDiagonalCheck(this.#field);

        return (this.#winner) ? `Winner is '${player}'!` : `Next move ${this.#checkNextPlayer()}`;
    }

    #checkNextPlayer = () => (this.#counter % 2 === 0) ? 'X' : 'Y';

    #isPlayerExist = (player) => this.#players.some(value => value === player.toUpperCase());

    #isRightUserInputCoord = (x, y) => 0 <= x < this.#fieldSize && 0 <= y < this.#fieldSize;

    step([x, y], player) {
        if(this.#winner) return `The winner is ${this.#winner}. if you want play again, please, restart.`;
        
        if(!this.#avaliableSteps) return `Draw! if you want play again, please, restart.`
        
        if(!this.#isPlayerExist(player)) return `Player '${player}' doen't exist.`;

        if(this.#checkNextPlayer() !== player) return `It's time for player '${this.#checkNextPlayer()}'!`; 

        if(this.#field[x][y]) return "This cell isn't empty.";

        if(!this.#isRightUserInputCoord(x, y)) return `In field ${this.#fieldSize}x${this.#fieldSize} coordinates [${x}, ${y}] don't exist.`; 
       
        this.#counter++;
        this.#avaliableSteps--;
        this.#field[x][y] = player;
        return this.#checkWinner(player);
    }
}

const game = new TicTacToe(5, 4);
