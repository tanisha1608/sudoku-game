// Constants for difficulty levels
const difficulties = {
    easy: { emptyPercentage: 20 },
    medium: { emptyPercentage: 35 },
    hard: { emptyPercentage: 50 }
};

// Variables to store current game state
let board = [];
let solution = [];
let numSelected = null;
let errors = 0;

// Function to initialize the game based on difficulty
function initializeGame(difficulty) {
    const { emptyPercentage } = difficulties[difficulty];
    const { solved, unsolved } = generateRandomSudoku(emptyPercentage);

    board = unsolved;
    solution = solved;
    errors = 0;

    // Clear existing board and digits
    document.getElementById("board").innerHTML = "";
    document.getElementById("digits").innerHTML = "";

    // Set up Sudoku board
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            if (board[r][c] != "-") {
                tile.innerText = board[r][c];
                tile.classList.add("tile-start");
            }
            if (r == 2 || r == 5) {
                tile.classList.add("horizontal-line");
            }
            if (c == 2 || c == 5) {
                tile.classList.add("vertical-line");
            }
            tile.addEventListener("click", selectTile);
            tile.classList.add("tile");
            document.getElementById("board").appendChild(tile);
        }
    }

    // Set up number selection
    for (let i = 1; i <= 9; i++) {
        let number = document.createElement("div");
        number.id = i.toString();
        number.innerText = i.toString();
        number.addEventListener("click", selectNumber);
        number.classList.add("number");
        document.getElementById("digits").appendChild(number);
    }

    // Reset errors count display
    document.getElementById("errors").innerText = errors;
}

// Function to handle number selection
function selectNumber() {
    if (numSelected != null) {
        numSelected.classList.remove("number-selected");
    }
    numSelected = this;
    numSelected.classList.add("number-selected");
}

// Function to handle tile selection and value input
function selectTile() {
    if (numSelected) {
        let coords = this.id.split("-");
        let r = parseInt(coords[0]);
        let c = parseInt(coords[1]);

        // Check if the tile is a starting tile (preset value)
        if (board[r][c] != "-") {
            return;
        }

        // Check if input value matches solution
        if (solution[r][c] == numSelected.id) {
            this.innerText = numSelected.id;
            this.classList.add("tile-correct");
            board[r][c] = numSelected.id;

            // Check if the board is complete
            if (isBoardComplete()) {
                alert(`Congratulations! You solved the Sudoku with ${errors} errors.`);
                initializeGame(); // Reset the game after completion
            }
        } else {
            // Incorrect input handling
            this.classList.add("tile-incorrect");
            errors++;
            document.getElementById("errors").innerText = errors;

            // Check if error count exceeds 10
            if (errors >= 10) {
                alert("Sorry, you exceeded 10 errors. Restarting the game.");
                initializeGame(); // Reset the game after too many errors
            }
        }
    }
}

// Function to check if the board is complete
function isBoardComplete() {
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            if (board[r][c] == "-") {
                return false;
            }
        }
    }
    return true;
}

// Function to generate a random Sudoku grid
function generateRandomSudoku(emptyPercentage) {
    const grid = [];

    // Initialize the grid with empty cells
    for (let i = 0; i < 9; i++) {
        grid.push([]);
        for (let j = 0; j < 9; j++) {
            grid[i].push(0); // 0 represents an empty cell
        }
    }

    // Function to check if placing 'num' at grid[row][col] is valid
    function isValid(row, col, num) {
        // Check the row
        for (let i = 0; i < 9; i++) {
            if (grid[row][i] === num) {
                return false;
            }
        }

        // Check the column
        for (let i = 0; i < 9; i++) {
            if (grid[i][col] === num) {
                return false;
            }
        }

        // Check the 3x3 box
        const boxStartRow = Math.floor(row / 3) * 3;
        const boxStartCol = Math.floor(col / 3) * 3;
        for (let i = boxStartRow; i < boxStartRow + 3; i++) {
            for (let j = boxStartCol; j < boxStartCol + 3; j++) {
                if (grid[i][j] === num) {
                    return false;
                }
            }
        }

        return true;
    }

    // Function to recursively fill the Sudoku grid using backtracking
    function fillGrid(row, col) {
        if (row === 9) {
            return true; // Entire grid filled successfully
        }

        let nextRow = row;
        let nextCol = col + 1;
        if (nextCol === 9) {
            nextRow++;
            nextCol = 0;
        }

        // Shuffle numbers 1-9 randomly
        const numbers = Array.from({ length: 9 }, (_, index) => index + 1);
        numbers.sort(() => Math.random() - 0.5);

        for (let num of numbers) {
            if (isValid(row, col, num)) {
                grid[row][col] = num;
                if (fillGrid(nextRow, nextCol)) {
                    return true;
                }
                grid[row][col] = 0; // Backtrack
            }
        }

        return false; // No valid number found
    }

    // Start filling the grid from the top-left corner (0, 0)
    fillGrid(0, 0);

    // Deep copy of the solved grid for storing the solved board
    const solvedGrid = JSON.parse(JSON.stringify(grid));

    // Function to remove numbers from the solved grid to create an unsolved version
    function createUnsolvedGrid() {
        const unsolvedGrid = JSON.parse(JSON.stringify(solvedGrid)); // Start with a copy of the solved grid

        // Determine number of cells to empty based on emptyPercentage
        const totalCells = 81;
        const emptyCells = Math.floor((emptyPercentage / 100) * totalCells);

        // Generate random indices to empty cells
        let cellsToRemove = 0;
        while (cellsToRemove < emptyCells) {
            const row = Math.floor(Math.random() * 9);
            const col = Math.floor(Math.random() * 9);
            if (unsolvedGrid[row][col] !== 0) {
                unsolvedGrid[row][col] = 0;
                cellsToRemove++;
            }
        }

        return unsolvedGrid;
    }

    // Convert unsolved grid to the specified format
    const unsolvedGrid = createUnsolvedGrid();
    const unsolvedBoard = unsolvedGrid.map(row => row.map(cell => cell === 0 ? "-" : cell.toString()));

    // Convert solved grid to the specified format
    const solvedBoard = solvedGrid.map(row => row.map(cell => cell.toString()));

    return {
        solved: solvedBoard,
        unsolved: unsolvedBoard
    };
}

// Initialize game on page load
window.onload = function() {
    initializeGame(); // Default to easy difficulty on page load
};
