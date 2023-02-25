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

export default tabs;