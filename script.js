class TicTacToe {
    #players = ["X", "O"];
    #winner;
    #gridCallCount = 0; 
    
    constructor(fieldSize=3) {
        this.fieldSize = fieldSize;
        this.avaliableSteps = this.fieldSize**2;
        this.field = this.#createGameField()
    }

    #createGameField() {
        let field = new Array(this.fieldSize);

            for (let i = 0; i < this.fieldSize; i++) {
                field[i] = new Array(this.fieldSize);
            }
    
            return field;
    }

    #equals = function(checkList) {
        if (checkList.every((el) => el == this.#players[0])) {
            return true;
        } else if(checkList.every((el) => el == this.#players[1])) {
            return true;
        } else {
            return false;
        }
    }

    #isWinner() {
        return this.#winner != null;
    }

    checkWin() {
        //Diagonal checks
        let checkList = []
        for(let i = 0; i < this.fieldSize; i++) { 
            checkList.push(this.field[i][i])
        }

        this.#equals(checkList) ? this.#winner = checkList[0] : checkList = [];

        //this.#isWinner(this.#winner) ? return 
        for(let i = 0; i < this.fieldSize; i++) { 
            checkList.push(this.field[i][this.fieldSize-1-i])
        }

        this.#equals(checkList) ? this.#winner = checkList[0] : checkList = [];
        //Vertical check
        for(let i = 0; i < this.fieldSize; i++) {
            for(let j = 0; j < this.fieldSize; j++) {
                if (checkList.length == this.fieldSize) {
                    this.#equals(checkList) ? this.#winner = checkList[0] : checkList = [];
                }
                checkList.push(this.field[i][j])
            }
        }

        //Horizontal check
        for(let i = 0; i < this.fieldSize; i++) {
            for(let j = 0; j < this.fieldSize; j++) {
                if (checkList.length == this.fieldSize) {
                    this.#equals(checkList) ? this.#winner = checkList[0] : checkList = [];
                }
                checkList.push(this.field[j][i])
            }
        }

        if (this.#winner == null && this.avaliableSteps == 0) {
            return console.log("draw");
          } else if (this.#isWinner()){
            return console.log(`The winner is ${this.#winner}!`);
          } else {
            return;
          }

    } 
    

    grid() {
        for (let i = 0; i < this.fieldSize; i++) {
            for(let j = 0; j < this.fieldSize; j++){
                console.log(`value: ${this.field[i][j]}, x: ${i}, y: ${j}`); 
            }
        }
    }

    #isRightUserInputCoord(x, y) {
        if( 0 <= x < this.fieldSize && 0 <= y < this.fieldSize) {
            return true;
        }
        return false;
    }

    #isCellEmpty(el) {
        return el == null;
    }
    
    #isExistPlayer(player) {
        switch(player) {
            case this.#players[0]:
                return true;
            
            case this.#players[1]:
                return true;
            
            default:
                return false;
        }
    }

    #isStepAdd(player) {
        switch(this.#gridCallCount % 2) {
            case 0:
                return player == this.#players[0];
            
            case 1:
                return player == this.#players[1];
        }
    }



    step([x, y], player) {
        if (this.#isWinner()) {
            return console.log(`The winner is ${this.#winner}. if you want play again, please, restart.`);
        }

        if (this.avaliableSteps == 0) {
            return console.log("You haven't avaliable steps. The game is over.");
        }

        if(!this.#isRightUserInputCoord()) {
            return console.log("Wrong coordinates!")
        }

        if (!this.#isCellEmpty(this.field[x][y])) {
            return console.log("This cell isn't empty.");
        }
        
        if (!this.#isExistPlayer(player)) {
            return console.log(`Error: player '${player}' doen't exist`);
        }

        if(!this.#isStepAdd(player)) {
            let rightPlayerMove;
            (this.#gridCallCount % 2==0) ? rightPlayerMove =this.#players[0] : rightPlayerMove =this.#players[1];

            return console.log(`Error! It's time for player '${rightPlayerMove}'!`)
        }

        this.field[x][y] = player;
        
        this.checkWin();
        this.#gridCallCount++;
        this.avaliableSteps--;
    }    
}

let game = new TicTacToe();

//game.grid();
game.step([1,2], "X");
game.step([2,1], "O");
game.step([1,0], "X");
game.step([2,0], "O");
game.step([1,1], "X");
game.step([0,0], "V");

game.grid();