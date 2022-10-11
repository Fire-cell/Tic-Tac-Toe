class TicTacToe {
    #gridCallCount = 0; 

    constructor(boardSize=3) {
        this.boardSize = boardSize;
        this.avaliableSteps = this.boardSize**2;
        this.board = (() => {
            let brd = new Array(this.boardSize);

            for (let i = 0; i < this.boardSize; i++) {
                brd[i] = new Array(this.boardSize);
            }
    
            return brd;
        })();   
    }

    checkWin() {
        let winner;

        const equals = function(checkList) {
                if (checkList.every((el) => el == "X")) {
                    return true;
                } else if(checkList.every((el) => el == "O")) {
                    return true;
                } else {
                    return false;
                }
            }


        //Diagonal checks
        let checkList = []
        for(let i = 0; i < this.boardSize; i++) { 
            checkList.push(this.board[i][i])
        }

        equals(checkList) ? winner = checkList[0] : checkList = [];

        for(let i = 0; i < this.boardSize; i++) { 
            checkList.push(this.board[i][this.boardSize-1-i])
        }

        equals(checkList) ? winner = checkList[0] : checkList = [];

        //Vertical check
        for(let i = 0; i < this.boardSize; i++) {
            for(let j = 0; j < this.boardSize; j++) {
                if (checkList.length == this.boardSize) {
                    equals(checkList) ? winner = checkList[0] : checkList = [];
                }
                checkList.push(this.board[i][j])
            }
        }

        //Horizontal check
        for(let i = 0; i < this.boardSize; i++) {
            for(let j = 0; j < this.boardSize; j++) {
                if (checkList.length == this.boardSize) {
                    equals(checkList) ? winner = checkList[0] : checkList = [];
                }
                checkList.push(this.board[j][i])
            }
        }

        if (winner == null && this.avaliableSteps == 0) {
            return 'draw';
          } else if (winner != null){
            console.log(winner);
            return winner;
          } else {
            return;
          }

    } 
    

    grid() {
        for (let i = 0; i < this.boardSize; i++) {
            for(let j = 0; j < this.boardSize; j++){
                console.log(`value: ${this.board[i][j]}, x: ${i}, y: ${j}`); 
            }
        }
    }


    step([x, y], player) {
        if (this.avaliableSteps == 0) {
            return console.log("you haven't avaliable steps.");
        }
        if (this.board[x][y] != null) {
            return console.log("This cell isn't empty.");
        }
        
        if(this.#gridCallCount % 2 === 0 && player.toUpperCase() === "X") {
            this.board[x][y] = "X";
        } else if (player.toUpperCase() === "O") {
            this.board[x][y] = "O";
        } else {
            return "Error: Time to X player move!";
        }
        this.checkWin();
        this.#gridCallCount++;
        this.avaliableSteps--;
    }    
}

let game = new TicTacToe;

//game.grid();
game.step([1,1], "X");
game.step([1,0], "X");
game.step([1,1], "O");
game.step([1,2], "X");
game.step([0,0], "V");

game.grid();