'use strict';

class GameField {
    #fieldSize;
    #gameBlock;

    constructor (fieldSize, gameBlockSelector) {
        this.#fieldSize = fieldSize;
        this.#gameBlock = document.querySelector(gameBlockSelector);
    }

    render() {
        const div = document.createElement('div'), 
              table = document.createElement('table');

        div.classList.add('board-container');
        table.classList.add('game-field');

        for(let i = 0; i < this.#fieldSize; i++) {
            const tr = document.createElement('tr');

            for(let j = 0; j < this.#fieldSize; j++) {
                const td = document.createElement('td');
               td.style.height = `${ 100 / this.#fieldSize }%`;
                td.style.width = `${ 100 / this.#fieldSize }%`;

                tr.appendChild(td);
            }

            table.appendChild(tr);
        }

        div.appendChild(table);
        this.#gameBlock.innerHTML = '';
        this.#gameBlock.appendChild(div);
    }

    createField() {
        if(this.#fieldSize < 3) {
            throw new Error('field should be bigger than 2');
        } 

        return Array(this.#fieldSize).fill().map(() => Array(this.#fieldSize).fill());
    }

    get gameBlock() {
        return this.#gameBlock;
    }

    set fieldSize(fieldSize) {
        if(typeof fieldSize !== 'number' && fieldSize < 3) {
            return;
        }

        this.#fieldSize = fieldSize;
    }
}

export default GameField;