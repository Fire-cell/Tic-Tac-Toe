/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/TicTacToe.js":
/*!*********************************!*\
  !*** ./js/modules/TicTacToe.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _gameField__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameField */ "./js/modules/gameField.js");


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
        this.#fieldInstance = new _gameField__WEBPACK_IMPORTED_MODULE_0__["default"](fieldSize, gameBlockSelector);
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TicTacToe);

/***/ }),

/***/ "./js/modules/gameField.js":
/*!*********************************!*\
  !*** ./js/modules/gameField.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });


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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GameField);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Modal {
    #modal;
    constructor(modalSelector) {
        this.#modal = document.querySelector(modalSelector);
    }
    openModal() {
        this.#modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    closeModal() {
        this.#modal.style.display = 'none';
        document.body.style.overflow = '';
    }
    get modal() {
        return this.#modal;
    }
} 

function modal(triggerSelector, modalSelector) {
    const modalTriggers = document.querySelectorAll(triggerSelector),
        modal = new Modal(modalSelector);
    modalTriggers.forEach((item) => item.addEventListener('click', () => modal.openModal()));
    modal.modal.addEventListener('click', (event) => {
        const target = event.target;
        if( target === modal || target.getAttribute('data-close') == '') {
            modal.closeModal();
        }
    });
    document.addEventListener('keydown', (event) => {
        if(event.code === 'Escape' && modal.classList.contains('show')) {
            modal.closeModal();
        }
    }); 
}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);


/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs (gameInstanse) {
    const gameBlock = document.querySelector('#game-block'),
      restartButton = document.querySelector('.restart'),
      settingsForm = document.querySelector('form'),
      backOneStepButton = document.querySelector('.back-one-step'),
      result = document.querySelector('.result');
      
    let cellsArray = Array.from(gameBlock.querySelector('.board-container').querySelector('.game-field').childNodes).map(item => Array.from(item.childNodes));

    gameBlock.addEventListener('click', (event) => {
        const target = event.target;

        if(target.tagName != 'TD') return;
        

        fillCells(target);    
        showResult();
    });

    function fillCells(target) {
        gameInstanse.step([target.parentNode.rowIndex, target.cellIndex], gameInstanse.checkNextPlayer());
        renewRenderField(cellsArray);

    }

    function showResult() {
        if(gameInstanse.winner) {
            result.textContent = `Result: Winner is '${gameInstanse.winner}'!`; 
        }

        if(!gameInstanse.avaliableSteps) {
            result.textContent = 'Result: Draw!';
        }
    }

    function renewRenderField(cellsArray) {
        gameInstanse.field.forEach((array, i) => array.forEach((value, j) => cellsArray[i][j].textContent = (value) ? value : ''));
    }

    restartButton.addEventListener('click', () => {
        result.textContent = '';
        gameInstanse.restartGame();
        renewRenderField(cellsArray);
    });

    backOneStepButton.addEventListener('click', () => {
        gameInstanse.backOneStep();
        renewRenderField(cellsArray);
        result.textContent = '';
    });

    settingsForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(settingsForm),
            formObj = {};
        
        formData.forEach((value, key) => (formObj[key] = value));

        gameInstanse.fieldSize = +formObj.fieldSize;
        gameInstanse.winComb = +formObj.winComb;
        gameInstanse.renderGameField();
        cellsArray = Array.from(gameBlock.querySelector('.board-container').querySelector('.game-field').childNodes).map(item => Array.from(item.childNodes));
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_TicTacToe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/TicTacToe */ "./js/modules/TicTacToe.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");




'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const game = new _modules_TicTacToe__WEBPACK_IMPORTED_MODULE_1__["default"](3, 3, '#game-block');

    game.renderGameField();

    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_2__["default"])(game);
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_0__["default"])('[data-modal]', '.modal');
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map