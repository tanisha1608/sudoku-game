// var numSelected = null;
// var tileSelected = null;
// var errors = 0;
// let storedGrid = [];

// // Function to generate a random Sudoku problem
// function isValid(grid, row, col, num) {
//     // Check the row
//     for (let i = 0; i < 9; i++) {
//         if (grid[row][i] === num) {
//             return false;
//         }
//     }

//     // Check the column
//     for (let i = 0; i < 9; i++) {
//         if (grid[i][col] === num) {
//             return false;
//         }
//     }

//     // Check the 3x3 box
//     const boxStartRow = Math.floor(row / 3) * 3;
//     const boxStartCol = Math.floor(col / 3) * 3;
//     for (let i = boxStartRow; i < boxStartRow + 3; i++) {
//         for (let j = boxStartCol; j < boxStartCol + 3; j++) {
//             if (grid[i][j] === num) {
//                 return false;
//             }
//         }
//     }

//     return true;
// }
// function generateRandomSudoku() {
//     const grid = [];
//     const emptyPercentage = 20; // Adjust this to change the percentage of empty cells

//     // Initialize the grid with empty cells
//     for (let i = 0; i < 9; i++) {
//         grid.push([]);
//         for (let j = 0; j < 9; j++) {
//             grid[i].push(0); // 0 represents an empty cell
//         }
//     }

//     // Fill the grid with random numbers that satisfy Sudoku rules
//     for (let i = 0; i < 9; i++) {
//         for (let j = 0; j < 9; j++) {
//             if (Math.random() * 100 <= (100 - emptyPercentage)) {
//                 let num;
//                 do {
//                     num = Math.floor(Math.random() * 9) + 1;
//                 } while (!isValid(grid, i, j, num));
//                 grid[i][j] = num;
//             }
//         }
//     }

//     // Store the generated grid in the global variable
//     storedGrid = JSON.parse(JSON.stringify(grid)); // Deep copy to avoid reference issues

//     // Convert grid to the specified format
//     const board = [];
//     for (let i = 0; i < 9; i++) {
//         let row = "";
//         for (let j = 0; j < 9; j++) {
//             if (grid[i][j] === 0) {
//                 row += "-";
//             } else {
//                 row += grid[i][j];
//             }
//         }
//         board.push(row);
//     }

//     return board; // Return the generated board
// }

// // Function to solve the stored Sudoku grid and return the solved board format
// // Function to solve the stored Sudoku grid and return the solved board format
// // function solveStoredSudoku() {
// //     // Deep copy the stored grid to avoid modifying the original
// //     const grid = JSON.parse(JSON.stringify(storedGrid));

   

// //     // Function to perform constraint propagation with search (using recursion)
// //     function solve(grid) {
// //         // Find an empty cell to fill
// //         const emptyCell = findEmptyCell(grid);
// //         if (!emptyCell) {
// //             return true; // Solution found
// //         }

// //         const [row, col] = emptyCell;

// //         // Try numbers 1 to 9
// //         for (let num = 1; num <= 9; num++) {
// //             if (isValid(grid, row, col, num)) {
// //                 grid[row][col] = num; // Place the number

// //                 if (solve(grid)) {
// //                     return true; // Recursively solve
// //                 }

// //                 grid[row][col] = 0; // Backtrack
// //             }
// //         }

// //         return false; // No valid number found
// //     }

// //     // Find the first empty cell (cell with 0)
// //     function findEmptyCell(grid) {
// //         for (let row = 0; row < 9; row++) {
// //             for (let col = 0; col < 9; col++) {
// //                 if (grid[row][col] === 0) {
// //                     return [row, col];
// //                 }
// //             }
// //         }
// //         return null; // No empty cell found
// //     }

// //     // Solve the Sudoku using constraint propagation with search
// //     if (solve(grid)) {
// //         // Convert grid to the specified format
// //         const solvedBoard = [];
// //         for (let i = 0; i < 9; i++) {
// //             let row = "";
// //             for (let j = 0; j < 9; j++) {
// //                 row += grid[i][j];
// //             }
// //             solvedBoard.push(row);
// //         }

// //         return solvedBoard;
// //     } else {
// //         return null; // No solution found
// //     }
// // }


// var board = generateRandomSudoku();
// var solution = [
//     "387491625",
//     "241568379",
//     "569327418",
//     "758619234",
//     "123784596",
//     "496253187",
//     "934176852",
//     "675832941",
//     "812945763"
// ]

// window.onload = function() {
//     setGame();
// }

// function setGame() {
//     const digitsContainer = document.getElementById("digits");
//     const boardContainer = document.getElementById("board");
//     const fragment = document.createDocumentFragment();

//     // Digits 1-9
//     for (let i = 1; i <= 9; i++) {
//         let number = document.createElement("div");
//         number.id = i;
//         number.innerText = i;
//         number.addEventListener("click", selectNumber);
//         number.classList.add("number");
//         fragment.appendChild(number);
//     }
//     digitsContainer.appendChild(fragment);

//     // Board 9x9
//     for (let r = 0; r < 9; r++) {
//         for (let c = 0; c < 9; c++) {
//             let tile = document.createElement("div");
//             tile.id = r.toString() + "-" + c.toString();
//             if (board[r][c] !== "-") {
//                 tile.innerText = board[r][c];
//                 tile.classList.add("tile-start");
//             }
//             if (r == 2 || r == 5) {
//                 tile.classList.add("horizontal-line");
//             }
//             if (c == 2 || c == 5) {
//                 tile.classList.add("vertical-line");
//             }
//             tile.classList.add("tile");
//             fragment.appendChild(tile);
//         }
//     }
//     boardContainer.appendChild(fragment);

//     // Event delegation for tile selection
//     boardContainer.addEventListener("click", function(event) {
//         if (numSelected && event.target.classList.contains("tile")) {
//             let tile = event.target;
//             let coords = tile.id.split("-");
//             let r = parseInt(coords[0]);
//             let c = parseInt(coords[1]);

//             if (solution[r][c] == numSelected.id) {
//                 tile.innerText = numSelected.id;
//             } else {
//                 errors++;
//                 document.getElementById("errors").innerText = errors;
//             }
//         }
//     });
// }

// function selectNumber() {
//     if (numSelected) {
//         numSelected.classList.remove("number-selected");
//     }
//     numSelected = this;
//     numSelected.classList.add("number-selected");
// }
var numSelected = null;
var tileSelected = null;
var errors = 0;
var board = null;
var solution = null;

function generateRandomSudoku() {
    const grid = [];
    const emptyPercentage = 20; // Adjust this to change the percentage of empty cells

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
    const unsolvedBoard = unsolvedGrid.map(row => row.map(cell => cell === 0 ? "-" : cell.toString()).join(""));

    // Convert solved grid to the specified format
    const solvedBoard = solvedGrid.map(row => row.map(cell => cell.toString()).join(""));

    return {
        solved: solvedBoard,
        unsolved: unsolvedBoard
    };
}

function setGame() {
    // Generate Sudoku boards
    const { solved, unsolved } = generateRandomSudoku();
    board = unsolved; // Save the unsolved board globally
    solution = solved; // Save the solved board globally

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
            if (board[r][c] !== "-") {
                tile.innerText = board[r][c];
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
            document.getElementById("board").appendChild(tile);
        }
    }
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

        if (solution[r][c] === numSelected.id) {
            this.innerText = numSelected.id;
        } else {
            errors += 1;
            document.getElementById("errors").innerText = errors;
        }
    }
}

window.onload = function() {
    setGame();
};
