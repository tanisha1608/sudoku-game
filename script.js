var numSelected = null;
var tileSelected = null;

var errors = 0;

// Generate random Sudoku board and solution
var { board, solution } = generateRandomSudoku();

window.onload = function() {
    setGame();
}

function setGame() {
    // Digits 1-9
    for (let i = 1; i <= 9; i++) {
        let number = document.createElement("div");
        number.id = i.toString();
        number.innerText = i.toString();
        number.addEventListener("click", selectNumber);
        number.classList.add("number");
        document.getElementById("digits").appendChild(number);
    }

    // Board 9x9
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            if (board[r][c] !== 0) {
                tile.innerText = board[r][c].toString();
                tile.classList.add("tile-start");
            }
            if (r === 2 || r === 5) {
                tile.classList.add("horizontal-line");
            }
            if (c === 2 || c === 5) {
                tile.classList.add("vertical-line");
            }
            tile.addEventListener("click", selectTile);
            tile.classList.add("tile");
            document.getElementById("board").append(tile);
        }
    }
}

function generateRandomSudoku() {
    const grid = [];
    const solution = [];
    const emptyPercentage = 50; // Adjust this to change the percentage of empty cells

    // Initialize the grid with empty cells
    for (let i = 0; i < 9; i++) {
        grid.push([]);
        solution.push([]);
        for (let j = 0; j < 9; j++) {
            grid[i].push(0); // 0 represents an empty cell
            solution[i].push(0); // 0 represents an empty cell for solution
        }
    }

    // Fill the grid with random numbers that satisfy Sudoku rules
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (Math.random() * 100 <= (100 - emptyPercentage)) {
                let num;
                do {
                    num = Math.floor(Math.random() * 9) + 1;
                } while (!isValid(grid, i, j, num));
                grid[i][j] = num;
                solution[i][j] = num; // Initially, solution is the same as grid
            }
        }
    }

    // Solve the Sudoku grid to get the solution
    solveSudoku(solution);

    return { board: grid, solution: solution };
}

function isValid(grid, row, col, num) {
    // Check row
    for (let i = 0; i < 9; i++) {
        if (grid[row][i] === num) {
            return false;
        }
    }

    // Check column
    for (let i = 0; i < 9; i++) {
        if (grid[i][col] === num) {
            return false;
        }
    }

    // Check 3x3 box
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = startRow; i < startRow + 3; i++) {
        for (let j = startCol; j < startCol + 3; j++) {
            if (grid[i][j] === num) {
                return false;
            }
        }
    }

    return true;
}

function selectNumber() {
    if (numSelected !== null) {
        numSelected.classList.remove("number-selected");
    }
    numSelected = this;
    numSelected.classList.add("number-selected");
}

function selectTile() {
    if (numSelected) {
        if (this.innerText !== "") {
            return;
        }

        let coords = this.id.split("-");
        let r = parseInt(coords[0]);
        let c = parseInt(coords[1]);

        if (solution[r][c] === parseInt(numSelected.id)) {
            this.innerText = numSelected.id;
            if (checkSolution()) {
                alert("Congratulations! You solved the Sudoku.");
            }
        } else {
            errors += 1;
            document.getElementById("errors").innerText = errors;
        }
    }
}

function checkSolution() {
    let currentBoard = getCurrentBoard();
    return compareArrays(currentBoard, solution);
}

function getCurrentBoard() {
    let currentBoard = [];
    for (let r = 0; r < 9; r++) {
        currentBoard.push([]);
        for (let c = 0; c < 9; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            currentBoard[r].push(tile.innerText === "" ? 0 : parseInt(tile.innerText));
        }
    }
    return currentBoard;
}

function compareArrays(arr1, arr2) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (arr1[i][j] !== arr2[i][j]) {
                return false;
            }
        }
    }
    return true;
}

function solveSudoku(board) {
    let emptySpot = findEmptySpot(board);
    if (!emptySpot) {
        return true; // No empty spots left, solution found
    }

    let [row, col] = emptySpot;
    for (let num = 1; num <= 9; num++) {
        if (isValid(board, row, col, num)) {
            board[row][col] = num;
            if (solveSudoku(board)) {
                return true;
            }
            board[row][col] = 0; // Backtrack
        }
    }

    return false; // No valid number found, backtrack
}

function findEmptySpot(board) {
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            if (board[r][c] === 0) {
                return [r, c];
            }
        }
    }
    return null; // No empty spots left
}
